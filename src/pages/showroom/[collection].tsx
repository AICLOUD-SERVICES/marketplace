import Showroom from "@/layout/Showroom";
import NotFound from "@/components/shared/NotFound/NotFound";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";
import { Product } from "shopify-buy";

const getCollection = async (handle: string) => {
  const collection = await shopifyClient.collection.fetchByHandle(handle);
  const data = await parseShopifyResponse(collection);
  return data;
};

const getAllCollections = async () => {
  const allCollections = await shopifyClient.collection.fetchAllWithProducts();
  const allData = await parseShopifyResponse(allCollections);
  return allData;
};

export default function ShowroomPage({
  data,
  collection,
}: {
  data: Product[];
  collection: string;
}) {
  const collections = data
    ? [
        { handle: "all", title: "All Collections" },
        ...data.map((e: any) => {
          return {
            handle: e.handle,
            title: e.title,
          };
        }),
      ]
    : [];

  console.log(data);

  if (!collections.length) {
    return <NotFound />;
  }

  return (
    <Showroom
      data={data}
      collections={collections}
      collection={collection === "all" ? collections[0] : collections[1]}
    />
  );
}

export const getServerSideProps = async ({
  params,
}: {
  params: { collection: string };
}) => {
  const { collection = "all" } = params;
  let data;

  if (collection === "all") {
    const res = await getAllCollections();
    data = res;
  } else {
    const res = await getCollection(collection);
    data = res;
  }

  return {
    props: {
      data: collection === "all" ? data : [data],
      collection,
    },
  };
};
