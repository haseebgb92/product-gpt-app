import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { topic, shop, session } = await authenticate.webhook(request);

  if (!session) {
    // The shop is updating scopes
    console.log("Shop is updating scopes:", shop);
  }

  return new Response();
};
