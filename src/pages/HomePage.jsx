import { Flex, Layout, notification, theme } from 'antd';
import React, { useEffect } from 'react'
import { requests } from './agent';

const { Content } = Layout;
function HomePage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const getData = async()=>{
  try {
    const res= await requests.get('user');
  } catch (error) {
     notification.error({message:'Something is wrong'})
  }

}

useEffect(()=>{
  getData()
})

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