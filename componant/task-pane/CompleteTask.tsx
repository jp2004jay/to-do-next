'use client'
import React from 'react'

const CompleteTask = ({ taskID, userID, handler }: { taskID: number, userID: number, handler: Function }) => {
    return (
        <button onClick={() => {handler(taskID, userID)}} className="flex items-center gap-2 p-2 bg-gray-900 text-white border rounded-full hover:bg-gray-100 hover:text-gray-900 transition cursor-pointer absolute top-2 left-[0.15rem] z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    )
}

export default CompleteTask