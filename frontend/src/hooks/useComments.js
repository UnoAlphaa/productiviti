import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import {createComments, deleteComments} from "../lib/api"

export const useCreateComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : createComments,
        onSuccess : (_,variables)=>{
            queryClient.invalidateQueries({queryKey: ["product", variables.productId]})
        }
    })
};
export const useDeleteComment = (productId) => {
     const queryClient = useQueryClient()
    return useMutation({mutationFn : deleteComments,
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey : ["product", productId]})
        }
    })
};
