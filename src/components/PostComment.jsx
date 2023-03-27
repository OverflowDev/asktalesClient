import {useState, useRef} from 'react'

import { useMutation } from '@apollo/client'

import { toast } from 'react-hot-toast'

import {SUBMIT_COMMENT_MUTATION } from '../graphql/comments'
import { useParams } from 'react-router-dom'

function PostComment() {

    const param = useParams()
    const postId = param.postId
    
    const [comment, setComment] = useState('')
    const commentInputRef = useRef(null)

    
    const handleChange = (event) => {
      setComment(event.target.value)
    }

    const [handleCommentSubmit] = useMutation(SUBMIT_COMMENT_MUTATION, {
      variables: {
        postId,
        body: comment
      }, 
      update() {
        setComment('')
        commentInputRef.current.blur()
      }, 
      onCompleted(){
        toast.success("Comment successful!")
      }
    })

    const handleComment = (e) => {
      e.preventDefault()
      handleCommentSubmit()
    }

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg mb-4 mt-8 max-w-lg">
        <form onSubmit={handleComment} className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div className="flex flex-wrap -mx-3 mb-6">
                <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea 
                        ref={commentInputRef}
                        name="comment" 
                        value={comment}
                        onChange={handleChange}
                        placeholder="Type Comment here..." 
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" required
                    ></textarea>
                </div>
                <div className="w-full flex items-start md:w-full px-3">
                    <div className="-mr-1">
                        <button 
                        type='submit' 
                        disabled={comment.trim() === ''}
                        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" 
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default PostComment