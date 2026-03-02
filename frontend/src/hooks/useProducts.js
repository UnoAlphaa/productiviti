import {useMutation, useQuery} from "@tanstack/react-query"
import {createProduct, getAllProducts} from "../lib/api"


export const useProducts =  () => {
    const result = useQuery({querykey:["production"], queryFn:getAllProducts, initialData : []});
    return result;
}

export const useCreateProduct = ()=> {
    return useMutation({mutationFn : createProduct})
}