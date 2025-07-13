'use client'
import React from 'react'
import Swal from 'sweetalert2';

const DeleteTask = ({ taskID, userID, handler }: { taskID: number, userID: number, handler: Function }) => {

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handler(taskID, userID)
                Swal.fire({
                    title: "Deleted!",
                    text: "Task deleted successfully.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }

    return (
        <div className="relative group">
            <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer">
                {/* Trash Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                </svg>
            </button>
            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                Delete Task
            </span>
        </div>
    )
}

export default DeleteTask