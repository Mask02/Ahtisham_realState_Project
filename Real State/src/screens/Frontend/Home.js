import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import BottomTabs from '../../components/BottomTabs';
import Header from '../../components/Header';
import {Divider} from 'react-native-paper';
import Search from '../../components/Search';
import PropertyItem from '../../components/PropertyFeed';

// AuthContext
import {useAuthContext} from '../../contexts/AuthContext';

// firebase
import firestore from '@react-native-firebase/firestore';

// let Data = [
//   {
//     title: 'Brand New House for sell',
//     imageUri:
//       'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     location: 'Lahore',
//     propertyType: 'Villa',
//     rooms: '12',
//     area: '12000 square feet',
//     price: '7Cr',
//     mobile: '03001234567',
//   },
//   {
//     title: 'Bahria Town Apartment for sale',
//     imageUri:
//       'https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmVhbCUyMHN0YXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     location: 'Karachi',
//     propertyType: 'Apartment',
//     rooms: '5',
//     area: '800 square feet',
//     price: '70 Lakh',
//     mobile: '03001234567',
//   },
//   {
//     title: 'Luxury House for sale',
//     imageUri:
//       'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
//     location: 'Faisalabad',
//     propertyType: 'Apartment',
//     rooms: '6',
//     area: '960 square feet',
//     price: '95 Lakh',
//     mobile: '03001234567',
//   },
// ];

export default function Home({navigation}) {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);

  // function onResult(QuerySnapshot) {
  // QuerySnapshot.forEach(element => {
  // setPropertyList(s => {
  //   console.log({id: element.id, ...element.data()});
  //   return [...s, {id: element.id, ...element.data()}];
  // });
  //   setPropertyList([{id: element.id, ...element.data()}]);
  // });
  // console.log(propertyList);
  // }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    firestore()
      .collection('properties')
      .onSnapshot(async QuerySnapshot => {
        const newArr = [];
        QuerySnapshot.forEach(element => {
          // setPropertyList(s => {
          //   console.log({id: element.id, ...element.data()});
          //   return [...s, {id: element.id, ...element.data()}];
          // });
          // setList([...list, {id: element.id, ...element.data()}]);

          newArr.push({id: element.id, ...element.data()});
        });
        setList(newArr);
        return;
      }, onError);
  }, []);

  const filteredList = list.filter(item =>
    item.location.toLowerCase().includes(search.toLowerCase()),
  );
  console.log('filtered=>', filteredList);
  return (
    <>
      <Header navigation={navigation} />
      <Divider />
      <Search search={search} setSearch={setSearch} />
      {/* Property Feed */}
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            {filteredList.map((property, i) => (
              <PropertyItem {...property} key={i} navigation={navigation} />
            ))}
          </>
        </ScrollView>
      </View>

      <Divider />
      <BottomTabs navigation={navigation} />
    </>
  );
}
