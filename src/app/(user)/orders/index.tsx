import { FlatList, Text } from "react-native";
// import orders from '@assets/data/orders';  // fetch from DB
import OrderListItem from "@/components/OrderListItem";
import { useMyOrderList } from "@/api/orders";
import { ActivityIndicator } from "react-native";

export default function OrdersScreen() {
    const { data: orders, isLoading, error } = useMyOrderList(); 

    if(isLoading) {
        return <ActivityIndicator />;
    }

    if(error) {
        return <Text> Failed to fetch</Text>
    }

    return (
        <FlatList
            data={orders}
            renderItem={ ({item}) => <OrderListItem order={item} /> }
            contentContainerStyle={{ gap: 10, padding: 10 }}
         />
    )
}