export interface Product {
  id: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  descriptionHtml: string;
  description: string;
  handle: string;
  productType: string;
  title: string;
  vendor: string;
  publishedAt: string;
  onlineStoreUrl: string | null;
  options: ProductOption[];
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface ProductOption {
  id: string;
  name: string;
  values: {
    value: string;
    type: {
      name: string;
      kind: string;
    };
  }[];
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      name: string;
      values: string;
    };
    implementsNode: boolean;
  };
}

export interface ProductImage {
  id: string;
  src: string;
  altText: string;
  width: number;
  height: number;
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      altText: string;
      height: string;
      id: string;
      url: string;
      width: string;
    };
    implementsNode: boolean;
  };
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  variableValues: {
    first: number;
    productsFirst: number;
  };
}

export interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        amount: string;
        currencyCode: string;
      };
      implementsNode: boolean;
    };
  };
  priceV2: {
    amount: string;
    currencyCode: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        amount: string;
        currencyCode: string;
      };
      implementsNode: boolean;
    };
  };
  weight: number;
  available: boolean;
  sku: string;
  compareAtPrice: null | string;
  compareAtPriceV2: null | string;
  image: {
    id: string;
    src: string;
    altText: string;
    width: number;
    height: number;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        altText: string;
        height: string;
        id: string;
        url: string;
        width: string;
      };
      implementsNode: boolean;
    };
  };
  selectedOptions: {
    name: string;
    value: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        name: string;
        value: string;
      };
      implementsNode: boolean;
    };
  }[];
  unitPrice: null | string;
  unitPriceMeasurement: {
    measuredType: null | string;
    quantityUnit: null | string;
    quantityValue: number;
    referenceUnit: null | string;
    referenceValue: number;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        measuredType: string;
        quantityUnit: string;
        quantityValue: string;
        referenceUnit: string;
        referenceValue: string;
      };
      implementsNode: boolean;
    };
  };
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      availableForSale: string;
      compareAtPrice: string;
      compareAtPriceV2: string;
      id: string;
      image: string;
      price: string;
      priceV2: string;
      product: string;
      selectedOptions: string;
      sku: string;
      title: string;
      unitPrice: string;
      unitPriceMeasurement: string;
      weight: string;
    };
    implementsNode: boolean;
  };
}

type SortByOptions = "title" | "createdAt" | "price";
type SortOrderOptions = "asc" | "desc";

export function sortProducts(
  products: Product[],
  sortBy: SortByOptions,
  sortOrder: SortOrderOptions
): Product[] {
  const sortedProducts = [...products];

  // Sort by title
  if (sortBy === "title") {
    sortedProducts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }

  // Sort by createdAt
  if (sortBy === "createdAt") {
    sortedProducts.sort((a, b) => {
      if (sortOrder === "asc") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });
  }

  // Sort by price
  if (sortBy === "price") {
    sortedProducts.sort((a, b) => {
      const priceA = parseFloat(a.variants[0].price.amount);
      const priceB = parseFloat(b.variants[0].price.amount);

      if (sortOrder === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  }

  return sortedProducts;
}
