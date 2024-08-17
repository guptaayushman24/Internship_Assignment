import Reat, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image,TouchableOpacity ,Modal,Alert} from 'react-native';
import axios from 'axios';
import Modal_Screen from './Cart';
import { useSelector,useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart ,updatePrice} from "../Cart_Reducer";
const Test = () => {
 
  const [products, setproducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [show,setshow] = useState(false);
  // const itemPrice = products[0]['price']; // Base price
  const [selectedProduct, setSelectedProduct] = useState("");

  const cart = useSelector((state)=>state.cart.cart);
 
  console.log(cart);
  
  const dispatch = useDispatch();
  const getproductlist = async () => {
    
    const URL = "https://fakestoreapi.com/products";
   
    const data = await axios.get(URL);
    setproducts(data.data);
    
    // console.log(data.data);

  
  }
  const handleAddToCart = () => {
    setItemCount(itemCount + 1);
  };
  const handleRemoveFromCart = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
      setshow(true);
    }
  };
  const handleProductDetail = (product) => {
    setSelectedProduct(product); // Set the selected product
    setshow(true); // Show the modal
  };
  

  useEffect(() => {
    getproductlist();
  }, []);

  useEffect(() => {
    if (itemCount && selectedProduct) {
        dispatch(updatePrice({ itemCount, selectedProduct }));
    }
}, [itemCount, selectedProduct, dispatch]);

  const addItemToCart = (selectedProduct)=>{
    dispatch(addToCart(selectedProduct))
    Alert.alert('Item is added in the cart');
    setshow(false);
  }

  return (
    <View style={style.main}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={style.cardContainer}>
            <Image source={{ uri: item['image'] }} style={style.image} />
            <View style={style.textContainer}>
              <Text style={style.title}>Product
                Title:- {item['title']}</Text>
              <Text style={style.price}> Rs.{item['price']}</Text>
              <Text style={style.title}>Category:- {item['category']}</Text>
              <TouchableOpacity style={style.btn} onPress={()=>handleProductDetail(item)}><Text style={style.btntxt}>Product Detail</Text></TouchableOpacity>
                
              
            </View>
          </View>
        )}
      // ... other FlatList props
      />
      {
        show && (
          <Modal visible={show} animationType="slide">
          <View style={style.modalStyle}>
            <Image source={{uri:selectedProduct['image']}} style={style.img} />
            <Text style={style.description}>{selectedProduct['title']}</Text>
            <View style={style.price1}>
              {
                !itemCount ? (
                  <Text style={style.priceText}>Rs  {selectedProduct['price']}</Text>
                ):(
                  <Text style={style.priceText}>Rs  {itemCount*selectedProduct['price']}</Text>
                )
                
              }
              
            </View>
            <View style={style.buttonContainer}>
              <TouchableOpacity onPress={handleAddToCart}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>+</Text>
              </TouchableOpacity>
              <Text style={style.itemCount}>{itemCount}</Text>
              <TouchableOpacity onPress={handleRemoveFromCart}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.closeButton} onPress={() => addItemToCart(selectedProduct)}>
                <Text style={{fontSize:20,textAlign:"center",marginTop:10,fontWeight:"bold"}}>Add  to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        )
      }
      
    </View>
  )
}

export default Test;


const style = StyleSheet.create({
  main: {
    flex: 1
  },
  cardContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center', // Align text vertically within the container
  },
  title: {
    padding: 10,
    fontSize: 20
  },
  price: {
    marginStart: 40,
    fontSize: 18
  },
  btn:{
    backgroundColor:'green',
    width:120,
    height:50,
    alignContent:"flex-end",
    borderRadius:20
  },
  btntxt:{
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    marginTop:10,
    fontSize:15,
    fontWeight:"bold",

  },
  modalStyle: {
    backgroundColor: 'lightblue',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode:"contain"
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
  },
  price1: {
    textAlign: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  itemCount: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  closeButton: {
    marginLeft: 20,
    borderRadius:20,
    backgroundColor:'#f7ca00',
    width:200,
    height:50
  },

});