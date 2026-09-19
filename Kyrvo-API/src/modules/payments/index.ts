import { Stripe } from 'stripe';
import { Context } from 'shared/Context';
import {
  Reservation,
  reservationModel,
  ReservationSchema,
} from 'shared/reservation/model';
import { logActivity } from 'shared/helpers/customLogger';
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
const paymentRoute = new OpenAPIHono<Context>();
function createStripeClient(apiKey: string) {
  return new Stripe(apiKey, {
    appInfo: {
      name: 'Aussie Everest',
      version: '0.0.1',
      url: 'https://ausieverest.com',
    },
  });
}

const group = 'Payments';
paymentRoute.openapi(
  createRoute({
    method: 'get',
    path: '/{Id}',
    tags: [group],
    summary: 'Request stripe payment url',
    request: {
      params: ReservationSchema.pick({ Id: true }),
    },

    responses: {
      303: {
        description: 'Redirect to Stripe payment',
      },
    },
  }),
  async (c: any) => {
    const { Id } = await c.req.param();
    const stripe = createStripeClient(c.env.STRIPE_KEY);
    const reservation = await reservationModel.getById(c.env.ae_d1, Id);
    const price = reservation?.Price * 100;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Hire Car Services',
              description: `${reservation?.RefId}`,
              metadata: { Id },
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      automatic_tax: { enabled: false },
      metadata: {
        refId: Id,
      },
      mode: 'payment',
      success_url: `${c.env.APP_URL}/ride-status/${Id}`,
      cancel_url: `${c.env.APP_URL}/ride-status/${Id}`,
    });
    return c.redirect(session.url as string, 303);
  },
);

paymentRoute.openapi(
  createRoute({
    method: 'post',
    path: '/webhooks',
    tags: [group],
    summary: 'Process payment events from stripe',
    responses: {
      200: {
        description: 'Process payment events from stripe',
      },
    },
  }),
  async (context) => {
    const stripe = createStripeClient(context.env.STRIPE_KEY);
    const signature = context.req.raw.headers.get('stripe-signature');
    try {
      if (!signature) {
        return context.text('', 400);
      }
      const body = await context.req.text();
      const event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        context.env.STRIPE_WEBHOOK_SECRET,
      );
      let paymentStatus = -1;
      let id = null;
      let status = 0;
      switch (event.type) {
        case 'checkout.session.completed': {
          id = event.data.object.metadata?.refId;
          paymentStatus = 2;
          status = 2;
          break;
        }
        case 'checkout.session.async_payment_failed': {
          id = event.data.object.metadata?.refId;
          paymentStatus = 1;
          status = 1;
          break;
        }
        default:
          break;
      }
      if (id) {
        const existingReservation = await reservationModel.getById(
          context.env.ae_d1,
          id,
        );
        const reservation = await reservationModel.updateById(
          context.env.ae_d1,
          {
            IsPaid: paymentStatus,
            Status: status,
            PaymentMethod: 'STRIPE',
          } as Reservation,
          id,
        );

        await logActivity(
          context.env.ae_d1,
          id,
          'PAYMENT',
          reservationModel.getTableName(),
          reservation,
          existingReservation,
          1,
          'BY STRIPE HOOK',
        );
        //const emailMessage = await sendReservationEmail(reservation as Reservation);
      }
      return context.text('', 200);
    } catch (err) {
      const errorMessage = `⚠️  Webhook signature verification failed. ${
        err instanceof Error ? err.message : 'Internal server error'
      }`;
      return context.text(errorMessage, 400);
    }
  },
);
export default {
  route: paymentRoute,
  path: 'defaults',
};
