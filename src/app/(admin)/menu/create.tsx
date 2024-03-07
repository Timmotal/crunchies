import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

type Props = {}

const CreateProductScreem = (props: Props) => {

  const [ name, setName ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ errors, setErrors ] = useState('');
  const [ image, setImage ] = useState(String || null);

 const { id } = useLocalSearchParams();
 const isUpdating = !!id ; // this will be true if ID is defined

  const resetFields = () => {
    setName('');
    setPrice('');
  };

  const validateInput = () => { // i actually think this is error handling and maybe some lickle validation
    if (!name){
      setErrors('Name us required');
      return false;
    }
    if (!price){
      setErrors('Price is required')
      return false;
    }
    if (isNaN(parseFloat(price))){
      setErrors('Price is not a number');
      return false;
    }

    // if none of the above statements are false, then we can be sure it is true
    return true // feel how we are not using if else
  }

  const onSubmit = () => {
    if (isUpdating){
      // update
      onUpdate();
       
    } else{
      onCreate();
    }
  };

  const onCreate = () => {
    if (!validateInput()){
      return; // return here if there is a validation error,----------handle error first again
    }
    console.warn('Creating Product', name);
    // reset fields after succesfully saving data to the database
    resetFields();
  };

  const onUpdate = () => {
    if (!validateInput()){
      return; // return here if there is a validation error,----------handle error first again
    }
    console.warn('Updating Product', name);
    // reset fields after succesfully saving data to the database
    resetFields();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // if you want the quality reduced
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri); // set the image in state
    }
  };

  const onDelete = () => {
    console.warn('DELETE!!!')
  };

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Do you wish to proceed with this action', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}> 
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product'}} />
      <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
      <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

        <Text style={styles.label}>Name</Text>
        {/* bind this to a state variable */}
        <TextInput 
          placeholder='Name' 
          style={styles.input}
          value={name}
          onChangeText={setName} 
        />

        <Text style={styles.label}>Price ($)</Text>
        <TextInput 
          placeholder='9.92' 
          style={styles.input}
          keyboardType='numeric' 
          value={price}
          onChangeText={setPrice}
        />

        <Text style={{ color: 'red'}}>{errors}</Text>

        <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create' } />
        {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    image: {
      width: '50%',
      aspectRatio: '1',
      alignSelf: 'center',
    },
    textButton:{
      fontWeight: 'bold',
      alignSelf: 'center',
      color: Colors.light.tint,
      marginVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
      color: 'gray',
      fontSize: 16,
    }
})
export default CreateProductScreem