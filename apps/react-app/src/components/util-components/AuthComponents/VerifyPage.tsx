import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import type {verifyRequestType} from '@repo/types/apiRequests/verifyRequestType';
import axios, { isAxiosError, type AxiosResponse } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import type {verifyResponseType} from '@repo/types/apiResponse/verifyResponseType';

import type {sendMailRequestType} from '@repo/types/apiRequests/sendMailRequestType';
import type {sendMailResponseType} from '@repo/types/apiResponse/sendMailResponseType'
import RequestButton from '../others/RequestButton';

function VerifyPage() {

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [countOfMailSent,setCountOfMainSent] = useState<number>(0);
    const [TimerValue,setTimerValue] = useState<number>(0);
    const navigate = useNavigate();

    const verifyHandler = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        const finalOtp = otp.join("");
        const id = toast.loading("Verifying...")
        console.log(finalOtp);
        const email = localStorage.getItem("email");
        console.log("email",email);
        if(finalOtp.length < 6){
            toast.update(id,{
                render:"Must have 6 digits",
                type:"error",
                autoClose:3000,
                isLoading: false
            })
            return;
        }

        const body:verifyRequestType= {
            otp : finalOtp,
            email: email
        }

        try{
            console.log(`Sending verify request to url : ${import.meta.env.VITE_BACKEND_URL}/auth/verify}`)
            const response:AxiosResponse<verifyResponseType> = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`,body,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = response.data;
            if( data.error ){
                throw new Error(data.error);
            }
            localStorage.setItem("token",data.token); // this is the update token, it will consist of {email,isVerified}
            toast.update(id,{
                render: data.message,
                type: "success",
                autoClose: 3000,
                isLoading: false
            })
            navigate(data.redirect);
        
        }catch(err:unknown){
            if(isAxiosError(err)){
                toast.update(id,{
                    render: err.message,
                    type: 'error',
                    autoClose: 3000,
                    isLoading: false
                })
            }else if( err instanceof Error ){
                 toast.update(id,{
                    render: err.message,
                    type: 'error',
                    autoClose: 3000,
                    isLoading: false
                })
            }
            else{
                 toast.update(id,{
                    render: "Unknown error",
                    type: 'error',
                    autoClose: 3000,
                    isLoading: false
                })
            }
            setCountOfMainSent(0);
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, index:number) => {
        // Allow only numbers
        if (!/^[0-9]?$/.test(e.target.value)) {
            e.target.value = "";
            return;
        };

        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);
    };

    const MailHandler = async()=>{
        if( TimerValue > 0 ) return;
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        if(!email) {
            toast.error("Try after loging again!");
            navigate('/login');
            return;
        }
        const id =  toast.loading("Sending mail...");
        try {
            const body:sendMailRequestType = {
                token,
                email
            }
            const response:AxiosResponse<sendMailResponseType> = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sendMail`,body,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            const data = response.data;

            if( !data.success ){
                throw new Error(data.error);
            }

            toast.update(id,{
                render: "Check your mail",
                type: "success",
                isLoading: false,
                autoClose: 3000
            })
            
            setCountOfMainSent((prev)=>prev+1);
            setTimerValue(59);

        } catch (error:unknown) {
            if(isAxiosError(error)){
                toast.update(id,{
                    render: error.message,
                    type: 'error',
                    isLoading:false,
                    autoClose: 3000
                })
            }
            else if( error instanceof Error){
                toast.update(id,{
                    render: error.message,
                    type: 'error',
                    isLoading:false,
                    autoClose: 3000
                })
            }else{
                 toast.update(id,{
                    render: "Unknown error",
                    type: 'error',
                    isLoading:false,
                    autoClose: 3000
                })
            }
        }

    }

    useEffect(() => {
        if (TimerValue === 0) return;

        const interval = setInterval(() => {
            setTimerValue((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
                });
        }, 1000);

        return () => clearInterval(interval);
    }, [TimerValue]);



    if( !localStorage.getItem("token") ) return <Navigate to={"/login"} />

  return (
    <div className='w-full w-max-md flex flex-col gap-5 items-center justify-center p-8'>
        <div className='flex gap-3'>
            {Array.from({ length: 6 }).map((_, i) => (
                <input 
                    maxLength={1}
                    type='text'
                    onChange={(e) => handleChange(e, i)}
                    className='h-10 w-10 rounded-lg border-2 border-black text-center' key={i}
                />            
            ))}
        </div>
        {
            (countOfMailSent==0) && <RequestButton variant='light' text='Send Mail' onClick={MailHandler} />
        }
        <RequestButton text="Verify" variant="dark" onClick={(e)=>verifyHandler(e)} />
        {
            (countOfMailSent > 0 )&&
            <div className=' w-full items-center flex gap-1'>
                <button 
                    onClick={MailHandler}
                    className={`text-blue-600 font-semibold ${(TimerValue>0)?"hover:cursor-not-allowed":"hover:cursor-pointer"} text-sm  hover:text-blue-800 `}>
                    Resend mail?
                </button> 
                { TimerValue>0 && 
                    <span className='text-sm text-gray-800'>
                         {TimerValue}
                    </span>
                }
            </div>
        }
    </div>
  )
}

export default VerifyPage