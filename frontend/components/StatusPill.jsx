import React from "react";

const statusStyles = {
    active:   "bg-light-green/16 text-primary-green border-primary-green dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    inactive: "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900",
    draft:    "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900",
};

const StatusPill = ({ status }) => {
    return (
        <div
            className={`
                inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize
                transition-colors duration-200
                ${statusStyles[status] ?? statusStyles.draft}
            `}
        >
            {status}
        </div>
    );
};

export default StatusPill;