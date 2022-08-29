import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome5';

export default function Search({search, setSearch}) {
  return (
    <View style={{paddingHorizontal: 20}}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name={'search'}
          size={20}
          style={{marginRight: 5, marginLeft: 15}}
        />
        <TextInput
          placeholder="Search"
          style={styles.SearchBar}
          value={search}
          onChangeText={val => setSearch(val)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SearchBar: {
    width: '100%',
  },
  searchContainer: {
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
  },
});
