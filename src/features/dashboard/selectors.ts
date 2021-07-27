import { createSelector } from "@reduxjs/toolkit";
import { currentAccountSelector } from "../../app/selectors/accountSelector";
import { AccountData } from "../../app/types/accountData";

export const inOutPointsSelector = createSelector(
  [currentAccountSelector],
  (account: AccountData | null): { in: number; out: number } => {
    if (!account) return { in: 0, out: 0 };
    return account.transactions.reduce(
      (acc, tx) => {
        const inOut = tx.sender._id === account._id ? "out" : "in";
        acc[inOut] += tx.amount;
        return acc;
      },
      { in: 0, out: 0 }
    );
  }
);
