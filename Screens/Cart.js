import {Text,View,StyleSheet,Button,Modal,Image,TouchableOpacity} from 'react-native'
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addToCart,decrementQuantity,incrementQuantity,removeFromCart, updatePrice } from '../Cart_Reducer';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function ProductCard() {
  const cart = useSelector((state)=>state.cart.cart);
  // const totalPrice = useSelector((state) => state.cart.totalPrice);;
return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      {cart.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image
            style={styles.image}
          
            source={{ uri: item.image }} // Assuming item.image is a URL
        
        />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Product Title: {item.title}</Text>
            <Text style={styles.price}>Rs: {item.quantity*item.price}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  </GestureHandlerRootView>
);
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ff0000', // Red background color
    borderRadius: 20,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});
