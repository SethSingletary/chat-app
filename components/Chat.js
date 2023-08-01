import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useEffect, useState, useCallback } from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View, } from 'react-native';

const Chat = ({ route, navigation }) => {

    const [messages, setMessages] = useState([]);

    const renderBubble = (props) => {
        return <Bubble {...props} wrapperStyle={{ right: { backgroundColor: "#000" }, left: { backgroundColor: "#FFF" } }}/>
    }

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: 'This is a system message',
            createdAt: new Date(),
            system: true,
          },
        ]);
      }, []);

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
    
/** 
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])
    */

    const {name} = route.params;
    const {color} = route.params;

    useEffect(() => {
        navigation.setOptions({title: name});
        navigation.setOptions({backgroundColor: color});
    }, []);

    return(
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat messages={messages} renderBubble={renderBubble} onSend={messages => onSend(messages)} user={{_id: 1}}>
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