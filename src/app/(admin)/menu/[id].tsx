import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/cartProvider';
import { PizzaSize } from '@/types';


// type Props = {}
//  t

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  //  to receive the dynamic route from the path, we destructure
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const router = useRouter();
  // hooks should be used in the body of the component, not outside or inside functions, not after if statements
  // try to always add the hooks and state at the top of your component
  const [ selectedSize, setSelectedSize ] = useState<PizzaSize>('L');

  // go find the ID equal to the ID of the params
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    // handling when product is undefined
    if (!product) {
      return // basically do not do anything
    }
    addItem(product, selectedSize);
    // console.warn(selectedSize, 'Adding to cart...Feb 16th, 2024, 1157 hours');
    router.push('/cart');
  }

  if (!product){
    return <Text>Product not found</Text>
  }
  return (
    <View style={styles.container}>
      {/* configurations for navigation headers or what have you... this method doesn't require the name */}
      {/* <Stack.Screen options={{ title: 'Details ' + id}} /> */}
      <Stack.Screen options={{ title: product?.name}} />

      <Image source={{ uri: product.image || defaultPizzaImage}} style={styles.image} />
     
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>
          {/* Product id no: {id}  */}
          ${product.price}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({ // we cannot send variable to a stylesheet, we addded an array for colors
  container: {
    backgroundColor: 'white',
    flex: 1, // tell container to take all available space
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },


})

export default ProductDetailScreen;
// this will automatically be a deep link for product page