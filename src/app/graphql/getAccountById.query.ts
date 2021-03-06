import { gql } from "@apollo/client";

export const getAccountByIdQuery = gql`
  query getAccountById($id: ID!) {
    account(id: $id) {
      _id
      alias
      balance
      publicKey
      transactions {
        sender {
          _id
          alias
        }
        recipient {
          _id
          alias
        }
        amount
        message
        timestamp
        tags
      }
    }
  }
`;
