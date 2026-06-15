import React from "react";


const statusStyles = {
  active: "bg-light-green/16 text-primary-green border-primary-green",
  inactive: "bg-red-50 text-red-600 border-red-200",
  draft: "bg-yellow-50 text-yellow-600 border-yellow-200",
};

const StatusPill = ({ status }) => {
  return (
    <div
      className={`
        inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize
        ${statusStyles[status]}
      `}
    >
      {status}
    </div>
  );
};

export default StatusPill;