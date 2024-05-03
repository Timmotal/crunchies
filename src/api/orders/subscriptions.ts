import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const ordersSubscription = supabase
          .channel('custom-insert-channel')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'orders' },
            (payload) => {
                // instead of saving this to state, you can invalidate queries to trigger refresh
              console.log('Change received!', payload);
              queryClient.invalidateQueries(['orders']);
            }
          )
          .subscribe();
    
          return () => {
            ordersSubscription.unsubscribe(); // to make sure, we do not leak memory
          }
      }, []);
};



export const useUpdateOrderSubscription = (id: number) => {
    const queryClient = useQueryClient();


    useEffect(() => {
        const orders = supabase
          .channel('custom-filter-channel')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'orders',
              filter: `id=eq.${id}`,
            },
            (payload) => {
                queryClient.invalidateQueries(['orders', id]);
            //   refetch();, never once used
            }
          )
          .subscribe();
      
        return () => {
          orders.unsubscribe();
        };
      }, []);
}