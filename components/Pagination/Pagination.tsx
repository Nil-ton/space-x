import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
  totalDocs: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalDocs,
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePageCount = 3; // Número de páginas visíveis antes e depois do número atual

    if (totalPages <= visiblePageCount) {
      // Se houver menos páginas visíveis do que o total, mostre todas as páginas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      // Caso contrário, mostre as páginas com o efeito "1,2,3...10,11"
      if (page <= Math.ceil(visiblePageCount / 2)) {
        // Página inicial
        for (let i = 1; i <= visiblePageCount; i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(<span key="ellipsis-end">...</span>);
        pageNumbers.push(renderPageButton(totalPages));
      } else if (page >= totalPages - Math.floor(visiblePageCount / 2)) {
        // Página final
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(<span key="ellipsis-start">...</span>);
        for (let i = totalPages - visiblePageCount + 1; i <= totalPages; i++) {
          pageNumbers.push(renderPageButton(i));
        }
      } else {
        // Página intermediária
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(<span key="ellipsis-start">...</span>);
        for (let i = page - Math.floor(visiblePageCount / 2); i <= page + Math.floor(visiblePageCount / 2); i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(<span key="ellipsis-end">...</span>);
        pageNumbers.push(renderPageButton(totalPages));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber: number) => (
    <li key={pageNumber}>
      <button
        className={`h-10 px-5 ${
          pageNumber === page
            ? 'text-white bg-zinc-600'
            : 'text-white bg-zinc'
        } transition-colors duration-150 border border-zinc-600 focus:shadow-outline ${
          pageNumber === page ? '' : 'hover:bg-zinc-600'
        }`}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    </li>
  );

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex">
        <li>
          <button
            className="h-10 px-5 text-zinc-600 transition-colors duration-150 bg-zinc border border-r-0 border-zinc-600 rounded-l-lg focus:shadow-outline hover:bg-zinc-100"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeftIcon />
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            className="h-10 px-5 text-zinc-600 transition-colors duration-150 bg-zinc border  border-zinc-600 rounded-r-lg focus:shadow-outline hover:bg-zinc-100"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRightIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
}
