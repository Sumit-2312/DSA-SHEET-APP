// hooks/useUser.ts
import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../recoilstates/user/userState";


export function useUser() {

    const setUser = useSetRecoilState(userState);

    useEffect(()=>{

        async function fetchUser(){

            try{

                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/sheet/user`,
                    {
                        headers:{
                            Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setUser(res.data.userDetails);

            }catch(err){
                console.log(err);
            }
        }

        fetchUser();

    },[]);  

}