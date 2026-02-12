import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <Toaster
          position="top-center"
          toastOptions={{
            style: {
              marginTop: "90px",
            },
          }}
      />

      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
