import React from 'react'
import { Link } from 'react-router-dom'
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { BsPersonCircle } from "react-icons/bs";
import useWeb3 from '../hooks/useWeb3';
import { useConnection } from '../states/connection';
import { AddressMini } from '../utils';
import HeaderPage from './header/HeaderPage';
function Attributes() {
  const { isActive, activate, deActivate } = useWeb3();
  const { connection } = useConnection();

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
    <HeaderPage/>
  )
}

export default Attributes