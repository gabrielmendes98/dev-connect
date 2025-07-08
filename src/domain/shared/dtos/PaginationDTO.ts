export interface OffsetPaginationInputDTO {
  page: number;
  limit: number;
}

export interface OffsetPaginationOutputDTO<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface CursorPaginationInputDTO {
  limit: number;
  after?: string | null;
}

export interface CursorPaginationOutputDTO<T> {
  items: T[];
  nextCursor?: string | null;
}
