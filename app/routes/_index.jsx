export async function loader() {
  return new Response("Product-GPT App is running!", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export default function Index() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Product-GPT App</h1>
      <p>This app is running successfully!</p>
      <p>Access the app through your Shopify Admin to see products and ChatGPT integration.</p>
    </div>
  );
} 