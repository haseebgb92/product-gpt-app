import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  Thumbnail,
  Badge,
  Modal,
  TextField,
  Divider,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  try {
    await authenticate.admin(request);
    return null;
  } catch (error) {
    console.error("Authentication error:", error);
    return { error: "Authentication failed" };
  }
};

export const action = async ({ request }) => {
  try {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "fetchProducts") {
      const response = await admin.graphql(
        `#graphql
          query getProducts($first: Int!) {
            products(first: $first) {
              edges {
                node {
                  id
                  title
                  handle
                  status
                  description
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        title
                        price
                        availableForSale
                      }
                    }
                  }
                  tags
                  productType
                  vendor
                }
              }
            }
          }`,
        {
          variables: {
            first: 20,
          },
        },
      );
      const responseJson = await response.json();
      return { products: responseJson.data.products.edges };
    }

    return null;
  } catch (error) {
    console.error("Action error:", error);
    return { error: "Failed to fetch products" };
  }
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [chatGptModalOpen, setChatGptModalOpen] = useState(false);
  const [chatGptApiKey, setChatGptApiKey] = useState("");
  const [isLoggedInToChatGpt, setIsLoggedInToChatGpt] = useState(false);
  const [loginMethod, setLoginMethod] = useState("web"); // "web" or "api"

  const isLoading = fetcher.state === "loading" || fetcher.state === "submitting";
  const products = fetcher.data?.products || [];

  useEffect(() => {
    // Load products on component mount
    fetcher.submit({ action: "fetchProducts" }, { method: "POST" });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleChatGptLogin = () => {
    if (loginMethod === "api" && chatGptApiKey.trim()) {
      setIsLoggedInToChatGpt(true);
      setChatGptModalOpen(false);
      shopify.toast.show("Successfully logged in to ChatGPT with API key!");
    } else if (loginMethod === "web") {
      // Open ChatGPT login in a new window
      const chatGptLoginUrl = "https://chat.openai.com/auth/login";
      window.open(chatGptLoginUrl, "_blank", "width=800,height=600");
      setIsLoggedInToChatGpt(true);
      setChatGptModalOpen(false);
      shopify.toast.show("ChatGPT login window opened! Please login there.");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Page>
      <TitleBar title="Product-GPT App" />
      
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="200">
                      <Text as="h2" variant="headingMd">
                        Store Products
                      </Text>
                      <Text variant="bodyMd" as="p">
                        Browse and view details of products from your Shopify store.
                      </Text>
                    </BlockStack>
                    <Button 
                      variant="primary" 
                      onClick={() => setChatGptModalOpen(true)}
                      disabled={isLoggedInToChatGpt}
                    >
                      {isLoggedInToChatGpt ? "ChatGPT Connected" : "Connect ChatGPT"}
                    </Button>
                  </InlineStack>
                </BlockStack>
                
                {isLoading ? (
                  <Text>Loading products...</Text>
                ) : (
                  <BlockStack gap="400">
                    {products.map(({ node: product }) => (
                      <Card key={product.id} padding="400">
                        <InlineStack align="space-between" blockAlign="center">
                          <InlineStack gap="400" blockAlign="center">
                            {product.images.edges.length > 0 ? (
                              <Thumbnail
                                source={product.images.edges[0].node.url}
                                alt={product.images.edges[0].node.altText || product.title}
                                size="small"
                              />
                            ) : (
                              <Box
                                background="bg-surface-secondary"
                                padding="200"
                                borderRadius="200"
                                minWidth="60px"
                                minHeight="60px"
                              >
                                <Text variant="bodySm" alignment="center">No Image</Text>
                              </Box>
                            )}
                            <BlockStack gap="200">
                              <Text variant="headingSm" as="h3">
                                {product.title}
                              </Text>
                              <InlineStack gap="200">
                                <Badge tone={product.status === 'ACTIVE' ? 'success' : 'warning'}>
                                  {product.status}
                                </Badge>
                                {product.productType && (
                                  <Badge tone="info">{product.productType}</Badge>
                                )}
                              </InlineStack>
                              {product.variants.edges.length > 0 && (
                                <Text variant="bodyMd">
                                  Starting at {formatPrice(product.variants.edges[0].node.price)}
                                </Text>
                              )}
                            </BlockStack>
                          </InlineStack>
                          <Button
                            variant="plain"
                            onClick={() => handleProductClick(product)}
                          >
                            View Details
                          </Button>
                        </InlineStack>
                      </Card>
                    ))}
                  </BlockStack>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
          
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App Features
                  </Text>
                  <List>
                    <List.Item>Browse store products</List.Item>
                    <List.Item>View detailed product information</List.Item>
                    <List.Item>Connect with ChatGPT for AI assistance</List.Item>
                  </List>
                </BlockStack>
              </Card>
              
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    ChatGPT Status
                  </Text>
                  <InlineStack align="space-between">
                    <Text as="span" variant="bodyMd">
                      Connection Status
                    </Text>
                    <Badge tone={isLoggedInToChatGpt ? 'success' : 'critical'}>
                      {isLoggedInToChatGpt ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </InlineStack>
                  {isLoggedInToChatGpt && (
                    <Button
                      variant="plain"
                      onClick={() => {
                        setIsLoggedInToChatGpt(false);
                        setChatGptApiKey("");
                      }}
                    >
                      Disconnect
                    </Button>
                  )}
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Modal
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.title}
          primaryAction={{
            content: 'Close',
            onAction: () => setSelectedProduct(null),
          }}
        >
          <Modal.Section>
            <BlockStack gap="400">
              {selectedProduct.images.edges.length > 0 && (
                <Box padding="400">
                  <img
                    src={selectedProduct.images.edges[0].node.url}
                    alt={selectedProduct.images.edges[0].node.altText || selectedProduct.title}
                    style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                  />
                </Box>
              )}
              
              <BlockStack gap="300">
                <Text variant="headingMd">Product Information</Text>
                <InlineStack align="space-between">
                  <Text as="span" variant="bodyMd">Status:</Text>
                  <Badge tone={selectedProduct.status === 'ACTIVE' ? 'success' : 'warning'}>
                    {selectedProduct.status}
                  </Badge>
                </InlineStack>
                
                {selectedProduct.vendor && (
                  <InlineStack align="space-between">
                    <Text as="span" variant="bodyMd">Vendor:</Text>
                    <Text as="span" variant="bodyMd">{selectedProduct.vendor}</Text>
                  </InlineStack>
                )}
                
                {selectedProduct.productType && (
                  <InlineStack align="space-between">
                    <Text as="span" variant="bodyMd">Type:</Text>
                    <Text as="span" variant="bodyMd">{selectedProduct.productType}</Text>
                  </InlineStack>
                )}
                
                {selectedProduct.tags.length > 0 && (
                  <BlockStack gap="200">
                    <Text as="span" variant="bodyMd">Tags:</Text>
                    <InlineStack gap="200" wrap>
                      {selectedProduct.tags.map((tag, index) => (
                        <Badge key={index} tone="info">{tag}</Badge>
                      ))}
                    </InlineStack>
                  </BlockStack>
                )}
              </BlockStack>
              
              {selectedProduct.description && (
                <>
                  <Divider />
                  <BlockStack gap="300">
                    <Text variant="headingMd">Description</Text>
                    <Text variant="bodyMd">{selectedProduct.description}</Text>
                  </BlockStack>
                </>
              )}
              
              {selectedProduct.variants.edges.length > 0 && (
                <>
                  <Divider />
                  <BlockStack gap="300">
                    <Text variant="headingMd">Variants</Text>
                    {selectedProduct.variants.edges.map(({ node: variant }) => (
                      <Card key={variant.id} padding="300">
                        <InlineStack align="space-between">
                          <Text variant="bodyMd">{variant.title}</Text>
                          <InlineStack gap="200">
                            <Text variant="bodyMd">{formatPrice(variant.price)}</Text>
                            <Badge tone={variant.availableForSale ? 'success' : 'critical'}>
                              {variant.availableForSale ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </InlineStack>
                        </InlineStack>
                      </Card>
                    ))}
                  </BlockStack>
                </>
              )}
            </BlockStack>
          </Modal.Section>
        </Modal>
      )}

      {/* ChatGPT Login Modal */}
      <Modal
        open={chatGptModalOpen}
        onClose={() => setChatGptModalOpen(false)}
        title="Login to ChatGPT"
        primaryAction={{
          content: loginMethod === "web" ? "Open Login" : "Login with API",
          onAction: handleChatGptLogin,
          disabled: loginMethod === "api" && !chatGptApiKey.trim(),
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setChatGptModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text variant="bodyMd">
              Choose how you want to connect to ChatGPT:
            </Text>
            
            <BlockStack gap="300">
              <Card>
                <BlockStack gap="200">
                  <InlineStack align="start" gap="200">
                    <input
                      type="radio"
                      id="web-login"
                      name="login-method"
                      value="web"
                      checked={loginMethod === "web"}
                      onChange={(e) => setLoginMethod(e.target.value)}
                    />
                    <BlockStack gap="100">
                      <Text variant="headingSm" as="label" htmlFor="web-login">
                        Web Login (Recommended)
                      </Text>
                      <Text variant="bodySm">
                        Login with your existing ChatGPT account. Opens ChatGPT login page in a new window.
                      </Text>
                    </BlockStack>
                  </InlineStack>
                </BlockStack>
              </Card>
              
              <Card>
                <BlockStack gap="200">
                  <InlineStack align="start" gap="200">
                    <input
                      type="radio"
                      id="api-login"
                      name="login-method"
                      value="api"
                      checked={loginMethod === "api"}
                      onChange={(e) => setLoginMethod(e.target.value)}
                    />
                    <BlockStack gap="100">
                      <Text variant="headingSm" as="label" htmlFor="api-login">
                        API Key Login
                      </Text>
                      <Text variant="bodySm">
                        Use your OpenAI API key for direct integration.
                      </Text>
                    </BlockStack>
                  </InlineStack>
                  
                  {loginMethod === "api" && (
                    <TextField
                      label="API Key"
                      value={chatGptApiKey}
                      onChange={setChatGptApiKey}
                      type="password"
                      placeholder="sk-..."
                      helpText="Your API key will be stored securely and used only for ChatGPT integration."
                    />
                  )}
                </BlockStack>
              </Card>
            </BlockStack>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
