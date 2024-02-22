import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';

// type Props = {}
//  t

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  //  to receive the dynamic route from the path, we destructure
  const { id } = useLocalSearchParams();

  // hooks should be used in the body of the component, not outside or inside functions, not after if statements
  // try to always add the hooks and state at the top of your component
  const [ selectedSize, setSelectedSize ] = useState('L');

  // go find the ID equal to the ID of the params
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn(selectedSize, 'Adding to cart...Feb 16th, 2024, 1157 hours')
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

      <Text>Select size</Text>
      <View style={styles.sizes}>
      {sizes.map((size) => (
        // we cannot send variable to a stylesheet, we addded an array for colors
        <Pressable
          onPress={() => {
            setSelectedSize(size);
          }}
          style={[ styles.size, 
            { 
            backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
            }
                ]} 
          key={size}
        >
          {/* <Text key={size}>{size}</Text> // move the key to what is being rendered */}
          <Text 
            style={[styles.sizeText,
              { 
                color: selectedSize === size ? 'black' : 'gray',
                }
            ]}
          >
            {size}
          </Text>
        </Pressable>
      ))}
      </View>

        <Text style={styles.price}>
          {/* Product id no: {id}  */}
          ${product.price}
        </Text>

            <Button onPress={addToCart} text='Add to cart' />
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25, // to make it round use half of the width
    alignItems: 'center',
    justifyContent: 'center'
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },

})

export default ProductDetailScreen;
// this will automatically be a deep link for product page