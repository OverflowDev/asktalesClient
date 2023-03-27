import {useState} from 'react'

import EditUser from './EditUser'

import { toast } from 'react-hot-toast'

import {useQuery, useMutation} from '@apollo/client'

import {FETCH_USERS_QUERY, DEACTIVATE_USER} from '../../graphql/users'


function User({user, i}) {

    const {id, name, username, email, isAdmin, isActive, role} = user

    const [showEditButton, setShowEditButton] = useState(false)
    const handleOnEditClose = () => setShowEditButton(false)

    // mutation 
    const [deactivateUser] = useMutation(DEACTIVATE_USER, {
        onCompleted(){
            toast.success('user deactivated')
        }
    })

    const hanndleDeactivate = (id) => {
        try {
            deactivateUser({
                variables: {
                    id: id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
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
                    <h2 className="text-sm font-medium text-gray-800 dark:text-white capitalize">{name}</h2>
                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{email}</p>
                </div>
            </div>
        </td>

        {/* Status  */}
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            {isActive ? (
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
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap capitalize">{role}</td>
        
        {/* admin  */}
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {isAdmin ? (
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
                <button 
                    onClick={() => hanndleDeactivate(id)}
                    className="text-gray-700 bg-red-700/20 py-2 px-2 rounded-md transition-colors duration-200 hover:text-black focus:outline-none"
                >
                    Deactivate
                </button>

                <button 
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowEditButton(true)
                    }}
                    className="text-blue-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                >
                    <ion-icon name="pencil"></ion-icon>
                </button>
                <EditUser 
                    onClose={handleOnEditClose} 
                    visible={showEditButton} 
                    userId={id} 
                />

                {/* <button className="text-red-500 transition-colors duration-200 hover:text-red-800 focus:outline-none">
                    <ion-icon name="trash"></ion-icon>
                </button> */}
            </div>
        </td>
    </tr>
  )
}

export default User