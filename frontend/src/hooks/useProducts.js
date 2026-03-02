import {useMutation, useQuery} from "@tanstack/react-query"
import {createProduct, getAllProducts} from "../lib/api"


export const useProducts =  () => {
    const result = useQuery({querykey:["products"], queryFn:getAllProducts});
    return result;
}

export const useCreateProduct = ()=> {
    return useMutation({mutationFn : createProduct})
}