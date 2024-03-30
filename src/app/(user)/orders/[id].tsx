import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
// import orders from '@assets/data/orders';
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "@/api/orders";
import { ActivityIndicator } from "react-native";


export default function OrderDetailsScreen() {

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]); // parse to float depending on type

    // we will receive it using the useOrderDetails
    const { data: order, isLoading, error } = useOrderDetails(id);

    // const order = orders.find((o) => o.id.toString() === id); // finding it manually

    // if (!order){
    //    return <Text>Not found</Text>
    // }

    if(isLoading) {
        return <ActivityIndicator />;
    }

    if(error) {
        return <Text> Failed to fetch</Text>
    }

    return (
        <View style={{ padding: 10, gap: 20, flex: 1, }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
            {/* <OrderListItem order={order} /> */}
            {/* <Text>Order Details: {id}</Text> */}

            <FlatList 
                data={order.order_items} 
                renderItem={ ({item}) => <OrderItemListItem item={item} /> }
                contentContainerStyle={{ gap: 10 }} 
                ListHeaderComponent={() => <OrderListItem order={order} />}

                // ListFooterComponent={() => <OrderListItem order={order} />}
            />
        </View>
    )
}