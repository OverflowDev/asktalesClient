import {useState, useEffect} from 'react'
import { useApolloClient, useMutation } from '@apollo/client'

import { toast } from 'react-hot-toast'

import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import {UPDATE_POST_MUTATION, FETCH_POST_QUERY, FETCH_POSTS_QUERY } from '../../graphql/posts'

function EditUser({postId, onClose, visible}) {

  const loc = useLocation()
  const navigate = useNavigate()
  const client = useApolloClient()

  const [err, setErr] = useState({})

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('')
  const [imageUrl1, setImageUrl1] = useState('')
  const [imageUrl2, setImageUrl2] = useState('')

  const { data } = useQuery(FETCH_POST_QUERY, { variables: { postId } })

    const dataPost= data?.getPost  || {}

    // const [formData, setFormData] = useState({
    //     title: dataPost.title || '',
    //     content: dataPost.content || '',
    //     location: dataPost.location || '',
    //     imageUrl1: dataPost.imageUrl1 || '',
    //     imageUrl2: dataPost.imageUrl2 || '',
    // })

    useEffect(() => {
        setTitle(dataPost.title);
        setContent(dataPost.content);
        setLocation(dataPost.location);
        setImageUrl1(dataPost.imageUrl1);
        setImageUrl2(dataPost.imageUrl2);
    }, [dataPost])

  const onChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      // [e.target.name]: e.target.value
      [name]: value
    })

  }

    const [updatePost, {error,loading}] = useMutation(UPDATE_POST_MUTATION, {
        refetchQueries: [{ query: FETCH_POSTS_QUERY }],
        onCompleted: (data) => {
          onClose()
          const deletedPostId = data.deletePost;
          const updatedData = (cache) => {
            const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
            return { posts: data.getPosts.filter((post) => post.id !== deletedPostId) };
          };
          client.writeQuery({ query: FETCH_POSTS_QUERY, data: updatedData })
  
          // redirect 
          if(location.pathname === `/story/${deletedPostId}`){
            navigate('/')
          }
          toast.success("Post Editted successfully!")
  
        },

      onError: (error) => {
        console.log(error);
      },

    })

    const onSubmit = async(e) => {
        e.preventDefault();
      try {
        // const { title, content,location, imageUrl1, imageUrl2 } = formData
        await updatePost({
            variables: { 
                updatePostInput: {
                    id: postId,
                    title,
                    content,
                    location,
                    imageUrl1,
                    imageUrl2,
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
        {/* title  */}
        <div className="mb-2">
          <label
            htmlFor="title"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Title
          </label>
          <input
            required
            name='title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Title"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>


        {/* Content  */}
        <div className="mb-2">
          <label
            htmlFor="content"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Content
          </label>
          <textarea
            type='text'
            value={content}
            name='content'
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            placeholder="Your Story"
            className="w-full rounded py-3 px-[14px] text-gray-800 text-base border border-gray-700 resize-none outline-none focus-visible:shadow-none focus:border-primary"
          ></textarea>
        </div>

        {/* title  */}
        <div className="mb-2">
          <label
            htmlFor="location"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Location
          </label>
          <input
            required
            name='location'
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            type="text"
            placeholder="Location"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>


        {/* Image1  */}
        <div className="mb-4 ">
          {/* <input type="file" name="image" onChange={handleImageChange} /> */}
          <label
            htmlFor="image2"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Image Link 1
          </label>
          <input 
            type="text" 
            name='image1' 
            value={imageUrl1} 
            onChange={(e) => setImageUrl1(e.target.value)} 
            placeholder="https://Image-link"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        {/* Image2  */}
        <div className="mb-6 ">
          {/* <input type="file" name="image" onChange={handleImageChange} /> */}
          <label
            htmlFor="image2"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Image Link 2
          </label>
          <input 
            type="text" 
            name='image2' 
            value={imageUrl2} 
            onChange={(e) => setImageUrl2(e.target.value)}  
            placeholder="https://Image-link"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <div className='text-red-500'>Note: Make sure you paste right link</div>
        </div>

        {/* Button  */}
        <div>
          <button
            type='submit'
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          >
            {loading ? "Updating...": 'Update Story'}
          </button>
          <br />
        </div>

        {err && (
          <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded mt-2">
            {error?.graphQLErrors[0].message}
          </div>
        )}

      </form>

    </div>
</div>
  )
}

export default EditUser