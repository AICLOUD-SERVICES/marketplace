import Showroom from "@/components/layout/Showroom";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";

const getCollections = async () => {
  const collections = await shopifyClient.collection.fetchAllWithProducts();
  const shop = await shopifyClient.shop.fetchInfo();
  const res = await parseShopifyResponse(collections);
  const resShop = await parseShopifyResponse(shop);
  console.log(resShop);
  return res;
};

export default async function ShowroomPage() {
  const data = await getCollections();

  const collections = data.map((e: any) => {
    return {
      handle: e.handle,
      title: e.title,
    };
  });

  return <Showroom data={data} collections={collections} />;
}
