import { gql } from "@apollo/client";

export const transferPointsMutation = gql`
  mutation transferPoints($input: TransferInput!) {
    transferPoints(args: $input) {
      timestamp
    }
  }
`;
