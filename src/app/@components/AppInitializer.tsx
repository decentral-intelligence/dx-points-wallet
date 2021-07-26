import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { getAccountByIdQuery } from "../graphql/getAccountById.query";
import { useAppDispatch } from "../../hooks";
import { accountSlice } from "../../features/account/state";
import { AccountData } from "../types/accountData";
import { useCurrentAccount } from "../hooks/useCurrentAccount";

export const AppInitializer = () => {
  const [getAccount, { data, stopPolling, error }] = useLazyQuery(
    getAccountByIdQuery,
    {
      pollInterval: 10 * 1000,
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true, // without that useEffect won't be triggered
    }
  );
  const currentAccount = useCurrentAccount();
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentAccount && getAccount({ variables: { id: currentAccount._id } });
    return () => {
      stopPolling && stopPolling();
    };
  }, [currentAccount]);

  useEffect(() => {
    if (!(currentAccount && data?.account)) return;
    const { balance, transactions } = data.account as AccountData;
    // if balance don't change, no change at all!
    if (balance !== currentAccount.balance) {
      dispatch(
        accountSlice.actions.setAccount({
          ...currentAccount,
          transactions,
          balance,
        })
      );
    }
  }, [currentAccount, data, dispatch]);

  useEffect(() => {
    if (error?.message.indexOf("Failed to fetch") !== -1) {
      console.log("Peer not reachable");
    }
  }, [error]);

  return null;
};
