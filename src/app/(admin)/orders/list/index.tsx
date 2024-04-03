import { Text, FlatList, ActivityIndicator } from 'react-native';
// import orders from '@assets/data/orders'; // dummy data, now we do it from Database
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';

export default function OrdersScreen() {

    // our newly defined hook
    const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });
    useInsertOrderSubscription(); // you can also add on other screen, where you want to get updated in realtime

    // const queryClient = useQueryClient();

    // useEffect(() => { // refactored out to subscriptions.ts
    //     const ordersSubscription = supabase
    //       .channel('custom-insert-channel')
    //       .on(
    //         'postgres_changes',
    //         { event: 'INSERT', schema: 'public', table: 'orders' },
    //         (payload) => {
    //             // instead of saving this to state, you can invalidate queries to trigger refresh
    //           console.log('Change received!', payload);
    //           queryClient.invalidateQueries(['orders']);
    //         }
    //       )
    //       .subscribe();

    //       return () => {
    //         ordersSubscription.unsubscribe(); // to make sure, we do not leak memory
    //       }
    //   }, []);

    if(isLoading) {
        return <ActivityIndicator />;
    }

    if(error) {
        return <Text> Failed to fetch</Text>
    }

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} /> } 
            contentContainerStyle={{ gap: 10, padding: 10 }} 
        />
    )
}