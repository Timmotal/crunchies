import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Order, Tables } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs'; // for parsing the date and render in human readable form
import { Link, useSegments } from 'expo-router';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<'orders'>; // now we use helper tables, and then we specify the table the order is coming from
};
// type OrderListItemProps = {
//   order: Order;
// };

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>
            {/* plus we are using last seen feature here, i mean the day it was posted upto now */}
            {dayjs(order.created_at).fromNow()}
            {/*/*NOT EXACTLY EASILY READABLE  {order.created_at} */}
          </Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;