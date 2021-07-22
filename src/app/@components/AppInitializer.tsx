import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { getAccountById } from "../graphql/getAccountById.query";
import { useAppSelector } from "../../hooks";
import { accountSelector } from "../selectors/accountSelector";

export const AppInitializer = () => {
  const [getAccount, { data }] = useLazyQuery(getAccountById, {
    pollInterval: 10 * 1000,
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true, // without that useEffect won't be triggered
  });
  const currentAccount = useAppSelector(accountSelector);

  useEffect(() => {
    if (!currentAccount) return;
    getAccount({ variables: { id: currentAccount._id } });
  }, [getAccount, currentAccount]);

  useEffect(() => {
    if (!(currentAccount && data)) return;
    // FIXME: do account update here!
    //
    // const settings = persistedAppState.accounts[currentAccount._id].settings;
    // const { balance, alias, transactions } = data.account;
    //
    // setPersistedAppState({
    //   accounts: {
    //     [currentAccount._id]: {
    //       _id: currentAccount._id,
    //       alias,
    //       balance,
    //       settings,
    //       transactions
    //     }
    //   }
    // });
  }, [currentAccount, data]);

  return null;
};
