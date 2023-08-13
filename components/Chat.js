import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useEffect, useState, useCallback } from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View, } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InputToolbar } from "react-native-gifted-chat";
import CustomActions from "./CustomActions.js";
import MapView from 'react-native-maps';

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  //Declare all variables and pull info needed
    const {userID} = route.params;
    const [messages, setMessages] = useState([]);
    const {name} = route.params;
    const {color} = route.params;

    //make and style renderBubble
    const renderBubble = (props) => {
        return <Bubble {...props} wrapperStyle={{ right: { backgroundColor: "#000" }, left: { backgroundColor: "#FFF" } }}/>
    }

    const loadCachedChats = async () =>{
      const cachedChats = await AsyncStorage.getItem("chats" || []);
      setMessages(JSON.parse(cachedChats));
    }
    //updates both the view and pulls data when you open the page
    let unsubChats
    useEffect(() => {

      if (unsubChats) unsubChats();
      unsubChats = null;

      if(isConnected === true){
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubChats = onSnapshot(q, (documentsSnapshot) => {
          let newChat = [];
          documentsSnapshot.forEach(doc => {
            obj = doc.data()
            newChat.push({id: doc.id, ...obj, createdAt: obj.createdAt.toDate()})
          })
          cachedChats(newChat);
          setMessages(newChat);
        })
      } else if(isConnected === false){
        loadCachedChats();
      }

      return () => {
        //stops having a loop
        if (unsubChats) unsubChats();
      }
      }, [isConnected]);

      const cachedChats = async (chatsToCache) => {
        try {
          await AsyncStorage.setItem('chats', JSON.stringify(chatsToCache));
        } catch (error) {
          console.log(error.message);
        }
      }

      const renderInputToolbar = (props) => {
        if (isConnected === true) return <InputToolbar {...props} />;
        else return null;
       }


      /** 
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
    */
   //updates the database
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }



    //styles the page
    useEffect(() => {
        navigation.setOptions({title: name});
        navigation.setOptions({backgroundColor: color});
    }, []);

    const renderCustomActions = (props) => {
      return <CustomActions storage={storage} {...props} />;
    };

    const renderCustomView = (props) => {
      const { currentMessage} = props;
      if (currentMessage.location) {
        return (
            <MapView
              style={{width: 150,
                height: 100,
                borderRadius: 13,
                margin: 3}}
              region={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
        );
      }
      return null;
    }

    return(
        <View style={[styles.container, {backgroundColor: color}]}>
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            onSend={messages => onSend(messages)}
            renderActions={renderCustomActions}
            renderCustomView={renderCustomView}
            user={{
              _id: userID,
              name
            }}
          />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null}
            {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
  });

export default Chat;