import React, { useEffect, useState } from "react";
import {  Skeleton } from "antd";
import useWeb3 from "../hooks/useWeb3";
import useBuyBox from "../hooks/useBuyBox";
import { toast } from "react-hot-toast";
import HeaderPage from "./header/HeaderPage";
import { useNavigate } from "react-router-dom";
function BuyBox() {
  const { isActive } = useWeb3();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [price , setPrice] = useState<any[]>([]);
  const { priceBox, buyBox } = useBuyBox();
  console.log("price",price)
  useEffect(() => {
    priceBuyBox();
  }, []);
  const priceBuyBox = async () => {
    if(!isActive){
      navigate("/")
    }
    try {
      setLoading(true);
      const res = await priceBox();
      setPrice(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleFinish = async () => {
    const buyBoxToContract = new Promise(async (resolve, reject) => {
      try {
        await buyBox( price?.getPriceBox, 1);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        resolve(res);
      } catch (err) {
        reject(err);
      } finally {
        
      }
    });
    await toast.promise(buyBoxToContract, {
      loading: "Selling...",
      success: "Successfully sold",
      error: "Failed to sell",
    });
  };

  return (
    <>
     <HeaderPage/>
      <section className="px-14 text-xl ">
        <h2 className="py-5">Cryptopops | Buy box</h2>
        <div className="flex ">
          <div className="w-100 w-1/2">
            <video height="auto" className="m-0 ">
              <source src="../../img/videoPop.90fcae92.mp4" type="video/mp4" />
            </video>
          </div>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="w-1/2 px-14">
              <p className="text-black font-bold text-4xl">CryptoPop</p>
              <p className="text-black py-8 text-xl">
                Remaining Amount: 1949 / 2005
              </p>
              <p className="text-black text-xl">Price</p>
              <div className="flex py-4">
                <img className="w-10" src="../../public/img/ETH2.png" />
                <p className="text-black text-3xl px-2 font-bold">{price?.mintPrice} BNB</p>
              </div>
              <div onClick={handleFinish} className="text-center bg-black rounded-lg">
                <button  type="button" className="text-white py-2 text-2xl">
                  BUY NOW
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BuyBox;
