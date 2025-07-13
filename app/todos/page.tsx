import LinkButton from '@/componant/LinkButton'
import { saveOrEditTodos } from '@/utils/ToDos'
import { getAllUsers } from '@/utils/Users'
import React from 'react'

const Todos = async () => {

  const fillSelectUsers = await getAllUsers()

  return (
    <>
      <LinkButton
        href='/user/get'
        text='Back'
        extraStyle='ml-4 mt-4' />
      <form action={saveOrEditTodos} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Todo Task Assign</h2>

        <label htmlFor="TodoTitle" className="block text-sm font-medium text-black mb-1">Task Title</label>
        <input
          type="text"
          name="TodoTitle"
          className="w-full border border-black px-3 py-2 rounded-md mb-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label htmlFor="TodoDescription" className="block text-sm font-medium text-black mb-1">Task Description</label>
        <textarea
          rows={3}
          name="TodoDescription"
          className="w-full border border-black px-3 py-2 rounded-md mb-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
        ></textarea>

        <label htmlFor="UserID" className="block text-sm font-medium text-black mb-1">Which User?</label>
       <select className='w-full border border-black px-3 py-2 rounded-md mb-4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black' name="UserID">
          {fillSelectUsers.map( user => 
          <option key={user.UserID+'fillSelect'} value={user.UserID}> {user.UserName}</option>)}
       </select>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-opacity-90 transition mt-2"
        >
          Assign
        </button>
      </form>
    </>
  )
}

export default Todos