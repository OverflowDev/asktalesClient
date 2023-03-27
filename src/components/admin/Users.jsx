import {useState} from 'react'

import {useQuery, useMutation} from '@apollo/client'

import {FETCH_USERS_QUERY} from '../../graphql/users'

import UserPagination from './UserPagination'

function Users() {

    // Get users 
    const {data, error, loading} = useQuery(FETCH_USERS_QUERY)

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(5)

    const lastUserIndex = currentPage * usersPerPage
    const firstUserIndex = lastUserIndex - usersPerPage

    const users = data?.getUsers.slice(firstUserIndex, lastUserIndex)

    // mutation 
    const [DeactivateUser] = useMutation()

  return (
    <div>
        <section className="container px-4 mx-auto">
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Number</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Customer
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Role
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            priviledge
                                        </th>


                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {users?.map((user, i) => (
                                        <tr key={user.id}>
                                            {/* Number  */}
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span>{i+1}</span>
                                                </div>
                                            </td>
                                            {/* cutomer  */}
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white capitalize">{user.name}</h2>
                                                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status  */}
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {user.isActive ? (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                        <ion-icon name="checkmark"></ion-icon>
                                                        <h2 className="text-sm font-normal">Active</h2>
                                                    </div>
                                                ): (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
                                                        <ion-icon name="close"></ion-icon>
                                                        <h2 className="text-sm font-normal">Not Active</h2>
                                                    </div>
                                                )}
                                            </td>
                                            {/* role  */}
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap capitalize">{user.role}</td>
                                            
                                            {/* admin  */}
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {user.isAdmin ? (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                        <h2 className="text-sm font-normal">Admin</h2>
                                                    </div>
                                                ): (
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
                                                        <h2 className="text-sm font-normal">Not Admin</h2>
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    <button className="text-gray-700 bg-red-700/20 py-2 px-2 rounded-md transition-colors duration-200 hover:text-black focus:outline-none">
                                                        Deactivate
                                                    </button>

                                                    <button className="text-blue-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                        <ion-icon name="pencil"></ion-icon>
                                                    </button>

                                                    <button className="text-red-500 transition-colors duration-200 hover:text-red-800 focus:outline-none">
                                                        <ion-icon name="trash"></ion-icon>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <UserPagination 
                    totalUsers={users?.length} 
                    usersPerPage={usersPerPage} 
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    loading={loading}
                    lastUserIndex={lastUserIndex}
                />
            </div>

        </section>
    </div>
  )
}

export default Users