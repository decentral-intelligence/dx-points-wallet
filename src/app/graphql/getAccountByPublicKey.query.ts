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
        }
        recipient {
          _id
        }
        amount
        message
        timestamp
        tags
      }
    }
  }
`;
