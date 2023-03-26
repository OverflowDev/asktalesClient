import { gql } from "@apollo/client";


export const UPDATE_USER = gql`
    mutation UpdateUSer(
        $id: ID!
        $name: String!
        $username: String!
        $email: String!
        $password: String
        $role: String!
        $isActive: Boolean!
        $isAdmin: Boolean!
    ) {
        updateUser(
            updateUserInput: {
                id: $id
                name: $name
                username: $username
                email: $email
                password: $password
                role: $role
                isActive: $isActive
                isAdmin: $isActive
            }
        ) {
            id
            name
            email
            username
            role
            isActive
            isAdmin
            createdAt
        }
    }
`

export const FETCH_USER_QUERY = gql`
    query UserQuery($id: ID!) {
        getUser(id: $id) {
            id
            name
            email
            username
            role
            isActive
            isAdmin
            createdAt
        }
    }
`

