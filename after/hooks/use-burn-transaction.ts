import { useState, useEffect } from "react";
import { useWallet, useAppSupplies, useEthersSigner } from "...";
import { Contract, parseEther } from "ethers";
import { oftAbi } from "...";

const useBurnTransactions = () => {
  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);
  const [burnTxHash, setBurnTxHash] = useState<string | null>(null);
  const [txProgress, setTxProgress] = useState<boolean>(false);
  const { walletChain, isWalletConnected, openConnectModal } = useWallet();
  const { fetchSupplies } = useAppSupplies(true);
  const ethersSigner = useEthersSigner({
    chainId: walletChain?.id ?? chainEnum.mainnet,
  });

  // Function to fetch burn transactions
  const fetchBurnTransactions = async () => {
    try {
      const isTestnet = isChainTestnet(walletChain?.id);
      // Fetch transactions logic...
    } catch (err) {
      console.error(err);
    }
  };

  // Function to execute a burn transaction
  const executeBurn = async (amount: string) => {
    if (!isWalletConnected) {
      openConnectModal();
      return;
    }
    if (amount === "") {
      // Handle empty amount case
      return;
    }
    setTxProgress(true);
    try {
      const newTokenAddress = fetchAddressForChain(walletChain?.id, "newToken");
      const oftTokenContract = new Contract(
        newTokenAddress,
        oftAbi,
        ethersSigner
      );
      let parsedAmount = parseEther(amount);
      const burnTx = await oftTokenContract.burn(parsedAmount);
      setBurnTxHash(burnTx.hash);
      await burnTx.wait();
      fetchBurnTransactions();
      fetchSupplies();
    } catch (err) {
      console.error(err);
    } finally {
      setTxProgress(false);
    }
  };

  useEffect(() => {
    if (walletChain) {
      fetchBurnTransactions();
    }
  }, [walletChain]);

  return {
    burnTransactions,
    burnTxHash,
    txProgress,
    executeBurn,
    fetchBurnTransactions,
  };
};

export default useBurnTransactions;
