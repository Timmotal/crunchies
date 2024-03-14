import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";

export const useProductList = () => {
    // const { data: products, error, isLoading } = useQuery({ -> we returned instead of destructuring
        return useQuery({ // when we return, when we use the useProductList
   // we can destructure the queries from hook by calling useProductList, wherever we want to use the hook 
        queryKey: ['products'], //this will help with caching
        queryFn: async () => {
          const { data, error } = await supabase.from('products').select('*');
          if(error) {
            throw new Error(error.message); // we have to throw it, so React Query knows there is an error
          }
          return data;
        },
      });
};

export const useProduct = (id: number) => {
    return useQuery({
        // we have to change the key, so it does not overwrite other queries with the same key
        // rule of thumb is to use a variable that differentiate the queries from each other 
        queryKey: ['products', id], // ID helps store them in different places in the cache

        queryFn: async () => {
            const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id) // select column to filter
            .single() // returns as object and not as an array

            if(error) {
                throw new Error(error.message)
            }
            return data;
        }
    })
}
export const useInsertProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newProduct, } = await supabase
                                            .from('products')
                                            .insert({
                                                name: data.name,
                                                image: data.image,
                                                price: data.price,
                                            })
                                            .single(); // we do this to get single object, instead of an array
        if(error) {
            throw new Error(error.message) 
        }
            return newProduct;
    },
    async onSuccess() {
        await queryClient.invalidateQueries(['products'])
    },
    // onError(error) {} says he doesn't need this line
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedProduct, } = await supabase
                                            .from('products') // target a table in the database
                                            .update({
                                                name: data.name,
                                                image: data.image,
                                                price: data.price,
                                            })
                                            .eq('id', data.id) // find where the ID is equal to the 'ID"
                                            .select()
                                            .single(); // we do this to get single object, instead of an array
        if(error) {
            throw new Error(error.message) 
        }
            return updatedProduct;
    },
    // onSuccess invalidate queries and refetch the list of products
    // async onSuccess(_, { id }) { we can even destructure from here
    async onSuccess(_, data) { // function that get invoked when the function is previous succesfully executed 
        await queryClient.invalidateQueries(['products']) // actually, it literally invalidates the query, which makes it run again
        await queryClient.invalidateQueries(['products', data.id])
    },
    // onError(error) {} says he doesn't need this line
    })
}

