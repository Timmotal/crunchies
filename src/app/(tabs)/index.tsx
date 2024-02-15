import { Image, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
import EditScreenInfo from '@/src/components/EditScreenInfo';
// import { Text, View } from '@/src/components/Themed';
import { Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import products from '@/assets/data/products';

const product = products[0];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      {/* <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Pepperoni</Text> */}
      {/* <Text style={styles.title}>Pepperoni</Text> */}
      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.price}>${product.price}</Text>
      {/* <Text style={styles.title}>Feb 15th, 0404 hours. 2024.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    // flex: 1,
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
