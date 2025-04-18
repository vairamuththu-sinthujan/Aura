import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AppContext } from "../context/AppContext"
import { useContext } from "react"
import { toast } from "react-toastify"

export const useFollowUnfollow = () => {

    const {backendUrl} = useContext(AppContext)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({user}) => {
          const res = await fetch(`${backendUrl}/api/users/follow/${user}`, {
            credentials: "include",
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify()
          })
          const data = await res.json()
          console.log(data)
          if (!data.Success) {
            throw new Error(data.Message)
          }
          else {
            queryClient.invalidateQueries({
              queryKey: ["getUser"]
            })
            queryClient.invalidateQueries({
              queryKey: ["suggestions"]
            })
            toast.success(data.Message)
          }
        },onError: (error) => {
          toast.error(error.message)
        },
        retry: false
      },)

      return mutation

}
