import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
    currentPage: number;
    totalItems: number;  // Adicionada a propriedade `totalItems`
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {currentPage > 1 ? (
                        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
                    ) : (
                        <span className="pagination-link-disabled">Anterior</span>
                    )}
                </PaginationItem>
                {[...Array(totalPages).keys()].map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            onClick={() => onPageChange(index + 1)}
                            isActive={currentPage === index + 1}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    {currentPage < totalPages ? (
                        <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
                    ) : (
                        <span className="pagination-link-disabled">Próximo</span>
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
