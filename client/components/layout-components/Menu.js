/**
 * Description: Drawer's menu list
 * Author: Hieu Chu
 */

import { Menu} from 'antd'
import { useRouter } from 'next/router'
import AppContext from "../../context/AppContext";
import { DashboardOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useContext,useState,useEffect } from "react";
// import e from 'express';
// import { TickerSymbols } from "../Searchbar/assets/TickerSymbols";
import { fetchAllTickersInfo } from "../../lib";

const keys = ['/', '/sculptures', '/makers', '/users', '/recent-activity']
const stockCompanies = [
  {companyname:"Agilent Technologies, Inc",symbol:"A"},
  {companyname:"ATA Creativity Global",symbol:"AACG"},
  {companyname:"American Airlines Group, Inc",symbol:"AAL"},
  {companyname:"Altisource Asset Management Corp",symbol:"AAMC"},
  {companyname:"Acer Therapeutics Inc",symbol:"ACER"},

]
const menu = stockCompanies.map(company => <Menu.Item key={company.companyname}>
    <a>
    <DashboardOutlined />
      <span>{company.companyname}</span>
    </a>
</Menu.Item>);
  

export default function mennu ({ style, closeDrawer }) {
  const { isAuthenticated } = useContext(AppContext);
  const {setSymbol } = useContext(AppContext);
  const [allTickers,setallTickers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      setallTickers(await fetchAllTickersInfo());
    };
    fetch();
  }, []);
  
  return (
    <Menu
      theme="dark"
      mode="inline"
      // selectedKeys={selectedKeys}
      style={{ ...style, padding: '16px 0' }}
      onClick={({ key }) => {
        closeDrawer()
        setSymbol(key)
      }}
    >
  {isAuthenticated && allTickers.map(company => <Menu.Item key={company.symbol}  >
    <div>
    {/* <DashboardOutlined /> */}
    <span>{company.symbol}</span>
      {/* <span>{company.companyname}</span> */}
    </div>
</Menu.Item>)}
    </Menu>
  )
}
