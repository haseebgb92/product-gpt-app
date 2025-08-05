# Quick Deployment Guide - Choose Your Platform

## 🚀 **Option 1: Vercel (Recommended - Free)**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Import your repository**
4. **Deploy automatically**

**Environment Variables to add:**
```
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SCOPES=write_products
SHOPIFY_APP_URL=https://your-app-name.vercel.app
```

## 🚀 **Option 2: Render (Free)**

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Create New Web Service**
4. **Connect your repository**
5. **Set build command:** `npm run build`
6. **Set start command:** `npm start`

## 🚀 **Option 3: Railway (Free Tier)**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Deploy from GitHub**
4. **Add environment variables**

## 🚀 **Option 4: Netlify (Free)**

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up with GitHub**
3. **Deploy from repository**
4. **Set build command:** `npm run build`
5. **Set publish directory:** `build/client`

## 📋 **Required Environment Variables**

Add these to your chosen platform:

```bash
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SCOPES=write_products
SHOPIFY_APP_URL=https://your-deployed-url.com
NODE_ENV=production
```

## 🔧 **After Deployment**

1. **Copy your new URL** (e.g., `https://your-app.vercel.app`)
2. **Update Shopify Partner Dashboard:**
   - App URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/auth/callback`
3. **Test your app** in Shopify admin

## ✅ **Benefits of Production Deployment**

- ✅ **No more X-Frame-Options errors**
- ✅ **App runs 24/7**
- ✅ **No development server needed**
- ✅ **Free hosting**
- ✅ **Automatic SSL certificates**
- ✅ **Professional URLs**

## 🎯 **Recommended: Vercel**

**Why Vercel?**
- Free tier with generous limits
- Automatic deployments from GitHub
- Built-in SSL certificates
- Excellent performance
- Easy environment variable management

**Steps:**
1. Push your code to GitHub
2. Go to vercel.com
3. Import your repository
4. Add environment variables
5. Deploy!

Your app will be live in minutes! 🚀 