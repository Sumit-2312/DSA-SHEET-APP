import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/Routes/protectedRoute.jsx';
import NavbarLayout from './components/layouts/navbarLayout.jsx'
import NotFound from "./components/pages/NotFound.js";
import CodeEditor from "./components/pages/code-editor.js";
import Sheet from "./components/pages/Sheet.js";
import Dashboard from "./components/pages/Dashboard.js";
import Profile from "./components/pages/Profile.js";
import AuthUI from "./components/pages/AuthPage.js";
import { useUser } from "./components/util-components/others/useUserHook.js";
import ProblemEditorLayout from "./components/pages/OwnQuestionPage.js";

function App() {
    useUser();
  return (
    
      <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <NavbarLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="customQuestion/:id" element={<ProblemEditorLayout/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="editor" element={<CodeEditor/>} />
        <Route path="sheet/:id" element={<Sheet/>} />
      </Route> 
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      } />
      <Route path="/login" element={<AuthUI page='Login' />} />
      <Route path="/register" element={<AuthUI page='Register' />} />
      <Route path="/verify" element={<AuthUI page='Verify' />} />
      <Route path="*" element={<NotFound/>} /> 
    </Routes>

  );
}

export default App;