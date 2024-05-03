import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  
    return useMutation({
        async mutationFn(items: InsertTables<'orders_items'>[]) {
            const { error, data: newProduct, } = await supabase
                                            .from('order_items')
                                            .insert(items)
                                            .select()
                                            // .single(); because we have an array of items
        if(error) {
            throw new Error(error.message) 
        }
            return newProduct;
    }
    })
  };