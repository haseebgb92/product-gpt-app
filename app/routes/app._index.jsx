import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  return json({ message: "App loaded successfully" });
};

export default function Index() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Product-GPT App</h1>
      <p>This is a simple Shopify app that will display products and integrate with ChatGPT.</p>
      <button 
        onClick={() => window.open('https://chat.openai.com/auth/login', '_blank')}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007cba",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Connect ChatGPT
      </button>
    </div>
  );
}
