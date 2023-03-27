import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import {LIKE_POST_MUTATION} from '../graphql/posts'

import { toast } from 'react-hot-toast'

function LikeButton({user, post: {id, likeCount, likes}}) {

  const navigate = useNavigate()

    const [liked, setLiked] = useState(false)

    useEffect(() => {
      if(user && likes.find((like) => like.username === user.username)){
        setLiked(true)
      } else {
        setLiked(false)
      }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id},
        onCompleted(data){
            if (liked) {
              toast.success("Post unliked!")
          } else {
              toast.success("Post liked!")
          }
          setLiked(!liked)
        },
        onError: (error) => {
          // Redirect user to login page if they are not logged in
          if (
            error.message
            ) {
            toast.error('Login or Register first')
            navigate('/login')
          } else {
            console.log(error);
          }
        },
    })

  return (
    <div className='flex itemss-center'>
        <button 
            onClick={likePost}
            className='flex items-center space-x-2 text-gray-600 hover:border-red-400 py-2 px-3 hover:text-lime-500'>
            {user ? (
                liked ? (
                    <div>
                        <ion-icon name="heart"></ion-icon>
                    </div>
                ) :(
                    <div>
                        <ion-icon name="heart-outline"></ion-icon>
                    </div>
                )
            ) : (
                <Link to='/'>
                    <ion-icon name="heart-outline"></ion-icon>
                </Link>
            )}
            <h1 className='text-sm font-semibold'>{likeCount}</h1>
        </button>
    </div>
  )
}

export default LikeButton