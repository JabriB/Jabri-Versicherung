# SMS Verification Setup Guide

Your phone verification system now uses Vonage Verify API v2 for secure, automatic phone number verification.

## Current Status

- **Dev Mode**: The system runs in dev mode when Vonage credentials are not configured, displaying verification codes on screen for testing
- **Production Mode**: With Vonage credentials configured, the system uses the Vonage Verify API v2 to send real SMS messages

## How It Works

### Vonage Verify API v2

The system uses the modern Vonage Verify API v2 which:
- Automatically sends SMS verification codes
- Handles code generation securely on Vonage's servers
- Provides automatic retry with voice fallback if SMS fails
- Validates codes server-side through Vonage's API
- Prevents code exposure in your application

### Two Operating Modes

**Dev Mode** (No Vonage credentials):
- Generates 6-digit codes locally
- Displays codes in a blue box on screen
- Validates codes using hash comparison
- Perfect for local testing and development

**Production Mode** (With Vonage credentials):
- Uses Vonage Verify API v2 to send SMS
- Code generation handled by Vonage
- Code validation through Vonage API
- More secure as codes never pass through your app

## Setting Up Vonage Verify API v2

### Step 1: Create Vonage Account

1. Go to [https://www.vonage.com/communications-apis/](https://www.vonage.com/communications-apis/)
2. Sign up for a free account (includes €2 trial credit)
3. Verify your email and phone number

### Step 2: Get Your API Credentials

1. Log into [Vonage Dashboard](https://dashboard.nexmo.com/)
2. On your dashboard, locate:
   - **API Key** (8-character alphanumeric string like `abc12345`)
   - **API Secret** (16-character string - click "Show" to reveal)

**Important**: These are your main account credentials, not application-specific keys.

### Step 3: Configure Environment Variables

The edge function uses these environment variables (automatically configured):
- `VONAGE_API_KEY` - Your 8-character API Key
- `VONAGE_API_SECRET` - Your 16-character API Secret

**Note**: You do NOT need to purchase a phone number for the Verify API v2. The API handles sender numbers automatically.

## Testing Flow

### Dev Mode Testing (No Vonage Setup)

1. Enter a phone number in the form (German format: 0176... or +49176...)
2. Click "Send Code"
3. A blue box appears showing: "DEV MODE: Your code is 123456"
4. Enter the 6-digit code in the verification field
5. Click "Verify"
6. The Next Step button becomes enabled

### Production Mode Testing (With Vonage)

1. Enter a phone number in the form
2. Click "Send Code"
3. User receives an SMS with a 6-digit code
4. Enter the code in the verification field
5. Click "Verify"
6. The system validates the code with Vonage API
7. The Next Step button becomes enabled

## Phone Number Format

The system accepts German phone numbers in multiple formats:
- `0176 12345678` (with leading 0)
- `+49 176 12345678` (with country code)
- `49 176 12345678` (country code without +)
- `017612345678` (no spaces)

All formats are automatically normalized to E.164 format (+49xxxxxxxxx).

## Security Features

### Rate Limiting
- Maximum 3 verification requests per hour per phone number
- Maximum 10 verification requests per hour per IP address
- Prevents SMS bombing and abuse

### Code Expiration
- Verification codes expire after 10 minutes
- Users must request a new code if expired

### Attempt Limiting
- Maximum 5 verification attempts per code
- After 5 failed attempts, a new code must be requested

### Secure Storage
- In dev mode: Codes are hashed using SHA-256 before storage
- In production: Only Vonage request ID is stored (no code in database)

## Troubleshooting

### SMS Not Received in Production?

1. Check phone number format is correct
2. Verify Vonage API credentials are correct
3. Check Vonage Dashboard for API logs
4. Ensure phone number can receive SMS
5. Wait a few minutes (SMS can have delays)

### Invalid Credentials Error?

- Verify your API Key and API Secret are correct
- Make sure you copied the full API Secret (not truncated)
- Check that your Vonage account is active

### Dev Mode Code Not Showing?

- Look for a blue information box below the phone input
- Check browser console for detailed logs
- Ensure you clicked "Send Code" button

### Verification Always Fails?

- Double-check you entered the exact 6-digit code
- Verify the code hasn't expired (10 minute limit)
- Check you haven't exceeded 5 verification attempts
- Try requesting a new code

## API Details

### Vonage Verify API v2 Workflow

**Step 1: Send Verification (POST /v2/verify)**
```json
{
  "brand": "ARAG Brhan Jabri",
  "code_length": 6,
  "channel_timeout": 300,
  "workflow": [
    {
      "channel": "sms",
      "to": "+49176..."
    }
  ]
}
```

Response includes `request_id` which is stored in the database.

**Step 2: Check Code (POST /v2/verify/{request_id})**
```json
{
  "code": "123456"
}
```

Response status `completed` indicates successful verification.

## Costs

### Trial Account
- **Free credit**: €2
- **Sufficient for**: ~40 verifications

### After Trial
- **Per verification**: ~€0.05 (varies by country)
- **No monthly fees**: Pay only for usage
- **No phone number needed**: Verify API handles it

### Cost Comparison
- Traditional SMS API: Requires phone number rental (~€3/month) + per-SMS fees
- Verify API v2: No monthly fees, pay per verification only

## Support & Documentation

- **Vonage Support**: [https://support.vonage.com](https://support.vonage.com)
- **Verify API v2 Docs**: [https://developer.vonage.com/verify/overview](https://developer.vonage.com/verify/overview)
- **API Reference**: [https://developer.vonage.com/api/verify.v2](https://developer.vonage.com/api/verify.v2)

## Migration from Old SMS API

If you previously configured the old SMS API with `VONAGE_FROM_NUMBER`, the system will automatically use Verify API v2 instead. The `VONAGE_FROM_NUMBER` variable is no longer needed.
