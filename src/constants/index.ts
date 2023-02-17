import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

export const SMARTCHAIN_MAINNET_CHAIN_ID = "0x38";
export const SMARTCHAIN_MAINNET_CHAIN_ID_DECIMAL = 56;
export const SMARTCHAIN_MAINNET_URL =
  "https://bsc-dataseed.binance.org/";


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: import.meta.env.VITE_INFURA_ID, // required
      rpc: {
        [SMARTCHAIN_MAINNET_CHAIN_ID_DECIMAL]: SMARTCHAIN_MAINNET_URL,
      },
      chainId: SMARTCHAIN_MAINNET_CHAIN_ID_DECIMAL,
    },
    display: {
      name: "WalletConnect",
    },
  },
  injected: {
    package: null,
    name: "Injected",
  },
};
export const web3Modal = new Web3Modal({
  providerOptions, // required
  cacheProvider: true,
  disableInjectedProvider: false,
  theme: "dark",
});
// export const GREETING_SMART_CONTRACT_ADDRESS =
//   "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8";
// export const MARKET_CONTRACT_ADDRESS =
//   "0xB0dc670F53E220d6a6CC0f84A02c46Bac10B3134";
// export const BLUE_NFT_ADDRESS = "0xC1C4a066e91b7eeCfFab7160522924D9C4d254FC";
export const VITE_APP_ARTWORK_ADDRESS_MAINNET = "0xE8568408C33f9A407Fe403754c48c257FA250b1A"
export const VITE_APP_MARKETPLACE_ADDRESS_MAINNET = "0x6390E5eD93369fA06cdCeefB07406E834913d9B4"
export const VITE_APP_AUCTION_HOUSE_ADDRESS_MAINNET = "0x0F52Ee92560cb94bcE34adc4fd1c9d44744f2771"
