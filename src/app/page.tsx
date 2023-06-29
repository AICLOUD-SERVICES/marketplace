import ProductCardGrid from "@/components/shared/ProductCardGrid/ProductCardGrid";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";

const getProducts = async () => {
  const products = await shopifyClient.product.fetchAll();
  const res = await parseShopifyResponse(products);
  return res;
};

export default async function Home() {
  const data = await getProducts();

  return (
    <div className="container-fluid my-12 mx-auto px-4 md:px-12">
      <ProductCardGrid data={data} />
    </div>
  );
}
