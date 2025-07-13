import Link from "next/link";
import { users } from "@/app/generated/prisma";
import PaginationTab from "@/componant/PaginationTab";
import LinkButton from "@/componant/LinkButton";
import DeleteUserButton from "@/componant/user/DeleteUser";
import { deleteUser, getTotalUsers, getUsersWithPagination } from "@/utils/Users";

export default async function UserGet({ params }: { params: Promise<{ page: string }> }) {

  const { page } = await params;
  const totalUsers = await getTotalUsers()

  const take = parseInt(process.env.PAGINATION_TAKE!);
  const visiblePageTabs = parseInt(process.env.PAGINATION_VSIBLE_TABS!);
  const totalPages = Math.ceil(totalUsers / take);

  let usersData: users[] = [];
  let pagination = 1;

  try {
    if (page !== undefined) {
      pagination = parseInt(page[0]);
    }
    usersData = await getUsersWithPagination(pagination, take)
  }
  catch (e) {
    console.log("Error occurred when trying to fetch users: ", e);
    return <h3>Internal Server Error! Please try again later.</h3>;
  }

  return (
    <>
      <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-2xl mx-auto mt-6 relative">
        <div className="flex gap-4 justify-end absolute">
          <LinkButton
            href='/todos'
            text='Assign Task'
          />
          <LinkButton
            href='/user/add-edit-user'
            text='Add User'
          />
        </div>
        <div className="text-center text-2xl border mb-6 rounded border-gray-200 w-fit mx-auto px-4 py-1">
          Users
        </div>
        <div className="overflow-hidden rounded-xl">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="border border-b-2 border-t-0 border-x-0">
              {usersData.length !== 0 ? (
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              ) : (
                <tr>
                  <th>There are no users.</th>
                </tr>
              )}
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.UserID} className="bg-gray-50 hover:bg-gray-100 transition">
                  <td className="px-6 py-4 font-medium text-center">{user.UserID}</td>
                  <td className="px-6 py-4 font-semibold text-center">{user.UserName}</td>
                  <td className="px-6 py-4 text-center">{user.UserEmail}</td>
                  <td className="px-6 py-4 text-center">{user.UserContact}</td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <Link
                      href={`/user/${user.UserID}`}
                      className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 hover:cursor-pointer transition-colors"
                    >
                      View
                    </Link>

                    <Link
                      href={`/user/add-edit-user/${user.UserID}`}
                      className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full hover:bg-green-200 hover:cursor-pointer transition-colors"
                    >
                      Edit
                    </Link>

                    <DeleteUserButton
                      id={user.UserID}
                      handler={deleteUser} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationTab
        pagination={pagination}
        visiblePageTabs={visiblePageTabs}
        totalPages={totalPages} />
    </>
  );
}
