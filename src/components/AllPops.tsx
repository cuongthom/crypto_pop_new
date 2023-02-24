import { useState, useEffect } from "react";
import { Col, Row, Tabs, Skeleton } from "antd";
import type { TabsProps } from "antd";
import useAllAuction from "../hooks/useAllAuction";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useConnection } from "../states/connection";
import useWeb3 from "../hooks/useWeb3";
import { AddressMini } from "../utils";
import useMarketPlace from "../hooks/useMarketPlace";
import Header from "./header/HeaderPage";
function AllPops() {
  const { isActive } = useWeb3();
  const { onSetIdPops } = useConnection();
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState<any[]>([]);
  const [listDetailData, setListDetailData] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const showSearchParams = searchParams.get(`search`);
  const { listItem } = useAllAuction();
  const { listDetail } = useMarketPlace();
  const navigate = useNavigate();
  const buyNftToAuction = async (id: any) => {
    if (!isActive) {
      navigate("/");
    }
    console.log(id);
    onSetIdPops(id);
    navigate(`/BuyNftAuction/${id}`);
  };
  const buyNftToMarket = async (id: any) => {
    if (!isActive) {
      navigate("/");
    }
    console.log(id);
    onSetIdPops(id);
    navigate(`/BuyNftMarket/${id}`);
  };
  const fetchData = async () => {
    if (!isActive) {
      navigate("/");
    }
    try {
      setLoading(true);
      const res = await listItem();
      const data = await listDetail();
      setListDetailData(data.listDataItem);
      setListData(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isActive) {
      navigate("/");
    }

    fetchData().then();
  }, [isActive]);

  const onChange = (key: string) => {
    console.log(key);
  };
  const listItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <button className="px-36 py-2 mx-16 border-2 border-slate-900  ">
          On Auction
        </button>
      ),
      children: (
        <Row gutter={{ xs: 4, lg: 8, xl: 16, xxl: 20 }} className="py-10">
          {loading ? (
            <Skeleton />
          ) : (
            listData
              .filter((dataList) =>
                showSearchParams
                  ? showSearchParams ===
                    dataList?.idAuc[0]?.found?.fields?.types?.stringValue
                  : dataList !== undefined
              )
              .map((item: any) => (
                <Col
                  className="gutter-row "
                  span={4}
                  key={item?.itemId}
                  onClick={() => buyNftToAuction(item?.itemId)}
                >
                  <img
                    className="bg-pink-600 text-center w-full"
                    src={item?.idAuc[0]?.found?.fields?.image?.stringValue}
                    placeholder="pop"
                  />

                  <div className="" >
                    <div  className="flex justify-between ...">
                      <div className=" text-xl font-bold">Pop</div>
                      <p className="font-bold text-rose-700">#{item?.itemId}</p>
                    </div>
                    <div  className="flex justify-between ...">
                      <div>Owner</div>
                      <div className="text-black">
                        {AddressMini(item?.address)}
                      </div>
                    </div>
                    <div  className="flex">
                      <img className="w-4 h-5" src="../../img/ETH2.png" />
                      <p className="text-black px-4 font-bold text-xl">
                        {item?.price} BNB
                      </p>
                    </div>
                  </div>
                </Col>
              ))
          )}
        </Row>
      ),
    },
    {
      key: "2",
      label: (
        <button className="mx-14 px-36 py-2 border-2 border-slate-900 text-center">
          On Marketplace
        </button>
      ),
      children: (
        <Row gutter={[16, 24]} className="py-10">
          {loading ? (
            <Skeleton />
          ) : (
            listDetailData
              .filter((dataList) =>
                showSearchParams
                  ? showSearchParams === dataList[5]?.[0]?.found?.fields?.types?.stringValue
                  : dataList
              )
              .map((item) => (
                <Col
                  className="gutter-row"
                  span={4}
                  key={item[4]}
                  onClick={() => buyNftToMarket(item[4])}
                >
                  <div>
                    <img
                      className="bg-image text-center w-full"
                      src={item[5][0]?.found?.fields?.image?.stringValue}
                    />
                    <div className="py-4">
                      <div className="flex justify-between ...">
                        <div className="font-bold text-xl ">Pop</div>
                        <div className="text-rose-700 text-xl">#{item[4]}</div>
                      </div>
                      <div className="flex justify-between ...">
                        <div>Owner</div>
                        {/* <div>ox...132</div> */}
                      </div>
                      <div className="flex">
                        <img className="w-4" src="../../img/ETH2.png" />
                        <p className="text-black font-bold px-4 text-xl">
                          {item[3]} BNB
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
          )}
        </Row>
      ),
    },
  ];

  return (
    <>
      <Header />
      <section className="px-14">
        <div className="flex justify-between py-8">
          <div className="text-2xl font-medium">Cryptopops | All Pops</div>
          <div className="flex border-2 border-black">
            <img
              className="w-12 px-2"
              src="../../img/free-search-icon-3076-thumb.png"
            />
            <input
              type="text"
              onChange={(e: any) => setSearchParams({ search: e.target.value })}
              src="BsSearch"
              className=" w-80 h-8 rounded-md focus:outline-none"
              placeholder="Search Pops"
            />
          </div>
        </div>
        <div className="text-3xl font-bold py-6">
          <h2>All Pops</h2>
        </div>
        <Tabs defaultActiveKey="1" items={listItems} onChange={onChange} />
      </section>
    </>
  );
}

export default AllPops;
