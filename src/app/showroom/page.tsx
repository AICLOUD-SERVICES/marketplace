import Showroom from "@/components/Showroom";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";

const getCollections = async () => {
  const collections = await shopifyClient.collection.fetchAllWithProducts();
  const res = await parseShopifyResponse(collections);
  console.log(res);
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
