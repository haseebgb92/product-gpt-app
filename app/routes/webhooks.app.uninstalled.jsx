import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { topic, shop, session } = await authenticate.webhook(request);

  if (!session) {
    // The shop is uninstalling the app
    console.log("Shop is uninstalling the app:", shop);
  }

  return new Response();
};
