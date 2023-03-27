import {useState} from 'react'
import DeleteButton from '../DeleteButton'
import EditButton from '../EditButton'

function Post({post, i}) {

    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const handleOnClose = () => setShowDeleteButton(false)

    const [showEditButton, setShowEditButton] = useState(false)
    const handleOnEditClose = () => setShowEditButton(false)

    const {id, title, location, username} = post

  return (
    <tr key={id}>
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
                    <h2 className="text-sm font-medium text-gray-800 dark:text-white capitalize">{title}</h2>
                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{location}</p>
                </div>
            </div>
        </td>

        {/* author  */}
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap capitalize">{username}</td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex items-center gap-x-6">
                <button 
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowEditButton(true)
                    }}
                    className="text-blue-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                >
                    <ion-icon name="pencil"></ion-icon>
                </button>

                <button 
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowDeleteButton(true)
                    }}
                    className="text-red-500 transition-colors duration-200 hover:text-red-800 focus:outline-none"
                >
                    <ion-icon name="trash"></ion-icon>
                </button>
            </div>
        </td>
        <EditButton onClose={handleOnEditClose} visible={showEditButton} postId={id} />
        <DeleteButton onClose={handleOnClose} visible={showDeleteButton} postId={id} />
    </tr>
  )
}

export default Post