import gql from 'graphql-tag';

export const getUsers = gql`
  query {
    users {
      id
      name
      lastName
      email
      registerDate
    }
  }
`;

export const login = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      token
    }
  }
`;

export const meData = gql`
  query {
    me {
      status
      message
      ... on ResultUser {
        user {
          id
          name
          lastName
          email
        }
      }
    }
  }
`;

