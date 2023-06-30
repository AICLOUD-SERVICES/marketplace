export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
) => {
  return Math.ceil(totalItems / itemsPerPage);
};
