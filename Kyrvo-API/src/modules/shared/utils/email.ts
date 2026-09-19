import { Agency } from '../models/agency';
import { Reservation } from '../models/reservation';

const resEmail = (reservation: Reservation) => {
  return `<table width="100%" style="border-collapse: collapse;">
    <tr>
        <td align="center" bgcolor="#f4f4f4" style="padding: 20px 0;">
            <h1>Reservation Confirmation</h1>
        </td>
    </tr>
    <tr>
        <td>
            <p>Dear ${reservation.FirstName},</p>
            <p>We have received your reservation request. Thank you for choosing Hire Car Service by Aussie Everest.</p>
            <p>Here are the details of your reservation:</p>
            <ul>
                <li><strong>Reference Id:</strong> ${reservation.RefId}</li>
                <li><strong>Passenger:</strong> ${reservation.FirstName} ${reservation.LastName}</li>
                <li><strong>Pickup Location:</strong> ${reservation.PickupLocation}</li>
                <li><strong>Pickup Date:</strong> ${reservation.PickupDate}</li>
                <li><strong>Pickup Time:</strong> ${reservation.PickupTime}</li>
                <li><strong>Total Price:</strong> $${reservation.Price}.00</li>
            </ul>
            <p>We will verify your request and confirm your request as soon as possible</p>
            <p>If you have any questions or need to make changes to your reservation, please contact our customer support via email at info@aussieverest.com.</p>
            <p>Thank you for choosing us. We look forward to hosting you and ensuring you have a experience.</p>
            <p>Best Regards,</p>
            <p>The Aussie Everest Team</p>
        </td>
    </tr>
</table>`;
};

// const agencyEmail = (reservation: Reservation, agency: Agency) => {
//   return `<table width="100%" style="border-collapse: collapse;">
//     <tr>
//         <td align="center" bgcolor="#f4f4f4" style="padding: 20px 0;">
//             <h1>Reservation Request</h1>
//         </td>
//     </tr>
//     <tr>
//         <td>
//             <p>We are sending reservation request to your agency.</p>
//             <p>Please click on this link and assign agent</p>
//             <ul>
//                 <li><strong>Reference Id:</strong> ${reservation.RefId}</li>
//                 <li><strong>Passenger:</strong> ${reservation.FirstName} ${reservation.LastName}</li>
//                 <li><strong>Pickup Location:</strong> ${reservation.PickupLocation}</li>
//                 <li><strong>Pickup Date:</strong> ${reservation.PickupDate}</li>
//                 <li><strong>Pickup Time:</strong> ${reservation.PickupTime}</li>
//                 <li><strong>Total Price:</strong> $${reservation.Price}.00</li>
//             </ul>
//             <p>We will verify your request and confirm your request as soon as possible</p>
//             <p>If you have any questions or need to make changes to your reservation, please contact our customer support via email at info@aussieverest.com.</p>
//             <p>Thank you for choosing us. We look forward to hosting you and ensuring you have a experience.</p>
//             <p>Best Regards,</p>
//             <p>The Aussie Everest Team</p>
//         </td>
//     </tr>
// </table>`;
// };

export const sendReservationEmail = async (
  reservation: Reservation,
  sendgridApiKey: string,
) => {

  const sendgridUrl = 'https://api.sendgrid.com/v3/mail/send';
  const emailData = {
    personalizations: [
      {
        to: [{ email: 'aussieverest@gmail.com' }, { email: reservation.Email }],
        subject: 'Reservation Request',
      },
    ],
    from: { email: 'info@harbourhire.com' },
    content: [{ type: 'text/html', value: resEmail(reservation) }],
  };
  const response = await fetch(sendgridUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (response.ok) {
    return 'Reservation Email Sent.';
  } else {
    return 'Failed to send reservation email.';
  }
};

export const sendReservationEmailToAgency = async (
  reservation: Reservation,
  agency: Agency,
  sendgridApiKey: string,
) => {

  const sendgridUrl = 'https://api.sendgrid.com/v3/mail/send';
  const emailData = {
    personalizations: [
      {
        to: [{ email: agency.Email }],
        subject: 'Reservation Request',
      },
    ],
    from: { email: 'info@harbourhire.com' },
    content: [{ type: 'text/html', value: resEmail(reservation) }],
  };
  const response = await fetch(sendgridUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (response.ok) {
    return 'Reservation Email Sent.';
  } else {
    return 'Failed to send reservation email.';
  }
};
