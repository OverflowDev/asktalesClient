import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation register(
        $name: String!
        $email: String!
        $username: String!
        $role: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                name: $name
                email: $email
                username: $username
                role: $role
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            name
            email
            username
            role
            createdAt
            token
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            name
            email
            username
            role
            createdAt
            token
        }
    }
`

export const FETCH_USER_QUERY = gql`
    query UserQuery($userId: ID!) {
        getUser(userId: $userId) {
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

export const CHANGE_USER_PASSWORD_MUTATION = gql`
    mutation ChangePassword($id: ID!, $currentPassword: String!, $newPassword: String!) {
        changePassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword) {
            id
        }
    }
`

export const FETCH_USERS_QUERY = gql`
    query UsersQuery {
        getUsers {
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

export const DEACTIVATE_USER = gql`
    mutation DeactivateUser($id: ID!) {
        deactivateUser(id: $id) {
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