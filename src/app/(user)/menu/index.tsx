// import { Image, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
// import EditScreenInfo from '@/src/components/EditScreenInfo';
// import { Text, View } from '@/src/components/Themed';
import { View, FlatList } from 'react-native';
// import Colors from '../../constants/Colors';
// import products from '@/data/products';
import products from '@assets/data/products';
import ProductListItem from '@/components/ProductListItem';
import { Product } from '@/types';

// const product = products[0];

// const ProductListItem = (props) => { // to define a component, create a simple function
// const ProductListItem = ({ product }) => { // destructure
//   // console.log(props);
//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: product.image }} style={styles.image} />
//       {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Pepperoni</Text> */}
//       {/* <Text style={styles.title}>Pepperoni</Text> */}
//       <Text style={styles.title}>{product.name}</Text>

//       <Text style={styles.price}>${product.price}</Text>
//       {/* <Text style={styles.title}>Feb 15th, 0404 hours. 2024.</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
//     </View>
//   )
// }

// export default function TabOneScreen() {
  export default function MenuScreen() {
  return (
    <View> 
      {/* we do not neeed this view here, but i will leave it here, nonetheless */}
      <FlatList
        data={products} // would be an array of items to be rendered
        // renderItem={{ item }}) => <ProductListItem product={products[6]} /> } // tells us how one item from the array should be rendered
        renderItem={({ item }) => <ProductListItem product={item} /> } // tells us how one item from the array should be rendered
        numColumns={2} // this is how we render grids
        contentContainerStyle={{gap: 10}}
        columnWrapperStyle={{ gap: 10 }}
      />
      {/* <ProductListItem product={products[0]} /> */}
      {/* <ProductListItem product={products[1]} /> */}
    </View>
  )
  // return (
  //   <View style={styles.container}>
  //     <Image source={{ uri: product.image }} style={styles.image} />
  //     {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Pepperoni</Text> */}
  //     {/* <Text style={styles.title}>Pepperoni</Text> */}
  //     <Text style={styles.title}>{product.name}</Text>

  //     <Text style={styles.price}>${product.price}</Text>
  //     {/* <Text style={styles.title}>Feb 15th, 0404 hours. 2024.</Text>
  //     <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  //     <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 20,
//     // flex: 1,
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   // title: {
//   //   fontSize: 20,
//   //   fontWeight: 'bold',
//   // },
//   // separator: {
//   //   marginVertical: 30,
//   //   height: 1,
//   //   width: '80%',
//   // },
//   title: {
//     fontSize: 30,
//     fontWeight: '600',
//     marginVertical: 10, 
//   },
//   price: {
//     color: Colors.light.tint,
//     fontWeight: 'bold',
//     // color: 'blue',
//   },
//   image: {
//     width:'100%',
//     // height: 100,
//     aspectRatio: 1,
//   },
// });
