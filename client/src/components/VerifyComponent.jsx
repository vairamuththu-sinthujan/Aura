import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const VerifyComponent = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    const {backendUrl, myData} = useContext(AppContext)
    const mutate = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${backendUrl}/api/auth/sent-verify-otp`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })

            const data = await res.json()
            if (data.Success == false) {
                throw new Error(data.Message)
            }
            else {
                toast.success(data.Message)
                return data.Message
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    const sendOtpMutate = useMutation({
        mutationFn: async ({otp}) => {
            const res = await fetch(`${backendUrl}/api/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({otp:otp})
            })

            const data = await res.json()
            if (data.Success == false) {
                throw new Error(data.Message)
            }
            else {
                queryClient.invalidateQueries({
                    queryKey: ["authUser"]
                })
                return data.Message
            }
        },
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: () => {
            setOtp('')
            navigate(`/${myData.name}`)
            toast.success("Email verified successfully")
        }
    })

    const handleSentOtp = () => {
        // Trigger the OTP verification mutation
        sendOtpMutate.mutate({ otp: otp});
    }


  return (
    <div className=' w-full h-full flex flex-col justify-center items-center gap-10 pt-10 text-white'>
        <button className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all`} onClick={() => mutate.mutate()}
            disabled={mutate.isSuccess ? true: sendOtpMutate.isError ? false : false}
            >{ mutate.isPending ? "Sending..." : mutate.isSuccess ? "OTP Sended. please wait and check your email" : "Send OTP"}
        </button>
        <div className={`${mutate.isSuccess ? "block" : "hidden"}`}>
          <label className="block mb-2">OTP:</label>
          <input
            type="text"
            name="otp"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded-lg outline-none text-center"
          />
          <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 align-middle transition-all'
          onClick={handleSentOtp}
          >{ sendOtpMutate.isPending ? "Verifying..." : "Verify"}</button>
        </div>
    </div>
  )
}

export default VerifyComponent