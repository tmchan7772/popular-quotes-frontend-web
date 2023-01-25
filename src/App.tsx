import { StrictMode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';
import UserContextProvider from './contexts/User/UserContextProvider';
import NavBar from './components/NavBar';
import SignIn from './pages/SignIn';
import { Content } from 'antd/es/layout/layout';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ProfileContextProvider from './contexts/Profile/ProfileProvider';

const App = () => {
  return (
    <StrictMode>
      <UserContextProvider>
        <Layout>
          <Content className="container">
            <div className="layout">
              <NavBar/>
            </div>
            <Routes>
                <Route index element={<About />} />
                <Route path="signIn" element={<SignIn />} />
                <Route path="profile" element={<ProfileContextProvider><Profile /></ProfileContextProvider>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </Content>
        </Layout>
      </UserContextProvider>
    </StrictMode>
  );
};

export default App;