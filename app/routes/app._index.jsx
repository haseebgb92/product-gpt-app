export const loader = async ({ request }) => {
  return new Response("Hello World - App is working!", {
    headers: {
      "Content-Type": "text/html",
    },
  });
};

export default function Index() {
  return (
    <html>
      <head>
        <title>Product-GPT App</title>
      </head>
      <body>
        <h1>Product-GPT App</h1>
        <p>This is a simple Shopify app that will display products and integrate with ChatGPT.</p>
        <button onClick={() => window.open('https://chat.openai.com/auth/login', '_blank')}>
          Connect ChatGPT
        </button>
      </body>
    </html>
  );
}
