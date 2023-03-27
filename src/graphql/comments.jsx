import { gql } from "@apollo/client";

export const SUBMIT_COMMENT_MUTATION = gql`
    mutation submitComment($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body) {
            id
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`