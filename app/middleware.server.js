// Middleware to handle X-Frame-Options for iframe embedding
export function handleFrameOptions(request, response) {
  // Remove X-Frame-Options header to allow iframe embedding
  response.headers.delete("X-Frame-Options");
  
  // Add Content-Security-Policy for frame-ancestors
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://admin.shopify.com https://*.myshopify.com;"
  );
  
  return response;
}

// Middleware to be applied to all requests
export function applyFrameOptionsMiddleware(request, response) {
  return handleFrameOptions(request, response);
} 