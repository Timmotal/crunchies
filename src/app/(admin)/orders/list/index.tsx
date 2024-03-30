import { Text, FlatList, ActivityIndicator } from 'react-native';
// import orders from '@assets/data/orders'; // dummy data, now we do it from Database
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';

export default function OrdersScreen() {

    // our newly defined hook
    const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });

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