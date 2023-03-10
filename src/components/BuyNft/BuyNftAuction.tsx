import React, { useEffect, useState } from "react";
import useAllAuction from "../../hooks/useAllAuction";
import useWeb3 from "../../hooks/useWeb3";
import { Link, useParams, useSearchParams  } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { BsPersonCircle } from "react-icons/bs";
import { AddressMini } from "../../utils";
import { useConnection } from "../../states/connection";
import type { MenuProps } from "antd";
import { Skeleton } from "antd";

function BuyNftAuction() {
  const { isActive, activate, deActivate } = useWeb3();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState<any[]>([]);
  const { fetchDataAuction, listItem } = useAllAuction();
  const [listDataAuction, setListDataAuction] = useState<any[]>([]);
  let {idParams} = useParams();
  const items: MenuProps["items"] = [
    {
      label: <a>My Nfts</a>,
      key: "0",
    },
    {
      label: <a>My Shop</a>,
      key: "1",
    },

    {
      label: <a onClick={deActivate}>Log Out</a>,
      key: "2",
    },
  ];
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await listItem();
      const data = await JSON.parse(
        await fetchDataAuction(
          `projects/loopbackfirestore/databases/(default)/documents/cryptopop-main/${idParams}`
        )
      );
      
      setListDataAuction(res);
      setListData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isActive) return;
    fetchData().then();
  }, [isActive]);

  return (
    <>
      <header className="bg-black">
        <div className="row mx-12 flex justify-between">
          <div className="col flex py-2">
            <div className="flex pt-1.5 pr-6">
              <Link to="/">
                <img
                  className="w-12 h-8 px-2 w-60 h-10"
                  src="../../img/Monnrfys.png"
                  alt="ETH"
                />
              </Link>
            </div>
            <div className="flex px-4 pt-0.5">
              <Link to="/AllPops" className="px-2 py-2 text-xl text-white">
                All Pops
              </Link>
              <Link to="/BuyBox" className="px-2 py-2 text-xl text-white">
                BuyBox
              </Link>
              <Link to="/Attributes" className="px-2 py-2 text-xl text-white">
                Attributes
              </Link>
              <Link to="/FAQ" className="px-2 py-2 text-xl text-white">
                FAQ
              </Link>
            </div>
          </div>
          <div className="col py-2 flex ">
            <button
              onClick={activate}
              className="text-white text-xl whitespace-nowrap py-2 px-8"
            >
              {isActive ? (
                AddressMini(connection.address)
              ) : (
                <h2>connect wallet</h2>
              )}
            </button>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <button className="text-white text-xl w-full ">
                    <BsPersonCircle className="text-4xl " />
                  </button>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </header>
      {loading ? (
        <Skeleton />
      ) : (
        listData?.map((item) => (
          <section
            className="px-14 "
            key={idParams}
          >
            <div>
              <p className="text-black text-xl py-8 font-bold">
                CryptoPops | {idParams}
              </p>
            </div>
            <div className="flex">
              <div className="w-2/4">
                <img
                  className="w-3/4 bg-pink-700"
                  src={item?.found?.fields?.image?.stringValue}
                  placeholder="image"
                />
              </div>
              <div className="px-8">
                <div className="flex">
                  <p className="text-black py-4 text-3xl font-bold">Pop </p>
                  <p className="text-pink-600  py-4 text-3xl font-bold px-4">
                    #{idParams}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-black px-4">Owned by</p>
                  <p className="text-pink-600">
                    {" "}
                    {AddressMini(item?.found?.fields?.mintHash?.stringValue)}
                  </p>
                </div>
                {loading ? (
                  <Skeleton />
                ) : (
                  listDataAuction
                    .filter((data) => data?.itemId === idParams)
                    .map((index) => (
                      <div className="flex">
                        <img
                          className="w-6 py-4"
                          src="../../../img/ETH2.png"
                        />
                        <p className="text-black py-4 text-2xl px-2 font-bold">
                          {index?.price} BNB
                        </p>
                      </div>
                    ))
                )}
                <p className="text-black">Expiration Date</p>
                <p className="text-black py-4">0day 0hours 0mins 0secs</p>
                <div className="w-full bg-pink-700 text-center rounded-md">
                  <button className="py-2">BID NOW</button>
                </div>
              </div>
            </div>
          </section>
        ))
      )}
    </>
  );
}

export default BuyNftAuction;
