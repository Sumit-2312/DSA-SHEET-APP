import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../recoilstates/user/userState";

function Profile() {
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    resetUser();
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
        No user data found
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-lg font-semibold shrink-0">
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 mb-6" />

        {/* Sheets */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">Your Sheets</p>
          <p className="text-sm text-zinc-500">You haven't created any sheets yet.</p>

          {/* Later: sheets.map(sheet => <div key={sheet.id}>{sheet.name}</div>) */}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-xl border border-zinc-800 text-sm text-zinc-400 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
        >
          Log out
        </button>

      </div>
    </div>
  );
}

export default Profile;