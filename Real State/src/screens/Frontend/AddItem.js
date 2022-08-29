import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

// firebase
import firestore from '@react-native-firebase/firestore';

export default function AddItem() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState({
    title: '',
    imageUri: '',
    location: '',
    propertyType: '',
    rooms: '',
    area: '',
    price: '',
    mobile: '',
  });

  const handleChange = (name, value) => {
    setData(s => ({
      ...s,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    console.log(data);
    const {
      title,
      imageUri,
      location,
      propertyType,
      rooms,
      area,
      price,
      mobile,
    } = data;
    if (
      (!title,
      !imageUri,
      !location,
      !propertyType,
      !rooms,
      !area,
      !price,
      !mobile)
    ) {
      alert('Please fill all the fields!');
      return;
    }
    setIsProcessing(true);
    firestore()
      .collection('properties')
      .add(data)
      .then(() => {
        alert('Your Listing has been added!');
        setData({
          title: '',
          imageUri: '',
          location: '',
          propertyType: '',
          rooms: '',
          area: '',
          price: '',
          mobile: '',
        });
      })
      .catch(err => {
        alert('Check Your Connection!');
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Text style={{fontSize: 35, marginTop: 10}}>Add Your Property</Text>
        </View>

        <View>
          <TextInput
            label="Title"
            value={data.title}
            style={{marginBottom: 10}}
            onChangeText={val => handleChange('title', val)}
          />
          <TextInput
            label="Image URL"
            value={data.imageUri}
            style={{marginBottom: 10}}
            onChangeText={val => handleChange('imageUri', val)}
          />
          <TextInput
            label="Location"
            value={data.location}
            style={{marginBottom: 10}}
            onChangeText={val => handleChange('location', val)}
          />
          <TextInput
            label="Property Type"
            value={data.propertyType}
            style={{marginBottom: 10}}
            onChangeText={val => handleChange('propertyType', val)}
          />
          <TextInput
            label="Rooms"
            value={data.rooms}
            keyboardType="numeric"
            style={{marginBottom: 10}}
            onChangeText={val => handleChange('rooms', val)}
          />
          <TextInput
            label="Area"
            value={data.area}
            style={{marginBottom: 10}}
            onChangeText={val => handleChange('area', val)}
            keyboardType="numeric"
          />
          <TextInput
            label="Price"
            style={{marginBottom: 10}}
            value={data.price}
            onChangeText={val => handleChange('price', val)}
            keyboardType="numeric"
          />
          <TextInput
            label="Mobile"
            style={{marginBottom: 10}}
            value={data.mobile}
            onChangeText={val => handleChange('mobile', val)}
            keyboardType="numeric"
          />
          <Button
            mode="contained"
            style={styles.loginBtn}
            onPress={handleAddItem}
            loading={isProcessing ? true : false}
            disabled={isProcessing ? true : false}>
            Add Property
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#add8e6',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtn: {
    borderRadius: 7,
    marginVertical: 10,
  },
});
