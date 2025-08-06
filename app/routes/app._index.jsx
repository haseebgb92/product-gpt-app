import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export const loader = async ({ request }) => {
  // Simple loader that doesn't require authentication
  return { message: "App loaded successfully" };
};

export const action = async ({ request }) => {
  // Simple action that doesn't require authentication
  return { message: "Action completed" };
};

export default function Index() {
  const [chatGptModalOpen, setChatGptModalOpen] = useState(false);

  const handleChatGptLogin = () => {
    setChatGptModalOpen(true);
  };

  return (
    <Page>
      <TitleBar title="Product-GPT App" />
      
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <Text as="h2" variant="headingMd">
                Welcome to Product-GPT App
              </Text>
              
              <Text as="p" variant="bodyMd">
                This is a simple Shopify app that will display products and integrate with ChatGPT.
              </Text>
              
              <InlineStack gap="300">
                <Button 
                  primary 
                  onClick={handleChatGptLogin}
                >
                  Connect ChatGPT
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      {/* ChatGPT Login Modal */}
      {chatGptModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <Card style={{ maxWidth: '400px', padding: '20px' }}>
            <BlockStack gap="500">
              <Text as="h3" variant="headingMd">
                Connect to ChatGPT
              </Text>
              
              <Text as="p" variant="bodyMd">
                Choose how you want to connect to ChatGPT:
              </Text>
              
              <InlineStack gap="300">
                <Button 
                  onClick={() => {
                    window.open('https://chat.openai.com/auth/login', '_blank');
                    setChatGptModalOpen(false);
                  }}
                >
                  Web Login
                </Button>
                
                <Button 
                  onClick={() => setChatGptModalOpen(false)}
                >
                  Cancel
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </div>
      )}
    </Page>
  );
}
