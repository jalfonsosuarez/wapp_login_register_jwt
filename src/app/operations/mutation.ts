import gql from 'graphql-tag';

export const registerdata = gql`
    mutation userRegisterr($user: UserInput!) {
        add( user: $user ){
            status
            message
            user {
                id
                name
                lastName
                email
                registerDate
            }
        }
    }
`;
