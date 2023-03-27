import {useState} from 'react'

import {useQuery, useMutation} from '@apollo/client'

import {FETCH_POSTS_QUERY} from '../../graphql/posts'

import PostPagination from './PostPagination'
import Post from './Post'
import DeleteButton from '../DeleteButton'

function Posts() {

    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const handleOnClose = () => setShowDeleteButton(false)

    const {data, error, loading} = useQuery(FETCH_POSTS_QUERY)

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(5)

    const lastUserIndex = currentPage * usersPerPage
    const firstUserIndex = lastUserIndex - usersPerPage

    const posts = data?.getPosts.slice(firstUserIndex, lastUserIndex)


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
                                            Story
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Author
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {posts?.map((post, i) => (
                                        <Post key={post.id} i={i} post={post} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <PostPagination 
                    totalUsers={posts?.length} 
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

export default Posts