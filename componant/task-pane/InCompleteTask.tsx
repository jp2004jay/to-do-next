'use client'
import React from 'react'

const InCompleteTask = ({ taskID, userID, handler }: { taskID: number, userID: number, handler: Function }) => {
    return (
        <div className="relative group">
            <button onClick={() => {handler(taskID, userID)}} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition cursor-pointer">
                {/* Clock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                Mark as Incomplete
            </span>
        </div>
    )
}

export default InCompleteTask