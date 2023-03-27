import {useState, useContext} from 'react'

import moment from 'moment/moment';
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthContext';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import LikeButton from './LikeButton';

function Story({post}) {

    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const handleOnClose = () => setShowDeleteButton(false)
    // Edit 
    const [showEditButton, setShowEditButton] = useState(false)
    const handleOnEditClose = () => setShowEditButton(false)

    const {user} = useContext(AuthContext)

    const {
        id,
        username,
        title,
        content,
        location,
        imageUrl1,
        createdAt
    } = post

  return (
    <div className="p-2 md:w-1/3 ">
      <div className='h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden'>
        <img className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src={imageUrl1} alt="blog" />
        <div className="p-6 ">
          <div className='flex items-center justify-between'>
            <h2 className="tracking-widest text-xs title-font font-medium mb-1 text-gray-500 flex items-center uppercase">
              <span><ion-icon name="location-outline"></ion-icon></span>
              {location}
            </h2>
            {/* <div className='flex items-center'>
              <LikeButton user={user} post={post} />
            </div> */}
            <div className="text-xs text-neutral-500">• {moment(createdAt).fromNow(true)}</div>
          </div>
          <h1 className="title-font text-lg font-medium text-gray-800 mb-2 uppercase">{title}</h1>
          <p className="leading-relaxed mb-3" dangerouslySetInnerHTML={{__html: content?.substr(0, 200) + (content?.length > 1 ? ' ...' : '')}}></p>
          {/* Delete button  */}
          <div className='flex justify-between items-center'>
            <Link to={`/story/${id}`} className="bg-blue-300 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg">Read more</Link>
              {user && user.username === username && 
                <div className='flex space-x-3'>
                  {/* Edit  */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowEditButton(true)
                    }}
                    className='flex items-center space-x-2 text-blue-600'
                    >
                      <ion-icon name="pencil-outline"></ion-icon>
                  </button>
                  {/* Delete  */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteButton(true)
                    }}
                    className='flex items-center space-x-2 text-red-600'
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
        {/* delete button  modal*/}
        <EditButton onClose={handleOnEditClose} visible={showEditButton} postId={id} />
        <DeleteButton onClose={handleOnClose} visible={showDeleteButton} postId={id}/>
    </div>
  )
}

export default Story