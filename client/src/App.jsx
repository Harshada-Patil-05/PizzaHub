import { Outlet } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Layout from './components/layout/Layout';

function App() {
  return (
    
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
