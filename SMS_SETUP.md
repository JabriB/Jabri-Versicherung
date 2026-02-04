# SMS Verification Setup Guide

Your phone verification system is now configured to send real SMS messages using Twilio.

## Current Status

- **Dev Mode**: The system currently runs in dev mode, showing verification codes on screen
- **Production Mode**: Once Twilio is configured, real SMS messages will be sent automatically

## Setting Up Twilio for Real SMS

### Step 1: Create Twilio Account

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account (includes $15 trial credit)
3. Verify your email and phone number

### Step 2: Get Your Credentials

1. Log into [Twilio Console](https://console.twilio.com/)
2. Find these on your dashboard:
   - **Account SID** (starts with AC...)
   - **Auth Token** (click to reveal)

### Step 3: Get a Phone Number

1. In Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a number**
2. Choose a number from your country (or international)
3. Make sure it has SMS capability
4. Purchase the number (free with trial credits)

### Step 4: Configure Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
4. Add these three secrets:

   | Secret Name | Value |
   |-------------|-------|
   | `TWILIO_ACCOUNT_SID` | Your Account SID from Twilio |
   | `TWILIO_AUTH_TOKEN` | Your Auth Token from Twilio |
   | `TWILIO_PHONE_NUMBER` | Your Twilio number (format: +1234567890) |

### Step 5: Redeploy (Optional)

The edge function will automatically use the new environment variables. No redeployment needed!

## How It Works

- **With Twilio configured**: Real SMS messages are sent to users
- **Without Twilio**: Dev mode shows verification codes on screen (for testing)

## Testing

1. Enter a phone number in the form
2. Click "Send Code"
3. Check your phone for the SMS
4. Enter the 6-digit code
5. Click "Verify"

## Troubleshooting

### SMS not received?

- Check phone number format (must include country code)
- Verify Twilio credentials are correct
- Check Twilio Console logs for delivery status
- Ensure phone number can receive SMS

### Trial Account Limitations

Twilio trial accounts can only send to verified phone numbers. To send to any number:
1. Add funds to your Twilio account (no minimum)
2. This removes the trial restrictions

## Costs

- **Trial**: Free $15 credit
- **After trial**: ~$0.0079 per SMS (varies by country)
- **Phone number**: ~$1/month

## Support

- Twilio Support: [https://support.twilio.com](https://support.twilio.com)
- Twilio Docs: [https://www.twilio.com/docs/sms](https://www.twilio.com/docs/sms)
