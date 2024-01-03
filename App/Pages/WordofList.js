import React,{useContext,useEffect,useState}from 'react'
import { View, Text,TouchableOpacity,Modal,TextInput,Alert ,FlatList} from 'react-native'
import { AuthContext } from '../Context/AuthContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';
export default function WordofList({route,navigation}) {
    const [modalVisible,setModalVisible]=useState(false)
    const [namelist,setnamelist]=useState('')
    const [meaning,setmeaning]=useState('')
    const {token,urlApi,ischange,setischange}=useContext(AuthContext)
    let tmp=route.params
    const[lists,setlists]=useState(tmp.item.words)
    const [titlelist,settitlelist]=useState(tmp.item.listname)
   let check=1;
   useEffect(() => {
    // Cập nhật title khi component được tạo
    navigation.setOptions({
      title: titlelist,
    });
  }, [navigation]);
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

    // useEffect(()=>{
    //     fetch("http://192.168.2.46:3000/getlist",{
    //         method:'GET',
    //         headers:{
    //             Authorization:token
                
    //         }})
    //         .then(res=>res.json())
    //         .then(data=>{
    //             // console.log(data)
    //             setlists(data)
    //         })
    //         .then(()=>{
    //             console.log(lists.length)
                
    //         })

    //     },[])



        // const deletelist=(a)=>{
        //         fetch("http://192.168.2.46:3000/deletelist",{
        //         method:'POST',
        //         headers:{
        //             Authorization:token,
        //             'Content-Type':'application/json'
        //         },
        //         body:JSON.stringify({
        //             listname:a
        //         })

        //     })
        //     .then(res=>res.json())
        // }

        // 10.45.130.127

    const setUserList=(a,b)=>{
        console.log(token)
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
            if(data.yehh&&check) setModalVisible(!modalVisible)
            check=1
            setischange(!ischange)
        })
    }
    // const createList =()=>{
    //     if(!namelist)
    //     Alert.alert('Vui long nhap ten danh sach')
    //     else {
    //         setUserList(namelist,[])
    //         setlists([...lists,{listname:namelist,words:[]}])
    //     }
    // }
    // return(<View><Text>hi</Text></View>)
    return(
        (lists.length==0)?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    // setModalVisible(!modalVisible);
                }}>
                <View style={{marginTop:200,marginLeft:30,backgroundColor:'gray',width:300,height:290,fontSize:20,borderRadius:5,opacity:0.9,alignItems:'center'}}>
                <View >
                    <Text style={{fontSize:30}}>Từ vựng</Text>
                    <TextInput style={{borderWidth:1,borderColor:'black',padding:2,fontSize:20}}
                                value={namelist}
                                onChangeText={(text)=>{setnamelist(text)}}/>
                    <Text style={{fontSize:30}}>Nghĩa</Text>
                    <TextInput style={{borderWidth:1,borderColor:'black',padding:2,width:200,fontSize:20}}
                                value={meaning}
                                onChangeText={(text)=>{setmeaning(text)}}/>
                    <TouchableOpacity style={{height:40,justifyContent:'center',backgroundColor:'red',alignItems:'center',marginTop:20}}
                    onPress={()=>{
                        setModalVisible(!modalVisible)
                        setUserList(titlelist,[...lists,namelist,meaning])
                    setlists([...lists,namelist,meaning])
                    setModalVisible(!modalVisible)
                            setnamelist("")
                            setmeaning('')
                    }}>
                        <View>
                            <Text>Lưu</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:40,justifyContent:'center',backgroundColor:'red',alignItems:'center',marginTop:20}}
                    onPress={()=>{setModalVisible(!modalVisible)
                    setnamelist("")
                    setmeaning('')}}>
                        <View>
                            <Text>Đóng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            <Text style={{fontSize:20,color:'#78D6C6' }}>Danh sách trống</Text>
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
                        }}>
                        <View style={{marginTop:200,marginLeft:30,backgroundColor:'gray',width:300,height:270,borderRadius:5,opacity:0.9,alignItems:'center'}}>
                        <View >
                            <Text style={{fontSize:30}}>Từ vựng</Text>
                            <TextInput style={{borderWidth:1,borderColor:'black',width:200,fontSize:20}}
                                        value={namelist}
                                        onChangeText={(text)=>{setnamelist(text)}}/>
                            <Text style={{fontSize:30}}>Nghĩa</Text>
                            <TextInput style={{borderWidth:1,borderColor:'black',width:200,fontSize:20}}
                                        value={meaning}
                                        onChangeText={(text)=>{setmeaning(text)}}/>
                            <TouchableOpacity style={{height:40,justifyContent:'center',backgroundColor:'red',alignItems:'center',marginTop:20}}
                            onPress={()=>{setUserList(titlelist,[...lists,namelist,meaning])
                                setlists([...lists,namelist,meaning])
                                setModalVisible(!modalVisible)
                            setnamelist("")
                            setmeaning('')}}>
                                <View>
                                    <Text>Lưu</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:40,justifyContent:'center',backgroundColor:'red',alignItems:'center',marginTop:20}}
                            onPress={()=>{setModalVisible(!modalVisible)
                            setnamelist("")
                            setmeaning('')}}>
                                <View>
                                    <Text>Đóng</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
            <FlatList
            ListHeaderComponent={<View style={{justifyContent:'center',alignItems:'center',paddingTop:20}}><Text style={{fontSize:40,fontWeight:800}}></Text></View>}
            ListFooterComponent={<View style={{justifyContent:'center',alignItems:'center'}}>
                <MaterialCommunityIcons name='plus-circle' size={60} color={'blue'} onPress={()=>{setModalVisible(!modalVisible)}}/>
            </View>}
            data={lists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item,index})=>(
                index%2==0?<TouchableOpacity onPress={()=>{Alert.alert('Nghĩa:',lists[index+1])}} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:340,borderBottomWidth:2,marginHorizontal:10,padding:1,marginVertical:2}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MaterialCommunityIcons name='minus' size={20}/>
                    <Text style={{fontSize:30}}>{item}</Text>  
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
                              let tmp=lists[index+1]
                                setlists(lists.filter(item1=>item1!=item&&item1!=tmp))
                                setUserList(titlelist,lists.filter(item1=>item1!=item&&item1!=tmp))
                                check=0
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                }}/>
                
            </TouchableOpacity>:<View></View>
            )}
            />
        </View>
    )
}