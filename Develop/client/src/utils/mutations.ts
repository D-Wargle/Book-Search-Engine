import { gql } from '@apollo/client';

//make login mutation
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username
        }
    }
    }
    `;

    //create an account mutation
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        username
        email
        }
    }
    }
    `;

    //save book mutation
    export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
    _id
    username
    email
    savedBooks {
    bookId
    authors
    description
    title
    image
    link
    }
    }
    }
    `;

    //create a delete book mutation
    export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
    bookId
    authors
    description
    title
    image
    link
    }
    }
    }
    `;