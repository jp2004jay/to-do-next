import LinkButton from '@/componant/LinkButton'
import TaskPane from '@/componant/TaskPane'
import { getUserByID } from '@/utils/Users'
import React from 'react'

const GetUserByID = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params
    const userData = await getUserByID(parseInt(id))
    
    return (
        <>
            <div className='flex justify-between mx-4 mt-4'>
                <LinkButton
                    href='/user/get'
                    text='Back'/>
            </div>
            <div className='flex w-3/4 justify-between mx-auto mt-6'>
                <div>
                    <span className='font-bold mr-2'>Username:</span>
                    {userData?.UserName}
                </div>
                <div>
                    <span className='font-bold mr-2'>Email:</span>
                    {userData?.UserEmail}
                </div>
                <div>
                    <span className='font-bold mr-2'>Contact:</span>
                    {userData?.UserContact}
                </div>
            </div>
            <div className='flex w-3/4 mx-auto mt-12'>
                <TaskPane
                    tasks={userData?.todos || []}
                    text='Pending Tasks'
                    isCompleted={false} />
                <TaskPane
                    tasks={userData?.todos || []}
                    text='Completed Tasks'
                    isCompleted={true} />
            </div>
        </>
    )
}

export default GetUserByID