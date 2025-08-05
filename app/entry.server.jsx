import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { isbot } from "isbot";
import { addDocumentResponseHeaders } from "./shopify.server";
import { applyFrameOptionsMiddleware } from "./middleware.server";

export const streamTimeout = 5000;

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  // Add our custom headers first
  responseHeaders.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://admin.shopify.com https://*.myshopify.com;"
  );
  
  // Then add Shopify headers
  addDocumentResponseHeaders(request, responseHeaders);
  
  // Finally, ensure X-Frame-Options is removed
  responseHeaders.delete("X-Frame-Options");
  const userAgent = request.headers.get("user-agent");
  const callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";

  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

                     responseHeaders.set("Content-Type", "text/html");
           
           // Ensure X-Frame-Options is removed and CSP is set for iframe embedding
           responseHeaders.delete("X-Frame-Options");
           responseHeaders.set(
             "Content-Security-Policy",
             "frame-ancestors 'self' https://admin.shopify.com https://*.myshopify.com;"
           );
           
           const finalResponse = new Response(stream, {
             headers: responseHeaders,
             status: responseStatusCode,
           });
           
           // Apply frame options middleware to the final response
           const processedResponse = applyFrameOptionsMiddleware(request, finalResponse);
           
           resolve(processedResponse);
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        },
      },
    );

    // Automatically timeout the React renderer after 6 seconds, which ensures
    // React has enough time to flush down the rejected boundary contents
    setTimeout(abort, streamTimeout + 1000);
  });
}
