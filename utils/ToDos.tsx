import { PrismaClient } from "@/app/generated/prisma"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

const saveOrEditTodos = async (formData: FormData) => {
    'use server'
    const todoData = await prisma.todos.create({
        data: {
            TodoTitle: String(formData.get("TodoTitle")),
            TodoDescription: String(formData.get("TodoDescription")),
            TodoStatus: false,
            UserID: parseInt(String(formData.get('UserID')))
        }
    })
    console.log("Todo Create: ", todoData.TodoID, "& User ID:- ", todoData.UserID)
    redirect('/user/' + todoData.UserID)
}

const updateStatusToCompleted = async (taskID: number, userID: number) => {
    "use server"
    await prisma.todos.update({
        where: {
            TodoID: taskID
        },
        data: { TodoStatus: true }
    })
    console.log("Todo Update (Completed): ", taskID)
    redirect('/user/' + userID)
}

const updateStatusToIncompleted = async (taskID: number, userID: number) => {
    "use server"
    await prisma.todos.update({
        where: {
            TodoID: taskID
        },
        data: { TodoStatus: false }
    })
    console.log("Todo Update (InCompleted): ", taskID)
    redirect('/user/' + userID)
}

const deleteToDo = async (taskID: number, userID: number) => {
    "use server"
    await prisma.todos.delete({
        where: {
            TodoID: taskID
        }
    })
    console.log("Todo Deleted: ", taskID);
    redirect('/user/' + userID)
}

export { saveOrEditTodos, updateStatusToCompleted, updateStatusToIncompleted, deleteToDo }