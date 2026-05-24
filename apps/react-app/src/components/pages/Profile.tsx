import { ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../recoilstates/user/userState";


function Profile() {
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  const navigate = useNavigate();

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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-lg font-semibold">
            {user.name[0].toUpperCase()}
          </div>

          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-zinc-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-800 mb-6"/>

        {/* Sheets */}
        <div className="mb-6">

          <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">
            Your Sheets
          </p>

          {
            user.sheets.length > 0 ? (

              <div className="space-y-3">

                {user.sheets.map((sheet)=>{

                  return(

                    <div
                      key={sheet.id}
                      onClick={()=>{
                        navigate(`/sheet/${sheet.id}`)
                      }}
                      className="group relative overflow-hidden cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-4 py-4 transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    >

                      {/* glow effect */}
                      <div className=" absolute inset-0  opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-transparent"/>
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className=" h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-blue-500/20 transition">
                            <FileText size={18} className=" text-zinc-400 group-hover:text-blue-400"/>
                          </div>
                          <div>
                            <p className=" text-sm font-medium text-zinc-200 group-hover:text-white transition">
                              {sheet.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                              Open Sheet
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={18} className=" text-zinc-600 transition-all duration-300 group-hover:text-blue-400 group-hover:translate-x-1"/>
                      </div>
                    </div>
                  )
                })}
              </div>
            ):(
              <p className="text-sm text-zinc-500">
                You haven't created any sheets yet.
              </p>
            )
          }

        </div>

          <div className="flex flex-col gap-3 w-full">

          <button onClick={() => navigate(-1)} className=" flex-1 py-2 rounded-xl border border-zinc-800 text-sm text-zinc-400 hover:border-blue-600 hover:text-blue-600  hover:bg-blue-500/5 transition-all duration-300 ">
              Close
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-xl border border-zinc-800 text-sm text-zinc-400 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            Log out
          </button>
          </div>

      </div>
    </div>
  );
}

export default Profile;