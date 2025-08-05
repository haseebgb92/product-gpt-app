# Product-GPT App

A simple Shopify app that displays products from your store, shows detailed product information, and includes ChatGPT integration for AI assistance.

## Features

- **Product Display**: Browse all products from your Shopify store
- **Product Details**: View comprehensive product information including:
  - Product images
  - Status and availability
  - Vendor and product type
  - Tags and descriptions
  - Variants with pricing and stock status
- **ChatGPT Integration**: Login with your ChatGPT API key for AI features

## Setup Instructions

### 1. Development Setup

```bash
# Navigate to the app directory
cd product-gpt

# Install dependencies (if not already done)
npm install

# Start the development server
shopify app dev
```

### 2. Ngrok Setup (for external access)

The app uses ngrok for external URL access. When you run `shopify app dev`, it will automatically:
- Start ngrok to create a public URL
- Configure the app with the ngrok URL
- Set up redirect URLs for authentication

### 3. ChatGPT Integration

To use the ChatGPT features:
1. Get your API key from [OpenAI](https://platform.openai.com/api-keys)
2. Click "Login to ChatGPT" in the app
3. Enter your API key (starts with `sk-`)
4. The app will store your key securely for the session

## App Structure

- **Main Page** (`app._index.jsx`): Displays products and ChatGPT login
- **Product Modal**: Shows detailed product information
- **ChatGPT Modal**: Handles API key input and authentication

## Technologies Used

- **Framework**: Remix
- **UI**: Shopify Polaris
- **API**: Shopify Admin GraphQL API
- **Authentication**: Shopify App Bridge
- **Tunneling**: Ngrok (via Shopify CLI)

## Development

The app is built with:
- React hooks for state management
- Shopify Polaris components for UI
- GraphQL queries to fetch product data
- Modal components for detailed views

## Next Steps

To extend the app, you can:
1. Add more ChatGPT features (product descriptions, recommendations)
2. Implement product search and filtering
3. Add inventory management features
4. Create product analytics dashboard

## Support

For issues or questions, refer to:
- [Shopify App Development](https://shopify.dev/docs/apps)
- [Shopify Polaris](https://polaris.shopify.com)
- [Remix Documentation](https://remix.run/docs)
