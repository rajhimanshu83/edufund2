import { Layout, Dropdown, Menu } from 'antd'
const { Header } = Layout
import React, { useContext } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import styled from 'styled-components'
import { Logo } from './LogoTitle'
import Link from 'next/link'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import AppContext from "../../context/AppContext";
import { logout } from "../../lib/auth";

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`

const StyledImageBlock = styled(TriggerBlock)`
  @media (min-width: 576px) {
    display: none !important;
  }

  padding-left: 24px;
  ${'' /* cursor: pointer; */}
`

const MobileLogo = styled(Logo)`
  vertical-align: -10px;
`

const HeaderBlock = styled(TriggerBlock)`
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`

const MyMenu = () => {
  return (
    <Menu
      onClick={item => {
        if (item.key == 'logout') {
          logout();
          // nookies.destroy({}, 'auth0.is.authenticated')
          // nookies.destroy({}, 'accessToken')
        } else if (item.key == 'profile') {
          // Router.push('/users/id/[id]', `/users/id/${user.sub}`)
        }
      }}
    >
      <Menu.Divider style={{ marginTop: -5, marginBottom: 0 }} />
      <Menu.Item key="logout">
        {/* <Icon type="logout" /> */}
        Logout
      </Menu.Item>
    </Menu>
  )
}

export default function header ({ collapsed, handleToggle }) {
  const { user } = useContext(AppContext);
  // const { isAuthenticated } = useAuth0()
  const router = useRouter()
  return (
    <Header
      style={{
        background: '#fff',
        padding: 0,
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        display: 'flex'
      }}
    >
      <Link href="/">
        <a>
          <StyledImageBlock>
            <MobileLogo src="/static/transparent-logo.png" alt="logo" />
          </StyledImageBlock>
        </a>
      </Link>

      <TriggerBlock>
        {collapsed ? <MenuUnfoldOutlined className="trigger" onClick={handleToggle}
          style={{
            fontSize: 20,
            verticalAlign: 'middle',
            padding:"0 24px"
          }}/> : <MenuFoldOutlined className="trigger" onClick={handleToggle}
          style={{
            fontSize: 20,
            verticalAlign: 'middle',
            padding:"0 24px"
          }} />}
      </TriggerBlock>

      {user && (
        <div
          style={{
            marginLeft: 'auto'
          }}
        >
          <Dropdown overlay={<MyMenu />} placement="bottomRight">
            <HeaderBlock>
              {/* <Icon
                type="user"
                style={{ fontSize: 16, marginRight: 8 }}
                title="User"
              /> */}
              <span>{user.username}</span>
            </HeaderBlock>
          </Dropdown>
        </div>
      )}
      {!user && (
        <div
          style={{
            marginLeft: 'auto'
          }}
        >
            <HeaderBlock>
              {/* <Icon
                type="user"
                style={{ fontSize: 16, marginRight: 8 }}
                title="User"
              /> */}
              {router.pathname !=="/login" && <Link href="/login"><span>Login</span></Link>}
              {router.pathname !=="/register" && <Link href="/register"><span style={{marginLeft:"10px"}}>Register</span></Link>}
            </HeaderBlock>
        </div>
      )}
    </Header>
  )
}
