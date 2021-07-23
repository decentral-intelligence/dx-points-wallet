import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { getAccountByIdQuery } from "../graphql/getAccountById.query";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { accountSelector } from "../selectors/accountSelector";
import { accountSlice } from "../../features/account/state";
import { AccountData } from "../types/accountData";

export const AppInitializer = () => {
  const [getAccount, { data, stopPolling, error }] = useLazyQuery(
    getAccountByIdQuery,
    {
      pollInterval: 10 * 1000,
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true, // without that useEffect won't be triggered
    }
  );
  const currentAccount = useAppSelector(accountSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentAccount) return;
    getAccount({ variables: { id: currentAccount._id } });
    return () => {
      stopPolling && stopPolling();
    };
  }, []);

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
