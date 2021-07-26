import { gql } from "@apollo/client";

export const createAccountMutation = gql`
  mutation createAccount($args: AccountInput!) {
    createAccount(args: $args) {
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
