import { useNavigate } from "react-router-dom";
import LoginForm from "../util-components/LoginForm";
import RegisterForm from "../util-components/RegisterForm";

export default function AuthUI({page}) {
  const navigate = useNavigate();

  const handleNavigate =()=>{
    if( page === 'Login' ){
      navigate('/register');
    }
    else navigate('/login');
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {(page==='Login') ? "Login" : "Register"}
        </h2>

        {(page==='Login') ? <LoginForm /> : <RegisterForm />}

        <p className="text-sm text-center mt-4">
          {(page==='Login') ? "Don't have an account?" : "Already have an account?"}
          <button onClick={()=>handleNavigate()} className="ml-2 text-blue-500 font-medium">
            {(page==='Login') ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}




