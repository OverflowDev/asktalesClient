import React from 'react'

function UserPagination({totalUsers, usersPerPage, setCurrentPage, currentPage, loading, lastUserIndex}) {

    let pages = []

    for(let i = 1; i <= Math.ceil(totalUsers/usersPerPage); i++) {
        pages.push(i)
    }

  return (
    <div>
        
        <div className="flex items-center justify-between mt-6">
                <button 
                    onClick={() => currentPage > 1 && setCurrentPage(--currentPage)}
                    className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        previous
                    </span>
                </button>


                <div className="items-center hidden md:flex gap-x-3">
                    {
                        pages.map((page, index) => {
                            return (
                                <button 
                                    key={index} 
                                    className=
                                    {
                                        page === currentPage 
                                        ? "px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                                        : "px-2 py-1 text-sm text-gray-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                                    }
                                    onClick={() => setCurrentPage(page)}
                                >
                                        {page}
                                </button>
                            )
                        })
                    }
                </div>
                
                <div>
                    {totalUsers < lastUserIndex ? '' : 
                    
                        <button 
                            onClick={() => setCurrentPage(++currentPage)}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            <span>
                                Next
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    }
                </div>
            </div>
    </div>
  )
}

export default UserPagination