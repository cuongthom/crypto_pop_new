import { ethers } from "ethers";
import { BaseContract } from "./BaseContract";
import { VITE_APP_AUCTION_HOUSE_ADDRESS_MAINNET } from "../constants";
import AuctionABI from "../contractPorts/abis/Auction.json"

class AuctionContract extends BaseContract {
    constructor(provider: ethers.providers.Web3Provider, account = "") {
      super(provider, VITE_APP_AUCTION_HOUSE_ADDRESS_MAINNET, AuctionABI, account);
    }
    async auction(index : any): Promise<any> {
      return await this.getContract().auction(index);
    }
    async getAuction(): Promise<any> {
      return await this.getContract().getAllAuction();
    }
    async getAuctionService(): Promise<any> {
      return await this.getContract().AUCTION_SERVICE_FEE_RATE();
    }
    async getMinimum(): Promise<any> {
      return await this.getContract().MINIMUM_BID_RATE();
    }
    async getMarketPlaceItems(): Promise<any> {
      return await this.getContract().marketPlaceItems();
    }
    // async getApprove(id: number) {
    //   return await this.getContract().getApproved(id);
    // }
  }
  export default AuctionContract;
  