import { User } from "../models/user";

const completeRegistrationEmail = (
  app_url: string,
  firstName: string,
  token: string
) => `
<!DOCTYPE html>
<html>
<head>
<title>Verification Email</title>
<style>
  .email-container {
    background-color: #f2f2f2;
    padding: 20px;
    text-align: center;
  }
  .email-content {
    background-color: white;
    padding: 20px;
    margin: 20px auto;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #4CAF50;
    color: #fff!important;
    border-radius: 5px;
    text-decoration: none;
  }
  .button:hover {
    background-color: #45a049;
  }

</style>
</head>
<body>
<div class="email-container">
  <div class="email-content">
    <h2>Hello ${firstName}!</h2>
    <p>Thank you for signing up. Please click on the link below to verify your email address.</p>
    <a href="${app_url}/register/${token}" class="button">Click Here to Verify</a>
    <p>If didn't submit this request, please ignore this email.</p>
  </div>
</div>
</body>
</html>
`;

const resetPasswordEmail = (
  app_url: string,
  firstName: string,
  token: string
) => `
<!DOCTYPE html>
<html>
<head>
<title>Verification Email</title>
<style>
  .email-container {
    background-color: #f2f2f2;
    padding: 20px;
    text-align: center;
  }
  .email-content {
    background-color: white;
    padding: 20px;
    margin: 20px auto;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #4CAF50;
    color: #fff!important;
    border-radius: 5px;
    text-decoration: none;
  }
  .button:hover {
    background-color: #45a049;
  }

</style>
</head>
<body>
<div class="email-container">
  <div class="email-content">
    <h2>Hello ${firstName || ""}!</h2>
    <p>Please click on the link below to reset your password.</p>
    <a href="${app_url}/reset-password/${token}" class="button">Click Here to Reset</a>
    <p>If didn't submit this request, please ignore this email.</p>
  </div>
</div>
</body>
</html>
`;

export const sendInvitationEmail = async (
  app_url: string,
  user: User,
  sendgridApiKey: string
) => {

  const sendgridUrl = "https://api.sendgrid.com/v3/mail/send";
  const emailData = {
    personalizations: [
      {
        to: [{ email: "aussieverest@gmail.com" }, { email: user.Email }],
        subject: "Invitation to join Aussie Everest",
      },
    ],
    from: { email: "info@aussieverest.com" },
    content: [
      {
        type: "text/html",
        value: completeRegistrationEmail(
          app_url,
          user.Email,
          user.VerificationToken
        ),
      },
    ],
  };
  const response = await fetch(sendgridUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (response.ok) {
    return "Invitation Email Sent";
  } else {
    return "Failed to send invitation email.";
  }
};

export const sendPassworReset = async (
  app_url: string,
  user: User,
  sendgridApiKey: string
) => {

  const sendgridUrl = "https://api.sendgrid.com/v3/mail/send";
  const emailData = {
    personalizations: [
      {
        to: [{ email: "aussieverest@gmail.com" }, { email: user.Email }],
        subject: "Reset your password",
      },
    ],
    from: { email: "info@aussieverest.com" },
    content: [
      {
        type: "text/html",
        value: resetPasswordEmail(
          app_url,
          user.FirstName,
          user.VerificationToken
        ),
      },
    ],
  };
  const response = await fetch(sendgridUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (response.ok) {
    return "Invitation Email Sent";
  } else {
    return "Failed to send invitation email.";
  }
};
