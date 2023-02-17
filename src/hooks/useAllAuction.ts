import { useConnection } from "../states/connection";
import { ethers } from "ethers";
import AuctionContract from "../contractPorts/AuctionContract";
const useAllAuction = () => {
  const { connection } = useConnection();
  console.log("connection",connection);
  
  const provider = connection?.provider;
  
  const fetchDataAuction = (id: any) => {
    return fetch(`https://firestore.googleapis.com/v1/projects/loopbackfirestore/databases/(default)/documents:batchGet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            documents: id
        })
    }).then(res => res.text())
}

  const listItem = async () => {
    if (!provider) {
      throw new Error("Meta mask not installed or not connected");
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const auctionContract = new AuctionContract(provider, address);
    const getAuction = await auctionContract.getAuction();

    const listPromise = Array.from(Array(getAuction.length).keys()).map(
      async (index) => {
        const item = await auctionContract.auction(index);
        if (item.active === true) {
          try {
            const itemId = item[1].toNumber();
            // console.log(item);
            const address = item.auctioneer;
            const prices = item[2];
            const price = parseFloat(ethers.utils.formatEther(prices));
            const idAuc =JSON.parse (await fetchDataAuction(`projects/loopbackfirestore/databases/(default)/documents/cryptopop-main/${itemId}`))
            
            return {
              itemId,
              address,
              price,
              idAuc
            };
          } catch (err) {
            console.log(err);
            return null;
          }
        }
      }
    );
    const items = await Promise.all(listPromise);
    // console.log("items",items);
    return items
   
  };

  return {
    listItem, fetchDataAuction
  };
};

export default useAllAuction;
