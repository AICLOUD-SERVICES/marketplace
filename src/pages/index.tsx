import NotFound from "@/components/shared/NotFound/NotFound";
import Pagination from "@/components/shared/Pagination/Pagination";
import ProductCardGrid from "@/components/shared/ProductCardGrid/ProductCardGrid";
import { calculateTotalPages } from "@/utils/common";
import { parseShopifyResponse, shopifyClient } from "@/utils/shopify";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "shopify-buy";

const getProducts = async () => {
  const products = await shopifyClient.product.fetchAll();
  const nextFetch = await shopifyClient.fetchNextPage(products);
  console.log(nextFetch);
  const res = await parseShopifyResponse(products);
  return res;
};

export default function Home({ data }: { data: Product[] }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState<any>([]);

  // Paginate the collections based on the page number
  const perPage = 3; // Number of collections per page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  console.log(data);

  useEffect(() => {
    const totalPages = data.length && calculateTotalPages(data.length, perPage);
    setTotalPages(totalPages);

    const paginatedData = data.length && data.slice(startIndex, endIndex);

    if (paginatedData && paginatedData.length) {
      setProducts(paginatedData);
    } else {
      setProducts(products);
    }
  }, [currentPage]);

  if (!data.length) {
    return <NotFound />;
  }

  return (
    <div className="container-fluid pt-12 mx-auto px-4 md:px-12 flex flex-col justify-between h-[100vh]">
      <div>
        <ProductCardGrid data={products} />
      </div>
      {data.length && totalPages > 1 ? (
        <div className="mt-auto">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      ) : null}
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await getProducts();

  return {
    props: {
      data,
    },
  };
};
