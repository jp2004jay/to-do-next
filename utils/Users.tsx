import { PrismaClient } from "@/app/generated/prisma"
import { notFound, redirect } from "next/navigation"

const prisma = new PrismaClient()

const saveOrEditUser = async (formData: FormData) => {
    "use server"

    const userID = formData.get('UserID') || "0";

    const userName = String(formData.get('UserName') || "").trim();
    const userEmail = String(formData.get('UserEmail') || "").trim();
    const userContact = String(formData.get('UserContact') || "").trim();

    if (!userName || !userEmail || !userContact) {
        if (userID === "0") {
            redirect(`/user/add-edit-user?error=All fields are required&userID=${userID}`);
        }
        else {
            redirect(`/user/add-edit-user/${userID}?error=All fields are required&userID=${userID}`);
        }

    }

    if (userID === "0") {
        const saveData = await prisma.users.create({
            data: {
                UserName: userName,
                UserEmail: userEmail,
                UserContact: userContact,
            },
        });
        console.log("User Added, ID:", saveData.UserID);
    } else {
        const updateData = await prisma.users.update({
            where: { UserID: parseInt(userID.toString()) },
            data: {
                UserName: userName,
                UserEmail: userEmail,
                UserContact: userContact,
            },
        });
        console.log("User Updated, ID:", updateData.UserID);
    }
    redirect('/user/get')
}


const deleteUser = async (id: number) => {
    "use server"
    try {

        const todos = await prisma.todos.findMany({
            where: {
                AND: [
                    { UserID: id },
                    { TodoStatus: false }
                ]
            }
        })

        if (todos.length > 0) {
            return "pending"
        }

        const deleteUser = await prisma.users.delete({
            where: { UserID: id }
        })

        await prisma.todos.deleteMany({
            where: { UserID: id }
        })
        console.log("User Deleted, ID:- ", deleteUser.UserID)
        return "success"
    }
    catch (e) {
        console.log("Internal Server Error while Deleting USER: ", id);
        return "error"
    }
}

const getUserByID = async (id: number) => {
    const userData = await prisma.users.findUnique({
        where: {
            UserID: id
        },
        include: {
            todos: true
        }
    })
    return userData
}

const getAllUsers = async () => {
    return await prisma.users.findMany({ include: { todos: true } })
}

const getTotalUsers = async () => {
    return await prisma.users.count();
}

const getUsersWithPagination = async (pagination: number, take: number) => {
    const usersData = await prisma.users.findMany({
        skip: (pagination - 1) * take,
        take: take
    });
    return usersData
}

export { saveOrEditUser, deleteUser, getUserByID, getAllUsers, getTotalUsers, getUsersWithPagination }
