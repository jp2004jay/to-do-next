'use client'
import { redirect } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'

const DeleteUserButton = ({ id, handler }: { id: number, handler: Function }) => {

    const deleteUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const status = await handler(id);

                if (status === 'pending') {
                    Swal.fire({
                        title: "Can't Delete!",
                        text: "User has pending tasks. Complete them first.",
                        icon: "info"
                    });
                    redirect('/user/'+id)
                } else if (status === 'success') {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User and tasks deleted successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    redirect('/user/get')
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Try again later.",
                        icon: "error"
                    });
                }
            }
        });
    }

    return (
        <button onClick={deleteUser} className="inline-block px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full hover:bg-red-200 hover:cursor-pointer transition-colors">
            Delete
        </button>
    )
}

export default DeleteUserButton