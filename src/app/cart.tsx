import CartListItem from '@/components/CartListItem';
import { CartContext, useCart } from '@/providers/cartProvider';

import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react'
import { FlatList, Text, View } from 'react-native'
import Button from '@/components/Button';



const CartScreen = () => {
  // remember that this is a hook, it should be somewhere at the top of your component
  // const { items } = useContexrt(CartContext);
     const { items, total, checkout } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        // take the item and then render it using the cartListItem component
        renderItem={( { item } ) => <CartListItem cartItem={item} /> }
        contentContainerStyle={{ gap: 10 }}
      />

      <Text
        style={{ marginTop: 20, fontSize: 20, fontWeight: '500'}}
      >Total ${total}</Text>
      <Button onPress={checkout} text="Checkout" />
        {/* <Text>Cart is not showing up as a modela: {items.length}</Text> */}

        {/* this is not a problem for me on Android, but i gotta install Xcode for iOS simulation */}
        {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
    </View>
  )
}

export default CartScreen;