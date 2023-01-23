import { StrictMode } from 'react';
import { Routes, Route, Router, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';
import UserContextProvider from './contexts/UserContextProvider';
import Nav from './components/Nav';
import SignIn from './pages/SignIn';
import { Content } from 'antd/es/layout/layout';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    // <StrictMode>
      <UserContextProvider>
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }}>
            <div style={{ margin: '16px 0' }}>
              <Nav/>
            </div>
            <div className="site-layout-content">
              <Routes>
                <Route index element={<About />} />
                <Route path="signIn" element={<SignIn />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </UserContextProvider>
      
    // </StrictMode>
  );
};

export default App;