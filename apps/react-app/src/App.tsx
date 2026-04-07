import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/Routes/protectedRoute.jsx';
import NavbarLayout from './components/layouts/navbarLayout.jsx'
import Login from "./components/pages/LoginPage.js";
import NotFound from "./components/pages/NotFound.js";
import Register from './components/pages/Register.jsx'
import CodeEditor from "./components/pages/code-editor.js";
import Sheet from "./components/pages/Sheet.js";
import Dashboard from "./components/pages/Dashboard.js";
import Profile from "./components/pages/Profile.js";
function App() {

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <NavbarLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="editor" element={<CodeEditor/>} />
        <Route path="sheet/:sheet-name" element={<Sheet/>} />
      </Route> 
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={<NotFound/>} /> 
    </Routes>
  );
}

export default App;