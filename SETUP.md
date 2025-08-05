# Product-GPT App Setup Guide

## What This App Does

This Shopify app provides:
1. **Product Display**: Shows all products from your Shopify store
2. **Product Details**: Detailed view with images, variants, pricing, and stock status
3. **ChatGPT Integration**: Login with your OpenAI API key for AI features

## Quick Start

### 1. Start the Development Server

```bash
# Navigate to the app directory
cd product-gpt

# Start the development server (this will also start ngrok)
npm run dev
```

### 2. Configure the App

When you run `npm run dev`, the Shopify CLI will:
- Start a local development server
- Automatically start ngrok to create a public URL
- Open a browser window to configure your app

### 3. Set Up Your Shopify Store

1. Follow the prompts in the browser to:
   - Create a new app in your Shopify Partner account
   - Install the app on your development store
   - Configure the app settings

### 4. Access Your App

Once configured, you can access your app at:
- **Local Development**: `http://localhost:3000`
- **Public URL**: The ngrok URL provided by Shopify CLI

## App Features

### Product Display
- Browse all products from your store
- See product thumbnails, titles, and basic info
- View product status (Active/Draft) and type

### Product Details
Click "View Details" on any product to see:
- Full product images
- Complete product information
- All variants with pricing
- Stock availability
- Product tags and description

### ChatGPT Integration
1. Click "Login to ChatGPT" in the app header
2. Enter your OpenAI API key (get one from https://platform.openai.com/api-keys)
3. The app will store your key securely for the session
4. Status will show "Connected" when successful

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Shopify
npm run deploy

# Link to existing app
npm run config:link
```

## Environment Setup

The app automatically handles:
- **Database**: Uses Prisma with SQLite for development
- **Authentication**: Shopify App Bridge for secure authentication
- **Tunneling**: Ngrok for external access
- **API Access**: GraphQL queries to Shopify Admin API

## Troubleshooting

### If the development server doesn't start:
```bash
# Make sure you're in the right directory
cd product-gpt

# Install dependencies
npm install

# Try starting again
npm run dev
```

### If ngrok isn't working:
- The Shopify CLI should handle ngrok automatically
- If you get ngrok errors, try restarting the development server

### If you can't see products:
- Make sure your development store has products
- Check that the app has the correct permissions (`write_products` scope)
- Verify the app is properly installed on your store

## Next Steps

Once the app is running, you can:
1. Browse your store's products
2. View detailed product information
3. Connect ChatGPT for AI features
4. Customize the app further based on your needs

## Support

- [Shopify App Development](https://shopify.dev/docs/apps)
- [Shopify Polaris](https://polaris.shopify.com)
- [Remix Documentation](https://remix.run/docs) 