import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/cartProvider';
import { PizzaSize } from '@/types';
import { useProduct } from '@/api/products';
import RemoteImage from '@/components/RemoteImage';


// type Props = {}
//  t

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  //  to receive the dynamic route from the path, we destructure
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);
  const { addItem } = useCart();

  const router = useRouter();
  // hooks should be used in the body of the component, not outside or inside functions, not after if statements
  // try to always add the hooks and state at the top of your component
  const [ selectedSize, setSelectedSize ] = useState<PizzaSize>('L');

  // go find the ID equal to the ID of the params
  // const product = products.find((p) => p.id.toString() === id); //LOOPS OVER DUMMY PRODUCTS

  const addToCart = () => {
    // handling when product is undefined
    if (!product) {
      return // basically do not do anything
    }
    addItem(product, selectedSize);
    // console.warn(selectedSize, 'Adding to cart...Feb 16th, 2024, 1157 hours');
    router.push('/cart');
  }

  if(isLoading) {
    return <ActivityIndicator />;
  }

  if(error) {
    return <Text>Unable to fetch product</Text>
  }

  // if (!product){
  //   return <Text>Product not found</Text>
  // }
  return (
    <View style={styles.container}>
      {/* configurations for navigation headers or what have you... this method doesn't require the name */}
      {/* <Stack.Screen options={{ title: 'Details ' + id}} /> */}
      <Stack.Screen options={{ title: product?.name}} />

      <RemoteImage 
        path={product?.image}
        fallback={defaultPizzaImage} 
        style={styles.image} 
      />
      {/* <Image source={{ uri: product.image || defaultPizzaImage}} style={styles.image} /> */}

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