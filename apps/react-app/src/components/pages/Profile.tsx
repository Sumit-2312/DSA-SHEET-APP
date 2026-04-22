import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../recoilstates/user/userState";

function Profile() {
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);

  const handleLogout = () => {
    localStorage.removeItem("token"); // or whatever you use
    resetUser();

    // redirect if needed
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No user data found
      </div>
    );
  }

  return (
    <div className="h-full bg-[#0f172a] text-white p-6">
      
      {/* Card */}
      <div className="max-w-xl mx-auto bg-[#1e293b] rounded-2xl p-6 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
            {user.name[0].toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Sheets Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Your Sheets</h3>

          {/* Dummy for now */}
          <div className="text-gray-400 text-sm">
            You haven't created any sheets yet.
          </div>

          {/* Later map actual sheets */}
          {/* 
          sheets.map(sheet => (
            <div key={sheet.id}>{sheet.name}</div>
          ))
          */}
        </div>

        {/* Logout */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;