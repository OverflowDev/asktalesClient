import {useContext, useState} from 'react'

import AuthContext from '../context/AuthContext'

import {FETCH_USER_QUERY, CHANGE_USER_PASSWORD_MUTATION} from '../graphql/users'
import { useQuery, useMutation } from '@apollo/client'

import { toast } from 'react-hot-toast'

function Profile() {

  const [err, setErr] = useState({})

  const {user} = useContext(AuthContext)

  const usrId = user?.id
  const {data, loading: usrLoading} = useQuery(FETCH_USER_QUERY,{
      variables: {
          userId: usrId
      }
  })
  const usr = data?.getUser

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  })

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [changePassword, {error, loading}] = useMutation(CHANGE_USER_PASSWORD_MUTATION, {
    onCompleted(){
      toast.success("Password changed")
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await changePassword({
          variables: {
            id: usrId,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
          }
      })
    } catch (error) {
        // toast.error(error)
        console.log(error)
    }
  }

  return (
    <div>
      {usrLoading ? (
        <div>
          Loading...
        </div>
      ) : (
        <div className="flex flex-wrap gap-12 justify-center items-center py-14">
          <div className="relative flex flex-col items-center rounded-[20px] md:w-[400px] w-80 bg-white shadow-lg">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
              <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" /> 
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <img className="h-full w-full rounded-full" src='https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png' alt="" />
              </div>
            </div> 
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white uppercase">
                {usr?.name}
              </h4>
              <p className="text-base font-normal text-gray-600">{usr?.email}</p>
              <p className="text-base font-normal text-gray-600">{usr?.username  }</p>
              <p className="text-base font-normal text-gray-400">{usr?.isAdmin ? 'Admin' : ''}</p>
            </div> 
            <div className="mt-6 mb-3 flex gap-8 items-center md:!gap-14">
              {/* Role  */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700 dark:text-white">Role</p>
                <p className="text-sm font-normal text-gray-600 capitalize">{usr?.role}</p>
              </div>
              {/* Status  */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700 dark:text-white">
                  Status
                </p>
                <p className="text-sm font-normal text-gray-600">
                  {usr?.isActive ? 'Active' : 'Not Active'}
                </p>
              </div>
            </div>
          </div>  

          {/* Change password  */}
          <div className=' mt-2'>
            <div className="max-w-lg mx-auto my-8 bg-white p-8 rounded-xl shadow shadow-slate-300">
              <h1 className="text-4xl font-medium">Reset password</h1>
              <form onSubmit={handleSubmit} className="my-10">
                <div className="flex flex-col space-y-5">
                  <label htmlFor="currentPassword">
                    <p className="font-medium text-slate-700 pb-2">Current Password</p>
                    <input 
                      name="currentPassword" 
                      value={formData.currentPassword}
                      onChange={onChange}
                      type="text" 
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
                      placeholder="Enter current Password" 
                    />
                  </label>

                  <label htmlFor="newPassword">
                    <p className="font-medium text-slate-700 pb-2">New Password</p>
                    <input 
                      name="newPassword" 
                      value={formData.newPassword}
                      onChange={onChange}
                      type="text" 
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
                      placeholder="Enter newPassword" 
                    />
                  </label>
               
                  <button 
                    type='submit'
                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                      <span>Reset password</span>
                  </button>
                </div>
              </form>

              {err && (
                <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded mt-2">
                  {error?.graphQLErrors[0].message}
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Profile