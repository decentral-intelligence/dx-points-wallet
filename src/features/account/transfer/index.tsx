import { BalanceCard } from "../../../app/@components/BalanceCard";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import { Page } from "../../../app/@components/layout/Page";
import { TransferForm } from "./TransferForm";
import { useCurrentAccount } from "../../../app/hooks/useCurrentAccount";

export const TransferView = () => {
  const theme = useTheme();
  const account = useCurrentAccount();
  if (!account) return null;
  return (
    <Page>
      <BalanceCard account={account} />
      <Box margin={theme.spacing(1)} />
      <TransferForm account={account} />
    </Page>
  );
};
