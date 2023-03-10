import {createSlice} from "@reduxjs/toolkit";
import {ethers} from "ethers";


export type ConnectionStateType = {
  address: string,
  provider: ethers.providers.Web3Provider | null,
  web3Instance: any | null,
  idPops: any | null ,
}
const initialState: ConnectionStateType = {
  address: '',
  web3Instance: null,
  provider: null,
  idPops: null,
}


const connectionSlice = createSlice({
  initialState,
  name: "connection",
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setProvider: (state, action) => {
      state.provider = action.payload
    },
    setWeb3Instance: (state, action) => {
      state.web3Instance = action.payload
    },
    clearConnection: (state, action) => {
      return initialState
    },
    setIdPops: (state, actions) => {
      state.idPops = actions.payload
    }
  }
})

const {actions, reducer} = connectionSlice;
export const {setAddress, clearConnection, setProvider, setWeb3Instance, setIdPops} = actions
export default reducer;