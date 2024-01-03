import React,{useContext,useEffect,useState}from 'react'
import { View, Text,TouchableOpacity,Modal,TextInput,Alert ,FlatList} from 'react-native'
import { AuthContext } from '../Context/AuthContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';
export default function ListWordUser({navigation}) {
    const [modalVisible,setModalVisible]=useState(false)
    const [namelist,setnamelist]=useState('')
    const {token,urlApi,lists,setlists,ischange,setischange}=useContext(AuthContext)
    // useEffect(()=>{
    //     let Wuser=[]
    //     console.log(token)
    //     const loadWordsUser=(Wuser)=>{
    //         fetch("http://192.168.2.46:3000/getlist",{
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': token,
    //             },
    //         })
    //             .then(res=>res.json())
    //             .then(data=>Wuser=data)
    //     }

    //     loadWordsUser(Wuser)
    //     console.log(Wuser)
    // },[])
    



    // const setWordsUser=()=>{
    //     fetch("http://192.168.2.46:3000/setlist",{
    //         method:'POST',
    //         headers:{'Authorization':token,'Content-Type': 'application/json',},
    //         body:JSON.stringify({listname:namelist,words:[]})
    //     })
    //         .then(res=>res.json())
    //         .then(data=>console.log(data))
    // }
    useEffect(()=>{
        fetch(urlApi+"/getlist",{
            method:'POST',
            headers:{
                Authorization:token
            }})
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setlists(data)
            })
            .then(()=>{
                console.log(lists.length)
                
            })
            .catch((err)=>{
                console.log(err)

            }) 
        },[ischange])
   


        const deletelist=(a)=>{
                fetch(urlApi+"/deletelist",{
                method:'POST',
                headers:{
                    Authorization:token,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    listname:a
                })

            })
            .then(res=>res.json())
            .then(Alert.alert('xoa thanh cong','Ban da xoa thanh cong danh sach '+a))
            .catch((err)=>console.log('loi xoa list'))
        }

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
            if(data.yehh) setModalVisible(!modalVisible)
        })
        .catch((err)=>{
            console.log('loioiiooi')
            console.log(err)
        })
    }
    const createList =()=>{
        if(!namelist)
        Alert.alert('Vui long nhap ten danh sach')
        else {
            setUserList(namelist,[])
            setlists([...lists,{listname:namelist,words:[]}])
            setModalVisible(!modalVisible)
            setnamelist('')
        }
    }
    
    return(
        (lists.length==0)?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    setnamelist('')
                }}>
                <View style={{marginTop:200,marginLeft:30,backgroundColor:'gray',width:300,height:220,borderRadius:5,opacity:0.9,alignItems:'center'}}>
                <View >
                    <Text style={{fontSize:40}}>Enter name list</Text>
                    <TextInput style={{borderWidth:1,borderColor:'black',width:200}}
                                value={namelist}
                                onChangeText={(text)=>{setnamelist(text)}}/>
                    <TouchableOpacity style={{height:40,justifyContent:'center',backgroundColor:'red',alignItems:'center',marginTop:20}}
                    onPress={()=>{createList()}}>
                        <View>
                            <Text>Create</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:40,justifyContent:'center',backgroundColor:'red',alignItems:'center',marginTop:20}}
                    onPress={()=>{setModalVisible(!modalVisible);
                        setnamelist('')}}>
                        <View>
                            <Text>Close</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            <Text style={{fontSize:20,color:'#78D6C6' }}>You haven't created any list</Text>
            <MaterialCommunityIcons  
                    name='plus-box'
                    size={50} color='#78D6C6' 
                    onPress={()=>{setModalVisible(!modalVisible)}}/>
        </View>:<View style={{flex:1,justifyContent:'center'}}>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                            setnamelist('')
                        }}>
                        <View style={{marginTop:200,marginLeft:30,backgroundColor:'gray',width:300,height:220,borderRadius:5,opacity:0.9,alignItems:'center'}}>
                        <View >
                            <Text style={{fontSize:40,}}>Enter name list</Text>
                            <TextInput style={{borderWidth:1,borderColor:'black',width:200}}
                                        value={namelist}
                                        onChangeText={(text)=>{setnamelist(text)}}/>
                            <TouchableOpacity style={{backgroundColor:'red',alignItems:'center',marginTop:20,height:40,justifyContent:'center'}}
                            onPress={()=>{createList()}}>
                                <View>
                                    <Text>Create</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:40,justifyContent:'center',backgroundColor:'red',alignItems:'center',marginTop:20}}
                            onPress={()=>{setModalVisible(!modalVisible);
                                setnamelist('')}}>
                                <View>
                                    <Text>Close</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
            <FlatList
            ListHeaderComponent={<View style={{justifyContent:'center',alignItems:'center',paddingTop:20}}><Text style={{fontSize:40,fontWeight:800}}>List</Text></View>}
            ListFooterComponent={<View style={{justifyContent:'center',alignItems:'center'}}>
                <MaterialCommunityIcons name='plus-circle' size={60} color={'blue'} onPress={()=>{setModalVisible(!modalVisible)}}/>
            </View>}
            data={lists}
            keyExtractor={(item,index) => index}
            renderItem={({item})=>(
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:340,borderBottomWidth:2,marginHorizontal:10,padding:1,marginVertical:2}} onPress={()=>navigation.navigate('WordofList',{item})}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name='folder' size={40} color={'#FF9800'}/>
                        <Text style={{fontSize:30}}>{item.listname}</Text>  
                    </View>
                    <MaterialCommunityIcons name='delete' size={40} color={'red'} onPress={()=>{
                        Alert.alert(
                            'Xác nhận',
                            'Bạn có chắc chắn muốn thực hiện hành động này?',
                            [
                              {
                                text: 'Hủy',
                                style: 'cancel',
                              },
                              {
                                text: 'Đồng ý',
                                onPress: () => {
                                  // Xử lý khi người dùng đồng ý
                                  setlists(lists.filter(item1=>item1!=item))
                        deletelist(item.listname)
                                },
                              },
                            ],
                            { cancelable: false }
                          );
                        
                    }}/>
                    
                </TouchableOpacity>
            )}
            />
        </View>
    )
}