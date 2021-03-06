import { gql } from "@apollo/client";

export const getAccountByPublicKeyQuery = gql`
  query getAccountByPublicKey($publicKey: String!) {
    accountByPublicKey(publicKey: $publicKey) {
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
