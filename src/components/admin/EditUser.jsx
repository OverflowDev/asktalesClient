import {useState, useEffect} from 'react'
import { useApolloClient, useMutation } from '@apollo/client'

import { toast } from 'react-hot-toast'

import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import {UPDATE_USER_MUTATION , FETCH_USER_QUERY, FETCH_USERS_QUERY } from '../../graphql/users'

function EditUser({userId, onClose, visible}) {

  const loc = useLocation()
  const navigate = useNavigate()
  const client = useApolloClient()

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const { data } = useQuery(FETCH_USER_QUERY, { variables: { userId } })

    const dataUser= data?.getUser  || {}

    useEffect(() => {
        setName(dataUser.name);
        setUsername(dataUser.username);
        setEmail(dataUser.email);
        // setPassword(dataUser.password);
        setRole(dataUser.role);
        setIsAdmin(dataUser.isAdmin);
        setIsActive(dataUser.isActive);
    }, [dataUser])

    const [updateUser, {error,loading}] = useMutation(UPDATE_USER_MUTATION, {
        refetchQueries: [{ query: FETCH_USERS_QUERY }],
        onCompleted: (data) => {
          onClose()
          const deletedUserId = data.deleteUser;
          const updatedData = (cache) => {
            const data = cache.readQuery({ query: FETCH_USERS_QUERY });
            return { users: data.getUsers.filter((post) => post.id !== deletedUserId) };
          };
          client.writeQuery({ query: FETCH_USERS_QUERY, data: updatedData })
  
          toast.success("User Editted successfully!")
  
        },

      onError: (error) => {
        console.log(error);
      },

    })

    const onSubmit = async(e) => {
        e.preventDefault();
      try {
        // const { title, content,location, imageUrl1, imageUrl2 } = formData
        await updateUser({
            variables: { 
                updateUserInput: {
                    id: userId,
                    name,
                    username,
                    email,
                    role,
                    password,
                    isAdmin,
                    isActive,
                }
            }
        });
    } catch (err) {
      console.error(err);
    }
    };

  
    const handleOnClose = (e) => {
        if(e.target.id === 'container') onClose()
    }

    if(!visible) return null

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    onClick={handleOnClose}
    id='container'
  >
    <div className="bg-white rounded-md md:mx-auto w-full mx-3 md:max-w-[550px]">
      {/* Close button  */}
      <button
        onClick={onClose}
        className="flex-shrink-0 flex items-center justify-start h-12 w-12 px-2 rounded-full sm:mx-0 sm:h-10 sm:w-10"
      >
        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <form 
        onSubmit={onSubmit}
        className="py-2 px-9"
      >
        {/* name  */}
        <div className="mb-2">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Name
          </label>
          <input
            required
            name='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        {/* username  */}
        <div className="mb-2">
          <label
            htmlFor="username"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Username
          </label>
          <input
            required
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        {/* email  */}
        <div className="mb-2">
          <label
            htmlFor="email"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Email
          </label>
          <input
            required
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        {/* password  */}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Password
          </label>
          <input
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            placeholder="Password"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        {/* role  */}
        <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2">Role:</label>
            <select 
            name='role'
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className=" border rounded w-full py-2 px-3 text-gray-800" 
            >
            <option>Select a role</option>
            <option value="storyteller">Storyteller</option>
            <option value="storyseeker">Storyseeker</option>
            </select>
        </div>

        <div className="mb-4 flex items-center space-x-8">
            <div>
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAdmin"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                />
                <label className="form-check-label" htmlFor="isAdmin">
                Is Admin
                </label>
            </div>
            <div>
                <input
                type="checkbox"
                className="form-check-input"
                id="isActive"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                />
                <label className="form-check-label" htmlFor="isActive">
                Is Active
                </label>
            </div>
        </div>

        {/* Button  */}
        <div>
          <button
            type='submit'
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            {loading ? "Updating...": 'Update User'}
          </button>
          <br />
        </div>

      </form>

    </div>
</div>
  )
}

export default EditUser