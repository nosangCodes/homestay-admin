import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  page: number;
  pageSize: number;
  pages: number;
  range?: number;
};

export default function TablePagination({
  className,
  page,
  pageSize,
  pages,
  range = 1,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const handleNextPage = () => {
    setSearchParams((prev) => ({
      ...prev,
      page: page + 1,
      pageSize,
    }));
  };
  const handlePrevPage = () => {
    setSearchParams((prev) => ({
      ...prev,
      page: page - 1,
      pageSize,
    }));
  };

  const getPageNumbers = () => {
    const result = [];
    const start = Math.max(1, page - range);
    const end = Math.min(pages, page + range);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  return (
    <div className={cn("", className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              className="select-none"
              disabled={page === 1}
              variant={page === 1 ? "ghost" : "default"}
              onClick={handlePrevPage}
            >
              Prev
            </Button>
          </PaginationItem>
          {getPageNumbers().map((pageNumber, index, array) => (
            <React.Fragment key={pageNumber}>
              {index === 0 && pageNumber !== 1 && <PaginationEllipsis />}
              <PaginationItem>
                <Button
                  variant={pageNumber === page ? "outline" : "ghost"}
                  className={cn(
                    "select-none",
                    pageNumber === page && "text-emerald-700"
                  )}
                  onClick={() => {
                    setSearchParams((prev) => ({
                      ...prev,
                      page: pageNumber,
                      pageSize,
                    }));
                  }}
                >
                  {pageNumber}
                </Button>
              </PaginationItem>
              {index === array.length - 1 && pageNumber !== pages && (
                <PaginationEllipsis />
              )}
            </React.Fragment>
          ))}
          <PaginationItem>
            <Button
              variant={page === pages ? "ghost" : "default"}
              className="select-none"
              disabled={page === pages}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
