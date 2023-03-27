import {useContext, useState} from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { toast } from 'react-hot-toast'

import AuthContext from '../context/AuthContext'

import {LOGIN_USER} from '../graphql/users'


function Login() {

  const [err, setErr] = useState({})

  const navigate = useNavigate()
  const location = useLocation()

  const {login} = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'email' ? value.toLowerCase() : value
    });
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value
    // })
  }

  const [loginUSer, { error,loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.login.token;
      login(token)
      // Redirect after login 
      navigate(location)

      toast.success("Login successful!")
    },
    onError(error) {
      if (error && error.graphQLErrors && error.graphQLErrors.length > 0) {
        toast.error("Login Error!")

        const message = error.graphQLErrors[0].extensions.errors;
        console.error('GraphQL Error:', message);
        setErrors({ form: message });
      } else {
        console.error('Error:', error.message);
        setErrors({ form: error.message });
      }
    },
  })


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        await loginUSer({
            variables: formData
        })
      setErr(null)
    } catch (error) {
        toast.error(error)
        setErr(error)
    }
  }

  return (
  <div className='flex md:px-24 px-6 mt-4 font-quicksand'>
       
    <div className="md:mt-0 mt-20 w-full">
      <div className="container py-8">
          
        <div className="md:w-96 mx-auto bg-blue-100 rounded shadow">

          <div className="md:mx-16 py-4 px-8 text-black text-xl text-center font-bold border-b border-grey-500">Login</div>

          <form onSubmit={handleSubmit}>
            <div className="py-4 px-8">
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2">Email:</label>
                <input 
                  className=" border rounded w-full py-2 px-3 text-gray-800" 
                  type="text"
                  name="email" 
                  value={formData.email}
                  // error={errors.username ? true : false}
                  onChange={onChange}
                  placeholder="Email" 
                />
              </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">Password:</label>
                    <input 
                      className=" border rounded w-full py-2 px-3 text-gray-800" 
                      type="password"
                      name="password" 
                      value={formData.password}
                      // error={errors.password ? true : false}
                      onChange={onChange}
                      placeholder="password" 
                    />
                </div>
                {/* Button  */}
                <div className="mb-1 flex justify-center">
                    <button type='submit' className="mb-2 mx-16 rounded-md py-2 px-24 bg-blue-400 hover:bg-blue-500">
                      {loading ? 'Loading...' : 'Login'}
                    </button>
                </div>
              </div>
          </form>
          {/* sign up  */}
          <div className='flex space-x-3 justify-center py-2'>
            No account? <span className='text-purple-700'>
              <Link to='/register'>Register</Link>
            </span>
          </div>

          {/* Errors */}
          <div>
              {Object.keys(errors).length > 0 && (
                  <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded mt-2">
                      <ul className="list-disc ml-5">
                          {Object.entries(errors).map(([key, value]) => (
                              <li key={key}>
                              {typeof value === "object" ? (
                                <ul className="list-disc ml-5">
                                  {Object.values(value).map((subValue) => (
                                    <li key={subValue}>{subValue}</li>
                                  ))}
                                </ul>
                              ) : (
                                value
                              )}
                            </li>
                          ))}
                      </ul>
                  </div>
              )}
          </div>

        </div>

      </div>
    </div>
    
  </div>
  )
}

export default Login