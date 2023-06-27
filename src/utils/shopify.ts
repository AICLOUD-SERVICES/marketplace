import Client from "shopify-buy";

export const shopifyClient = Client.buildClient({
  storefrontAccessToken: "37bc9ba977eee635ba5a6902d8341a3a",
  domain: "themarketplace54.myshopify.com",
  apiVersion: "2023-04",
});

export const parseShopifyResponse = (response: any) =>
  JSON.parse(JSON.stringify(response));
