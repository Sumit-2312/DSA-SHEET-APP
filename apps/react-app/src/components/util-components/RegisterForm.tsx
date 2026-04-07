import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="relative">
        <input
          type={showPassword ? "number" : "password"}
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">
        Register
      </button>
    </form>
  );
}