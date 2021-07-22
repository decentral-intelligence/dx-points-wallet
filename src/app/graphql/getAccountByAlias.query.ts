import { gql } from "@apollo/client";

export const getAccountByAliasQuery = gql`
  query getAccountByAlias($alias: String!) {
    accountByAlias(alias: $alias) {
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
