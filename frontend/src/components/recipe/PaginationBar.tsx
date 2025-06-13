import { Pagination, PaginationContent, PaginationEllipsis, 
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { RecipeResponse } from '@/lib/types/recipe.types';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PaginationBarProps {
  meta: RecipeResponse['meta'];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationBar({ onPageChange, meta, currentPage }: PaginationBarProps) {
  const totalPages = meta.totalPages;
  const [windowStart, setWindowStart] = useState(1);
  const windowSize = 5;
  const endPage = Math.min(windowStart + windowSize - 1, totalPages);

  useEffect(() => {
    if (currentPage < windowStart) {
      setWindowStart(Math.max(1, currentPage - Math.floor(windowSize / 2)));
    } else if (currentPage > windowStart + windowSize - 1) {
      setWindowStart(Math.min(totalPages - windowSize + 1, currentPage - Math.floor(windowSize / 2)));
    }
  }, [currentPage, totalPages , windowStart]);

  const handlePrevious = () => {
    if (meta.hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (meta.hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = windowStart; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className={`${
                currentPage === i
                  ? 'bg-violet-600 text-white'
                  : 'bg-white dark:bg-violet-950 text-violet-600 dark:text-violet-400'
              } hover:bg-violet-100 dark:hover:bg-violet-900`}
            >
              {i}
            </PaginationLink>
          </motion.div>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <PaginationPrevious
                onClick={handlePrevious}
                className={`${
                  !meta.hasPreviousPage
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-violet-100 dark:hover:bg-violet-900'
                }`}
              />
            </motion.div>
          </PaginationItem>

          {windowStart > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(1)}
                  className="bg-white dark:bg-violet-950 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {windowStart > 2 && <PaginationEllipsis />}
            </>
          )}

          {renderPageNumbers()}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(totalPages)}
                  className="bg-white dark:bg-violet-950 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <PaginationNext
                onClick={handleNext}
                className={`${
                  !meta.hasNextPage
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-violet-100 dark:hover:bg-violet-900'
                }`}
              />
            </motion.div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
}