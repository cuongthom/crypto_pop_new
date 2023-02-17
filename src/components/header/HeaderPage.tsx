import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import useWeb3 from "../../hooks/useWeb3";
import { Dropdown, MenuProps, Space } from "antd";
import { AddressMini } from "../../utils";
import { useConnection } from "../../states/connection";
function HeaderPage() {
  const { connection } = useConnection();
  const { isActive, activate, deActivate } = useWeb3();
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
  return (
    <header className="bg-black">
      <div className="row mx-12 flex justify-between">
        <div className="col flex py-2">
          <div className="flex pt-1.5 pr-6">
            <Link to="/">
              <img
                className="w-12 h-8 px-2 w-60 h-10"
                src="../../public/img/Monnrfys.png"
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
                {!isActive ? (
                  ""
                ) : (
                  <button className="text-white text-xl w-full ">
                    <BsPersonCircle className="text-4xl " />
                  </button>
                )}
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default HeaderPage;
