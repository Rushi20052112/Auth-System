// utils/emailTemplates.js

export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#4F46E5; padding:30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">Verify Your Email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px;">
              <p style="color:#333333; font-size:16px;">Hi there,</p>
              <p style="color:#333333; font-size:16px;">
                Thanks for signing up! Use the verification code below to confirm your email address.
                This code will expire in <strong>15 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="text-align:center; margin:30px 0;">
                <span style="
                  display:inline-block;
                  background-color:#f0f0ff;
                  color:#4F46E5;
                  font-size:36px;
                  font-weight:bold;
                  letter-spacing:10px;
                  padding:16px 32px;
                  border-radius:8px;
                  border:2px dashed #4F46E5;
                ">{verificationCode}</span>
              </div>

              <p style="color:#666666; font-size:14px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f9f9; padding:20px 30px; text-align:center;">
              <p style="color:#999999; font-size:12px; margin:0;">
                &copy; ${new Date().getFullYear()} Auth-System. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color:#16a34a; padding:30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">Password Reset Successful</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px; text-align:center;">

              <!-- Success Icon -->
              <div style="
                width:70px; height:70px;
                background-color:#dcfce7;
                border-radius:50%;
                display:inline-flex;
                align-items:center;
                justify-content:center;
                margin-bottom:20px;
              ">
                <span style="font-size:36px;">✅</span>
              </div>

              <p style="color:#333333; font-size:16px; text-align:left;">Hi there,</p>
              <p style="color:#333333; font-size:16px; text-align:left;">
                Your password has been reset successfully. You can now log in with your new password.
              </p>

              <!-- Security Notice -->
              <div style="
                background-color:#fff7ed;
                border-left:4px solid #f97316;
                padding:16px;
                border-radius:4px;
                margin:24px 0;
                text-align:left;
              ">
                <p style="color:#c2410c; font-size:14px; margin:0;">
                  🔒 <strong>Security Notice:</strong> If you did not request this change,
                  please contact our support team immediately as your account may be compromised.
                </p>
              </div>

              <p style="color:#666666; font-size:14px; text-align:left;">
                For your security, this action was logged with a timestamp. 
                All previous sessions have been invalidated.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f9f9; padding:20px 30px; text-align:center;">
              <p style="color:#999999; font-size:12px; margin:0;">
                &copy; ${new Date().getFullYear()} Auth-System. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color:#dc2626; padding:30px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">Password Reset Request</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 30px;">

              <p style="color:#333333; font-size:16px;">Hi there,</p>
              <p style="color:#333333; font-size:16px;">
                We received a request to reset your password. Click the button below to
                create a new password. This link will expire in <strong>1 hour</strong>.
              </p>

              <!-- Reset Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="{resetURL}" style="
                  display:inline-block;
                  background-color:#dc2626;
                  color:#ffffff;
                  font-size:16px;
                  font-weight:bold;
                  padding:14px 32px;
                  border-radius:6px;
                  text-decoration:none;
                ">Reset My Password</a>
              </div>

              <!-- Or copy link -->
              <p style="color:#666666; font-size:14px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="
                background-color:#f4f4f4;
                padding:12px;
                border-radius:4px;
                font-size:13px;
                color:#4F46E5;
                word-break:break-all;
              ">{resetURL}</p>

              <!-- Warning Box -->
              <div style="
                background-color:#fff7ed;
                border-left:4px solid #f97316;
                padding:16px;
                border-radius:4px;
                margin-top:24px;
              ">
                <p style="color:#c2410c; font-size:14px; margin:0;">
                  ⚠️ <strong>Didn't request this?</strong> If you didn't ask to reset your
                  password, ignore this email. Your password will remain unchanged.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f9f9; padding:20px 30px; text-align:center;">
              <p style="color:#999999; font-size:12px; margin:0;">
                &copy; ${new Date().getFullYear()} Auth-System. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;