import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios, { isAxiosError, type AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type {registerRequestType} from '@repo/types/apiRequests/registerRequestType'
import type {registerResponseType} from '@repo/types/apiResponse/registerResponseType'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const body: registerRequestType = {
      name,
      email,
      password,
    };

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    const id = toast.loading("Registering...");

    try {
      console.log(
        `Sending register request on url ${import.meta.env.VITE_BACKEND_URL}/register`
      );

      const response: AxiosResponse<registerResponseType> = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        body
      );

      const data = response.data;

      if (!data.success) throw new Error(data.error);

      navigate("/login");

      toast.update(id, {
        render: "Registered Successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.update(id, {
          render: err.response?.data?.message || err.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else if (err instanceof Error) {
        toast.update(id, {
          render: err.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
          render: "Unknown error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"} 
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button
        onClick={(e) => handleRegister(e)}
        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
      >
        Register
      </button>
    </form>
  );
}