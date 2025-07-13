import { todos } from '@/app/generated/prisma'
import React from 'react'
import CompleteTask from '@/componant/task-pane/CompleteTask'
import InCompleteTask from '@/componant/task-pane/InCompleteTask'
import DeleteTask from '@/componant/task-pane/DeleteTask'
import { deleteToDo, updateStatusToCompleted, updateStatusToIncompleted } from '@/utils/ToDos'

type TaskPanePropsType = {
    tasks: todos[],
    isCompleted: boolean,
    text: string
}

const TaskPane = ({ tasks, isCompleted, text }: TaskPanePropsType) => {
    const filteredTaskList = tasks.filter((todo: todos) => todo.TodoStatus === isCompleted) || []
    return (
        <div className='w-1/2 border px-4 ml-2 relative pb-4'>
            <div className='absolute top-[-1rem] bg-gray-800 text-white rounded-full px-4 py-1'>
                {text}
            </div>
            {filteredTaskList.length !== 0 ?
                <table className="min-w-full text-sm text-gray-700 mt-8">
                    <thead className="border border-b-2 border-t-0 border-x-0">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTaskList.map((todo: todos) => (
                            <tr key={todo.TodoID}>
                                <td className='px-6 py-4 font-bold'>{todo.TodoTitle}</td>
                                <td className='px-6 py-4'>{todo.TodoDescription}</td>
                                {isCompleted === false ?
                                    <td className='relative'>
                                        <CompleteTask
                                            userID={todo.UserID}
                                            taskID={todo.TodoID}
                                            handler={updateStatusToCompleted}
                                        />
                                    </td>
                                    :
                                    <td className="space-x-2">
                                        <div className='flex gap-2'>
                                            <InCompleteTask
                                                userID={todo.UserID}
                                                taskID={todo.TodoID}
                                                handler={updateStatusToIncompleted}
                                            />
                                            <DeleteTask
                                                userID={todo.UserID}
                                                taskID={todo.TodoID}
                                                handler={deleteToDo}
                                            />
                                        </div>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table> : <div className='mt-8'>No {text}</div>
            }
        </div >
    )
}

export default TaskPane