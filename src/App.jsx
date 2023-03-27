import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, createHttpLink   } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'

import AuthRoute from './util/AuthRoute';

import { AuthProvider } from './context/AuthContext';

import { Toaster } from 'react-hot-toast';

// components 
import Home from './pages/Home';
import Contact from './pages/Contact';
import Stories from './components/Stories'
import Navbar from './layouts/Navbar';

import Login from './auth/Login'
import Register from './auth/Register'
import About from './pages/About';
import SingleStory from './components/SingleStory';
import NotFound from './pages/NotFound';
import Dashboard from './components/Dashboard';
import Profile from './pages/Profile';

function App() {

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_SERVER_API_URI,
    // uri: "http://localhost:5000/askTales",
  })
  
  const uploadLink = createUploadLink({
    uri: import.meta.env.VITE_SERVER_API_URI,
    // uri: "http://localhost:5000/askTales",
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwtToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  })

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  })

  const link = ApolloLink.from([
    authLink.concat(uploadLink),
    httpLink,
  ])

  const client = new ApolloClient({
    cache,
    link
  })

  return (
    <AuthProvider>
      <ApolloProvider client={client}>

        {/* Toast Alert  */}
        <Toaster toastOptions={{ 
          duration: 4000
        }} />

        <Router>
        <div>
          <Navbar />
        </div>

        <div className='pb-16'>
          <Routes>
              {/* Routes  */}
              <Route path='/' exact element={<Home />} />
              <Route path='/story' exact element={<Stories />} />
              <Route path='/story/:postId' exact element={<SingleStory />} />

              <Route path='/about' exact element={<About />} />
              <Route path='/contact' exact element={<Contact />} />
              <Route path='/dashboard' exact element={<Dashboard />} />
              <Route path='/profile' exact element={<Profile />} />
              <Route path='/*' exact element={<NotFound />} />

              {/* Auth */}
              <Route 
                    path='/login' 
                    exact 
                    element={
                      <AuthRoute>
                          <Login />
                      </AuthRoute>
                    } 
                  />
                  <Route 
                    path='/register' 
                    exact 
                    element={
                      <AuthRoute>
                          <Register />
                      </AuthRoute>
                    } 
                  />

          </Routes>
        </div>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
