/**
 * Description: Drawer for page layout
 * Author: Hieu Chu
 */

import { Drawer } from 'antd'
import styled from 'styled-components'

const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    overflow: hidden !important;
  }
`
export default function drawer  ({ drawerVisible, closeDrawer, children }) {
  return(<StyledDrawer
    placement="left"
    closable={false}
    onClose={closeDrawer}
    visible={drawerVisible}
    bodyStyle={{
      margin: 0,
      padding: 0
    }}
  >
    {children}
  </StyledDrawer>)
}
