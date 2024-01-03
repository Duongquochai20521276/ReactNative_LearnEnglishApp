import React, { useState , useEffect,useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Alert} from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Search from './Search';

 
const Flashcard = ({ vocabularyList }) => {
  const {token,urlApi,ischange,setischange}=useContext(AuthContext)
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const navigation = useNavigation();

  const handleSaveWord = async() => {


    let listword
    let hasDefaultList
    await fetch(urlApi+"/getlist",{
      method:'POST',
      headers:{
          Authorization:token
      }})
      .then(res=>res.json())
      .then(data=>{
          hasDefaultList = data.some(item => item.listname === "default");
          if(hasDefaultList) {
            listword=data.filter(item=>item.listname==="default")[0].words
          }else{listword=[]}
      }) 
      .catch((err)=>{
          console.log(err)

      })  



    console.log('Word saved:', vocabularyList[currentCardIndex]);
    if(!listword.some(item=>item===vocabularyList[currentCardIndex].word))
    {
      listword=[...listword,vocabularyList[currentCardIndex].word,vocabularyList[currentCardIndex].meaning]
      setUserList('default',listword)
    }else{
      Alert.alert('Thông báo','Từ đã được thêm vào danh sách default')
    }
    
    console.log(listword)
    
  };

  const handleDone = () => {
    setischange(!ischange)
    navigation.goBack();
  };

 


  const setUserList=(a,b)=>{
    
    
      fetch(urlApi+"/setlist",{
          method:'POST',
          headers:{
              Authorization:token,
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              listname:a,words:b
          })

      })
      .then(res=>res.json())
      .then(data=>{
          if(data.success) Alert.alert('Thông báo','Lưu từ vựng thành công')
      })
      .catch((err)=>{
          console.log('loioiiooi')
          console.log(err)
      })
  }


  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % vocabularyList.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + vocabularyList.length) % vocabularyList.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{vocabularyList[currentCardIndex].word}</Text>
        <Text style={styles.translatedText}>{vocabularyList[currentCardIndex].meaning}</Text>
      </View>
      <Search initialKeyword={vocabularyList[currentCardIndex].word} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c', marginBottom: 10 }]} onPress={handleSaveWord}>
          <Text style={styles.buttonText}>Lưu từ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { marginRight: 5 }]} onPress={handlePrevCard}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginRight: 5 }]} onPress={handleNextCard}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#27ae60', marginLeft: 5 }]} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  translatedText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Flashcard;
