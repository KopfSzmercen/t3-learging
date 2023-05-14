export class PaginationHelper {
  private readonly pageNumber: number;
  private readonly pageSize: number;
  private readonly count: number;

  constructor({
    count,
    pageNumber,
    pageSize,
  }: {
    count: number;
    pageNumber: number;
    pageSize: number;
  }) {
    this.count = count;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }

  get startIndex() {
    return (this.pageNumber - 1) * this.pageSize;
  }

  get totalPages() {
    return Math.ceil(this.count / this.pageSize);
  }

  get hasPreviousPage() {
    return this.startIndex > 0;
  }

  get hasNextPage() {
    return this.startIndex + this.pageSize < this.count;
  }
}
