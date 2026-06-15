const Pagination = ({ page, totalPages, onPageChange }) => {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className='flex items-center gap-2'>

            {/* Prev button */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-all
                    border-[#e2ddd6] dark:border-[#2e2e2e]
                    text-txt-imp-1 dark:text-[#f0ece4]
                    ${page === 1
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:bg-[#f7f5f2] dark:hover:bg-[#2a2a2a] cursor-pointer'
                    }`}
            >
                ← Prev
            </button>

            {/* Page numbers */}
            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all
                        ${p === page
                            ? 'bg-primary-green text-white'
                            : `text-txt-imp-2 dark:text-[#a09a91]
                               hover:bg-[#f7f5f2] dark:hover:bg-[#2a2a2a]`
                        }`}
                >
                    {p}
                </button>
            ))}

            {/* Next button */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-all
                    border-[#e2ddd6] dark:border-[#2e2e2e]
                    text-txt-imp-1 dark:text-[#f0ece4]
                    ${page === totalPages
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:bg-[#f7f5f2] dark:hover:bg-[#2a2a2a] cursor-pointer'
                    }`}
            >
                Next →
            </button>

        </div>
    )
}

export default Pagination