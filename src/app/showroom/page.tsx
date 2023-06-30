import Showroom from "@/components/layout/Showroom";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";
import { useSearchParams } from "next/navigation";

const getCollections = async () => {
  const collections = await shopifyClient.collection.fetchAllWithProducts();
  const shop = await shopifyClient.shop.fetchInfo();
  const res = await parseShopifyResponse(collections);
  const resShop = await parseShopifyResponse(shop);

  // console.log(res);

  return res;
};

export default async function ShowroomPage() {
  const data = await getCollections();

  // console.log(data);

  const collections = [
    { handle: "all", title: "All Collections" },
    ...data.map((e: any) => {
      return {
        handle: e.handle,
        title: e.title,
      };
    }),
  ];

  return <Showroom data={data} collections={collections} />;
}
