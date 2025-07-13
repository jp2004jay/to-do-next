import Link from 'next/link';
import React from 'react'

type PaginationTabPropsType = {
    pagination: number,
    visiblePageTabs: number,
    totalPages: number
}

const PaginationTab = ({ pagination, visiblePageTabs, totalPages }: PaginationTabPropsType) => {
    const baseClass = "px-2 border border-gray-300 rounded text-sm";
    const elementArray = [];

    const startPage = Math.max(2, pagination - Math.floor(visiblePageTabs / 2));
    const endPage = Math.min(totalPages - 1, startPage + visiblePageTabs - 1);

    if (pagination > 1) {
        elementArray.push(
            <Link key="prev" className={baseClass} href={`/user/get/${pagination - 1}`}>
                Previous
            </Link>
        );
    }

    elementArray.push(
        <Link
            key="first"
            className={`${baseClass} ${pagination === 1 && "bg-blue-400"}`}
            href="/user/get/1"
        >
            Page 1
        </Link>
    );

    if (startPage > 2) {
        elementArray.push(<span key="dots-left" className="px-1">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
        elementArray.push(
            <Link
                key={i}
                className={`${baseClass} ${pagination === i && "bg-blue-400"}`}
                href={`/user/get/${i}`}
            >
                Page {i}
            </Link>
        );
    }

    if (endPage < totalPages - 1) {
        elementArray.push(<span key="dots-right" className="px-1">...</span>);
    }

    if (totalPages > 1) {
        elementArray.push(
            <Link
                key="last"
                className={`${baseClass} ${pagination === totalPages && "bg-blue-400"}`}
                href={`/user/get/${totalPages}`}
            >
                Page {totalPages}
            </Link>
        );
    }

    if (pagination < totalPages) {
        elementArray.push(
            <Link key="next" className={baseClass} href={`/user/get/${pagination + 1}`}>
                Next
            </Link>
        );
    }
    return (
        <div className="w-full flex justify-center gap-2 mt-4">{elementArray}</div>
    )
}

export default PaginationTab