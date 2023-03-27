import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
    query PostsQuery {
        getPosts {
            id
            title
            content
            location
            username
            imageUrl1
            imageUrl2
            likeCount
            likes{
                username
            }
            commentCount
            comments {
                id
                username
                body
                createdAt
            }
            createdAt
        }
    }
`

export const FETCH_POST_QUERY = gql`
    query PostQuery($postId: ID!) {
        getPost(postId: $postId) {
            id
            title
            content
            location
            username
            imageUrl1
            imageUrl2
            likeCount
            likes{
                username
            }
            commentCount
            comments {
                id
                username
                body
                createdAt
            }
            createdAt
        }
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation CreatePost($postInput: PostInput!) {
        createPost(postInput: $postInput) {
            id
            title
            content
            location
            username
            imageUrl1
            imageUrl2
            createdAt
        }
    }
`

export const UPDATE_POST_MUTATION = gql`
    mutation UpdatePost($updatePostInput: UpdatePostInput!) {
        updatePost(updatePostInput: $updatePostInput) {
            id
            title
            content
            location
            username
            imageUrl1
            imageUrl2
            createdAt
        }
    }
`


export const DELETE_POST_MUTATION = gql`
    mutation DeletePostMutation($postId: ID!) {
        deletePost(postId: $postId) {
            id
        }
    }
`

export const LIKE_POST_MUTATION = gql`
    mutation likeQuoteMutation($postId: ID!) {
        likeQuote(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`
