import AppLayout from "layouts/AppLayout";
import Login from "smart/Login";
import Register from "smart/Register";
import Dashboard from "smart/Dashboard";
import { Route, Routes } from "react-router-dom";
import { AppProvider } from "contexts/app.context";
// import "antd/dist/antd.css";

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </AppLayout>
      </div>
    </AppProvider>
  );
};

export default App;
