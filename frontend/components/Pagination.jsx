const Pagination = ({ page, totalPages, onPageChange }) => {

    // Generate page numbers to show [1, 2, 3, 4, 5]
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className='flex items-center gap-2'>

            {/* Prev button */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded-lg border text-sm font-medium
                    ${page === 1
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:bg-gray-100 cursor-pointer'
                    }`}
            >
                ← Prev
            </button>

            {/* Page numbers */}
            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium
                        ${p === page
                            ? 'bg-green-700 text-white'       // active page
                            : 'hover:bg-gray-100 text-gray-600'  // inactive
                        }`}
                >
                    {p}
                </button>
            ))}

            {/* Next button */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-lg border text-sm font-medium
                    ${page === totalPages
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:bg-gray-100 cursor-pointer'
                    }`}
            >
                Next →
            </button>

        </div>
    )
}

export default Pagination