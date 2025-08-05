# Product-GPT App Deployment Guide

## Deploy to Production (Recommended)

### Option 1: Fly.io (Recommended)

1. **Install Fly CLI:**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   
   # Or download from: https://fly.io/docs/hands-on/install-flyctl/
   ```

2. **Login to Fly:**
   ```bash
   fly auth login
   ```

3. **Deploy the app:**
   ```bash
   npm run deploy:fly
   ```

4. **Set environment variables:**
   ```bash
   fly secrets set SHOPIFY_API_KEY=your_api_key
   fly secrets set SHOPIFY_API_SECRET=your_api_secret
   fly secrets set SCOPES=write_products
   fly secrets set SHOPIFY_APP_URL=https://your-app-name.fly.dev
   ```

### Option 2: Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Deploy the app:**
   ```bash
   npm run deploy:railway
   ```

4. **Set environment variables in Railway dashboard**

### Option 3: Render

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Set build command:** `npm run build`
4. **Set start command:** `npm start`
5. **Add environment variables**

## Environment Variables Required

```bash
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SCOPES=write_products
SHOPIFY_APP_URL=https://your-deployed-url.com
```

## Update Shopify App Configuration

After deployment:

1. **Update your app URL** in Shopify Partner Dashboard
2. **Update redirect URLs** to your new domain
3. **Test the app** in your Shopify store

## Benefits of Production Deployment

- ✅ **No more X-Frame-Options issues**
- ✅ **App runs 24/7**
- ✅ **No development server needed**
- ✅ **Proper SSL certificates**
- ✅ **Better performance**
- ✅ **Professional hosting**

## Quick Deploy Commands

```bash
# Build the app
npm run build

# Deploy to Fly.io
npm run deploy:fly

# Or deploy to Railway
npm run deploy:railway
```

## Troubleshooting

- **If deployment fails:** Check environment variables
- **If app doesn't load:** Verify Shopify app configuration
- **If X-Frame-Options still appears:** Production hosting should fix this 