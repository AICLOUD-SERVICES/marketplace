import NotFound from "@/components/shared/NotFound/NotFound";
import Showroom from "@/layout/Showroom";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";
import { useSearchParams } from "next/navigation";
import { Product } from "shopify-buy";

const getCollections = async () => {
  const collections = await shopifyClient.collection.fetchAllWithProducts();
  const shop = await shopifyClient.shop.fetchInfo();
  const res = await parseShopifyResponse(collections);
  const resShop = await parseShopifyResponse(shop);

  return res;
};

export default function ShowroomPage({ data }: { data: Product[] }) {
  const collections = [
    { handle: "all", title: "All Collections" },
    ...data.map((e: any) => {
      return {
        handle: e.handle,
        title: e.title,
      };
    }),
  ];

  if (!collections.length) {
    return <NotFound />;
  }
  return <Showroom data={data} collections={collections} />;
}

export const getServerSideProps = async () => {
  const data = await getCollections();

  return {
    props: {
      data,
    },
  };
};
