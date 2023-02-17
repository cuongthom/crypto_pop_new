import { BigNumber, ethers } from "ethers";
import { BaseContract } from "./BaseContract";
import { VITE_APP_ARTWORK_ADDRESS_MAINNET} from "../constants";
import ArtWorkAddress from "../contractPorts/abis/ArtWorkAddress.json"

class BuyBoxContract extends BaseContract {
    constructor(provider: ethers.providers.Web3Provider, account = "") {
      super(provider, VITE_APP_ARTWORK_ADDRESS_MAINNET,ArtWorkAddress , account);
    }
    async getBlindBoxPrice(): Promise<any> {
      return await this.getContract().blindBoxPrice();
    }
    async getBlindBoxLimit(): Promise<any> {
      return await this.getContract().blindBoxBuyLimit();
    }
    async buyBox(price :BigNumber, quantity : number ): Promise<any> {
      return await this.getContract().buyBlindBox(quantity,{value :price });
    }
    
  }
  export default BuyBoxContract;
  