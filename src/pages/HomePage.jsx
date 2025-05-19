import { Flex, Layout, theme } from 'antd';
import React from 'react'
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};
const { Content } = Layout;
function HomePage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    // <div>HomePage</div>
    <Layout style={{ padding: '0 24px 24px', marginTop: '20px' }}>

      <Content
        style={{
          padding: 24,
          margin: 0,
          height: '80vh',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Flex justify='center'>
          <h1 style={{fontSize:'30px',fontWeight:'bold'}}>Welcome To Altimate Authentication App</h1>
        </Flex>
      </Content>
    </Layout>

  )
}

export default HomePage