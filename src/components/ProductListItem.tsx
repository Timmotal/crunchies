import { Image, Pressable, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/src/components/Themed';
import { Text, View } from 'react-native';
import Colors from '@/constants/Colors';
// import Colors from '@/src/constants/Colors';
// import { Product, Tables } from '../types'; // initialy imported prpoduct manually
import { Tables } from '../types';

import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage =
'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png';

// const product = products[0];

type ProductListItemProps = {
  product: Tables<'products'>;
    // product: Product; // we dont wannt to define the TYPE manually -> (04:58:11)
    // we wannsa say the product should match the type in supabase
}
// const ProductListItem = (props) => { // to define a component, create a simple function
// specify 'type' after 'destructure'
const ProductListItem = ({ product }: ProductListItemProps) => { // destructure
  const segments = useSegments(); // we can also use pathways
  // console.log(segments);
  // console.log(props);
  return (
    //  asChild tells it, that the children elements should keep its styles only for elements other than texts
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild> 
    {/* why does comment here give the code a bug eh chatgpt, help me out */}
       {/* // <Link href={`./menu/${product.id}`} asChild> relative path didnt work he says */}
    {/* // <Link href={`/menu/${product.id}`} asChild> */}
    {/* <Link href={'/product'} asChild> */}
    {/* <View style={styles.container}> */}
    {/* pressable is similar to view but can be pressed */}
    <Pressable style={styles.container}>
        {/* provide fallback image if the image from the API is null */}
        <RemoteImage 
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode='contain' // i like this, when parent container width is different from image, just contain it then 
      />
      {/* <Image // taken out, replaced with RemoteImages from Data SuperBase
        source={{ uri: product.image || defaultPizzaImage }} 
        style={styles.image}
        resizeMode='contain' // i like this, when parent container width is different from image, just contain it then 
      /> */}
      {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Pepperoni</Text> */}
      {/* <Text style={styles.title}>Pepperoni</Text> */}
      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.price}>${product.price}</Text>
      {/* <Text style={styles.title}>Feb 15th, 0404 hours. 2024.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}

    </Pressable>
    </Link>
  )
}

export default ProductListItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%', // take as much space as you need but not more than 50%, freedom and bondage at the same time
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 10, 
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    // color: 'blue',
  },
  image: {
    width:'100%',
    // height: 100,
    aspectRatio: 1,
  },
});

