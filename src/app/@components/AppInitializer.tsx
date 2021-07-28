import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { getAccountByIdQuery } from "../graphql/getAccountById.query";
import { useAppDispatch } from "../../hooks";
import { accountSlice } from "../../features/account/state";
import { AccountData } from "../types/accountData";
import { useCurrentAccount } from "../hooks/useCurrentAccount";
import { useSnackbar } from "notistack";
import { appSlice } from "../state";

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
  const snackbar = useSnackbar();

  useEffect(() => {
    currentAccount && getAccount({ variables: { id: currentAccount._id } });
    return () => {
      stopPolling && stopPolling();
    };
  }, [currentAccount]);

  useEffect(() => {
    // User not found in backbone, but probably stored on machine
    if (currentAccount && data?.account === null) {
      console.log("resetting user...", currentAccount._id);
      dispatch(accountSlice.actions.reset(currentAccount._id));
    }
  }, [currentAccount, data]);

  useEffect(() => {
    if (!(currentAccount && data?.account)) return;

    const { balance, transactions } = data.account as AccountData;

    // if balance doesn't change, we will do nothing!

    const deltaBalance = balance - currentAccount.balance;
    if (deltaBalance > 0) {
      snackbar.enqueueSnackbar(`Yay! You got ${deltaBalance} points`, {
        variant: "success",
      });
      dispatch(appSlice.actions.showConfetti());
    }

    if (deltaBalance !== 0) {
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
