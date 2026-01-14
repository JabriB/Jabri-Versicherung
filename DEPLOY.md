# Deploying Jabri-Versicherung to Netlify

## Quick Deploy

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git remote add origin https://github.com/yourusername/jabri-versicherung.git
     git push -u origin main
     ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your `jabri-versicherung` repository

3. **Configure Build Settings** (Auto-detected from netlify.toml)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20

4. **Add Environment Variables** (if using Supabase)
   - Go to Site settings → Environment variables
   - Add your environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live in minutes!

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Custom Domain

1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow Netlify's DNS configuration instructions

## Continuous Deployment

Once connected to GitHub, Netlify automatically deploys:
- Every push to the `main` branch
- Pull request previews for testing

## Site URL

After deployment, Netlify provides:
- A free subdomain: `your-site-name.netlify.app`
- Option to add a custom domain

## Environment Variables

Remember to add these in Netlify's environment settings:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Troubleshooting

- **Build fails**: Check the build log in Netlify dashboard
- **404 on routes**: Ensure `netlify.toml` has the redirect rule (already configured)
- **Environment variables**: Make sure they're prefixed with `VITE_` and set in Netlify

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Deploy React Apps](https://docs.netlify.com/frameworks/react/)
