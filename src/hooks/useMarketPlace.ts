import { useConnection } from "../states/connection";
import MarketPlaceContract from "../contractPorts/MarketPlaceContract";
import { ethers } from "ethers";

function useMarketPlace() {
  const { connection } = useConnection();
  const provider = connection?.provider;

  const dataImageMarket = (arr: any) => {
    return fetch(`https://firestore.googleapis.com/v1/projects/loopbackfirestore/databases/(default)/documents:batchGet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            documents: arr
        })
    }).then(res => res.text())
}

  const listDetail = async () => {
    if (!provider) {
      throw new Error("Meta mask not installed or not connected");
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const marketPlaceContract = new MarketPlaceContract(provider, address);
    
    let listDataItem = []
    for(let i = 0 ; i < 50 ; i++) {
        const getListDetail = await marketPlaceContract.getListDetail(i)
        if(getListDetail[0] !== "0x0000000000000000000000000000000000000000") {
      // console.log(getListDetail[0]);
          const address = getListDetail[1]
          const itemId = getListDetail[2].toNumber()
          const addressNew = parseFloat(ethers.utils.formatEther(address));
          const idImage = JSON.parse (await dataImageMarket(`projects/loopbackfirestore/databases/(default)/documents/cryptopop-main/${itemId}`))
          listDataItem.push([...getListDetail,addressNew, itemId,idImage])
        }
    }
    // console.log("cuong",cuong);
    return {listDataItem}
  };

  return { listDetail };
}

export default useMarketPlace;
