import Showroom from "@/layout/Showroom";
import NotFound from "@/components/shared/NotFound/NotFound";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";
import { Product } from "shopify-buy";

const getCollection = async (handle: string) => {
  const collection = await shopifyClient.collection.fetchByHandle(handle);
  const res = await parseShopifyResponse(collection);
  return res;
};

export default function ShowroomPage({ data }: { data: Product }) {
  const collections = data
    ? [
        { handle: "all", title: "All Collections" },
        ...[data].map((e: any) => {
          return {
            handle: e.handle,
            title: e.title,
          };
        }),
      ]
    : [];

  if (!collections.length) {
    return <NotFound />;
  }

  return <Showroom data={[data]} collections={collections} collection={data} />;
}

export const getServerSideProps = async ({
  params,
}: {
  params: { collection: string };
}) => {
  const { collection } = params;
  const data = await getCollection(collection);

  return {
    props: {
      data,
    },
  };
};
