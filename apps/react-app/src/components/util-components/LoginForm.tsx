import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type {loginType} from '@repo/types/apiRequests/login';
import axios, { isAxiosError, type AxiosResponse } from "axios";
import type {loginResponse} from '@repo/types/apiResponse/loginRespnse'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();



  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();

    const body:loginType = {
        email,
        password
    }

    if(!email || !password ) {
        toast.error("Must have email and password");
        return;
    }
    const id = toast.loading("Loggin in...");

    // send login request to the backend 
    try{
        console.log(`Sending login request on url ${import.meta.env.VITE_BACKEND_URL}`)
        const response:AxiosResponse<loginResponse> =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}`, body);
        const data = response.data;

        if(!data.success) throw new Error(data.error);
        const token = data.token;
        localStorage.setItem("token",token);
        navigate('/dashboard');

        toast.update(id,{
            render:"Logged in Successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,            
        });

    }catch(err:unknown){
        if (isAxiosError(err)) {
            console.log(err.response?.data?.message || err.message);
            toast.update(id,{
                render: err.response?.data?.message || err.message,
                type:"error",
                isLoading: false,
                autoClose: 3000 
            })
        } else if (err instanceof Error) {
            toast.update(id,{
                render: err.message,
                type:"error",
                isLoading: false,
                autoClose: 3000 
            })
            console.log(err.message);
        } else {
            toast.update(id,{
                render: "Unknown error",
                type:"error",
                isLoading: false,
                autoClose: 3000 
            })
            console.log("Unknown error");
        }

    }
  }

  return (
    <form className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e)=>{setEmail(e.target.value)}}
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button onClick={(e)=>handleLogin(e)} className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">
        Login
      </button>
    </form>
  );
}