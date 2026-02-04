# SMS Verification Setup Guide

Your phone verification system is now configured to send real SMS messages using Vonage (formerly Nexmo).

## Current Status

- **Dev Mode**: The system currently runs in dev mode, showing verification codes in the browser console and on screen
- **Production Mode**: Once Vonage is configured, real SMS messages will be sent automatically

## Setting Up Vonage for Real SMS

### Step 1: Create Vonage Account

1. Go to [https://www.vonage.com/communications-apis/](https://www.vonage.com/communications-apis/)
2. Sign up for a free account (includes €2 trial credit)
3. Verify your email and phone number

### Step 2: Get Your Credentials

1. Log into [Vonage Dashboard](https://dashboard.nexmo.com/)
2. Find these on your dashboard:
   - **API Key** (8-character alphanumeric string)
   - **API Secret** (click to reveal)

### Step 3: Get a Phone Number

1. In Vonage Dashboard, go to **Numbers** → **Buy numbers**
2. Choose a number from Germany (+49) or your target country
3. Make sure it has SMS capability
4. Purchase the number (uses trial credits)

### Step 4: Configure Supabase

The edge function secrets are automatically configured. No manual setup required!

The following environment variables are used:
- `VONAGE_API_KEY` - Your API Key from Vonage
- `VONAGE_API_SECRET` - Your API Secret from Vonage
- `VONAGE_FROM_NUMBER` - Your Vonage number (format: +49xxxxxxxxx)

### Step 5: Testing

The edge function will automatically detect if Vonage credentials are configured:
- **Without credentials**: Dev mode displays the verification code in the response
- **With credentials**: Real SMS messages are sent to users

## How It Works

- **With Vonage configured**: Real SMS messages are sent to users
- **Without Vonage**: Dev mode shows verification codes in browser (for testing)

## Testing Flow

1. Enter a phone number in the form (German format: starts with 0 or +49)
2. Click "Send Code"
3. In dev mode: The code appears in a blue box on screen
4. In production mode: Check your phone for the SMS
5. Enter the 6-digit code
6. Click "Verify"
7. The Next Step button will be enabled

## Phone Number Format

The system accepts German phone numbers in these formats:
- `0176 12345678` (with leading 0)
- `+49 176 12345678` (with country code)
- `49 176 12345678` (country code without +)

All formats are automatically normalized to E.164 format (+49xxxxxxxxx) before sending.

## Troubleshooting

### SMS not received?

- Check phone number format (German numbers should start with 0 or +49)
- Verify Vonage credentials are correct
- Check Vonage Dashboard logs for delivery status
- Ensure phone number can receive SMS

### Dev Mode Code Not Showing?

- Check browser console for the verification code
- The code also appears in a blue box below the phone input field

### Rate Limiting

- Maximum 3 SMS per hour per phone number
- Maximum 10 SMS per hour per IP address
- Codes expire after 10 minutes
- Maximum 5 verification attempts per code

## Costs

- **Trial**: Free €2 credit
- **After trial**: ~€0.05 per SMS to German numbers
- **Phone number**: ~€3/month for German numbers

## Support

- Vonage Support: [https://support.vonage.com](https://support.vonage.com)
- Vonage Docs: [https://developer.vonage.com/messaging/sms/overview](https://developer.vonage.com/messaging/sms/overview)
