import { KVNamespace } from '@cloudflare/workers-types';
export type Context = {
  Bindings: {
    ae_kv: KVNamespace;
    ae_d1: D1Database;
    ae_r2: R2Bucket;
    STRIPE_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    SENDGRID_API_KEY: string;
    APP_URL: string;
    DOMAIN: string;
    ENV: string;
  };
};
