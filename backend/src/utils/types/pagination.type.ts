export type PaginationResponse<T> = {
  items: T[];
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalItems: number;
    totalPages: number;
  };
};
