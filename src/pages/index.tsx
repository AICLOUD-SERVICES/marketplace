import NotFound from "@/components/shared/NotFound/NotFound";
import Pagination from "@/components/shared/Pagination/Pagination";
import ProductCardGrid from "@/components/shared/ProductCardGrid/ProductCardGrid";
import { calculateTotalPages } from "@/utils/common";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";
import { Product } from "shopify-buy";

const getProducts = async () => {
  const products = await shopifyClient.product.fetchAll();
  const res = await parseShopifyResponse(products);
  return res;
};

export default function Home({
  data,
  totalPages,
  currentPage,
}: {
  data: Product[];
  totalPages: number;
  currentPage: number;
}) {
  if (!data.length) {
    return <NotFound />;
  }

  return (
    <div className="container-fluid pt-12 mx-auto px-4 md:px-12 flex flex-col justify-between h-[100vh]">
      <div>
        <ProductCardGrid data={data} />
      </div>
      {data.length && totalPages > 1 ? (
        <div className="mt-auto">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      ) : null}
    </div>
  );
}

export const getServerSideProps = async (context: {
  query: { page: string };
}) => {
  const { page = "1" } = context.query;
  const currentPage = Number(page);
  const data = await getProducts();
  // Paginate the collections based on the page number
  const perPage = 3; // Number of collections per page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const totalPages = data.length && calculateTotalPages(data.length, perPage);

  const paginatedData = data.length && data.slice(startIndex, endIndex);

  if (currentPage > totalPages || currentPage <= 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // Set this to true for permanent redirects
      },
    };
  }

  return {
    props: {
      data: paginatedData && paginatedData.length ? paginatedData : data,
      totalPages,
      currentPage,
    },
  };
};
