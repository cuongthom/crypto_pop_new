import { VITE_APP_MARKETPLACE_ADDRESS_MAINNET } from './../constants/index';
import { ethers } from "ethers";
import { BaseContract } from "./BaseContract";
import MarketPlace from "../contractPorts/abis/MarketPlaceAddress.json"

class MarketPlaceContract extends BaseContract {
    constructor(provider: ethers.providers.Web3Provider, account = "") {
      super(provider, VITE_APP_MARKETPLACE_ADDRESS_MAINNET, MarketPlace, account);
    }
    async getListDetail(index : any): Promise<any> {
      return await this.getContract().listDetail(index);
    }
  }
  export default MarketPlaceContract;
  