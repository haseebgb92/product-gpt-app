import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January25,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  isEmbeddedApp: true,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  hooks: {
    beforeAuth: (request) => {
      // Ensure headers are set correctly for iframe embedding
      const response = new Response();
      response.headers.delete("X-Frame-Options");
      response.headers.set(
        "Content-Security-Policy",
        "frame-ancestors 'self' https://admin.shopify.com https://*.myshopify.com;"
      );
      return response;
    },
    afterAuth: (request, response) => {
      // Remove X-Frame-Options from all responses
      response.headers.delete("X-Frame-Options");
      response.headers.set(
        "Content-Security-Policy",
        "frame-ancestors 'self' https://admin.shopify.com https://*.myshopify.com;"
      );
      return response;
    },
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.January25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
