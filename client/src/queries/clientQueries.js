import { gql, useQuery } from '@apollo/client';

const GET_CLIENTS = gql`
  {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };
