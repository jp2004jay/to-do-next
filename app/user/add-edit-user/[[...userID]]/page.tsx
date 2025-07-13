import React from 'react'
import { getUserByID, saveOrEditUser } from '@/utils/Users'
import LinkButton from '@/componant/LinkButton'

type PageProps = {
    params: {userID: string}, 
    searchParams?: {error?:string}
}

const AddEditUser = async ({params, searchParams} : PageProps) => {
    const { userID } = await params
    const data = userID !== undefined ? await getUserByID(parseInt(userID)) : null
    const search = await searchParams

    return (
        <>
            <LinkButton
                href='/user/get'
                text='Back'
                extraStyle='ml-4 mt-4' />
            <form action={saveOrEditUser} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-black">User Information</h2>
                {search?.error && (
                    <p className="text-red-600 mb-4">{search.error}</p>
                )}
                {userID && (
                    <input hidden name='UserID' defaultValue={userID}/>
                )}
                <label htmlFor="UserName" className="block text-sm font-medium text-black mb-1">User Name</label>
                <input
                    type="text"
                    name="UserName"
                    defaultValue={data?.UserName || ""}
                    className="w-full border border-black px-3 py-2 rounded-md mb-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label htmlFor="UserEmail" className="block text-sm font-medium text-black mb-1">User Email</label>
                <input
                    type="text"
                    name="UserEmail"
                    defaultValue={data?.UserEmail || ""}
                    className="w-full border border-black px-3 py-2 rounded-md mb-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label htmlFor="UserContact" className="block text-sm font-medium text-black mb-1">User Contact</label>
                <input
                    type="text"
                    name="UserContact"
                    defaultValue={data?.UserContact || ""}
                    className="w-full border border-black px-3 py-2 rounded-md mb-6 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-opacity-90 transition"
                >
                    {userID? "Edit" : "Save"}
                </button>
            </form>
        </>
    )
}

export default AddEditUser