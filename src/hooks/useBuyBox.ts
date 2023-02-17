

import { useConnection } from "../states/connection";
import BuyBoxContract from "../contractPorts/BuyBoxContract";
import { BigNumber, ethers } from "ethers";


function useBuyBox() {
  const { connection } = useConnection();
  const provider = connection?.provider;

  const priceBox = async () => {
    if (!provider) {
      throw new Error("Meta mask not installed or not connected");
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const boxContract = new BuyBoxContract(provider, address);
    const getPriceBox = await boxContract.getBlindBoxPrice();
    console.log("getPriceBox",getPriceBox);
    const mintPrice = parseFloat(ethers.utils.formatEther(getPriceBox));
    return {mintPrice, getPriceBox};
  };
  const buyBox = async (price: BigNumber, quantity: number) => {
    if (!provider) {
      throw new Error("Meta mask not installed or not connected");
    }
    
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const boxContract = new BuyBoxContract(provider, address);
    console.log(price,quantity);
    const getBuyBoxContract = await boxContract.buyBox(price ,quantity);
    const txnReceipt = await getBuyBoxContract.wait();
  };
  return {
    priceBox,
    buyBox,
  };
}

export default useBuyBox;
