import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useEffect, useState, useCallback } from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View, } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
  //Declare all variables and pull info needed
    const {userID} = route.params;
    const [messages, setMessages] = useState([]);
    const {name} = route.params;
    const {color} = route.params;

    //make and style renderBubble
    const renderBubble = (props) => {
        return <Bubble {...props} wrapperStyle={{ right: { backgroundColor: "#000" }, left: { backgroundColor: "#FFF" } }}/>
    }

    //updates both the view and pulls data when you open the page
    useEffect(() => {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubChats = onSnapshot(q, (documentsSnapshot) => {
        let newChat = [];
        documentsSnapshot.forEach(doc => {
          obj = doc.data()
          newChat.push({id: doc.id, ...obj, createdAt: obj.createdAt.toDate()})
        })
        setMessages(newChat);
      })
      return () => {
        //stops having a loop
        if (unsubChats) unsubChats();
      }
      }, []);

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

    return(
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat messages={messages} renderBubble={renderBubble} onSend={messages => onSend(messages)} user={{userID}}>
            </GiftedChat>
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