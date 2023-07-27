import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';


const Start = ({navigation}) => {

    const background = require('../assets/BackgroundImage.png');

    const [name, setName] = useState("");
    const [color, setColor] = useState("");

    return(
            <View style={styles.container}>
                <ImageBackground source={background} resizeMode='cover' style={styles.image}>
                    <View>
                        <Text style={styles.title}>App Title</Text>
                    </View>
                    <View>
                        <TextInput value={name} onChangeText={setName} placeholder='Your name' style={styles.input}></TextInput>
                        <Text style={styles.backgroundText}>Choose Background Color:</Text>
                        <View style={styles.colorButtons}>
                            <TouchableOpacity style={[styles.color1, styles.colors]} onPress={() => setColor(styles.color1.backgroundColor)}><Text></Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.color2, styles.colors]} onPress={() => setColor(styles.color2.backgroundColor)}><Text></Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.color3, styles.colors]} onPress={() => setColor(styles.color3.backgroundColor)}><Text></Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.color4, styles.colors]} onPress={() => setColor(styles.color4.backgroundColor)}><Text></Text></TouchableOpacity>
                        </View>
                        <Button title='Start Chatting' onPress={() => navigation.navigate('Chat', {name: name, color: color})} style={styles.startChatting}></Button>
                    </View>
                    </ImageBackground>
            </View>
        );
    }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      resizeMode: "center",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center",
    },
    colorButtons: {
        flexDirection: "row",
    },
    colors: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    color1: {
        backgroundColor: "#090C08",
    },
    color2: {
        backgroundColor: "#474056",
    },
    color3:  { 
        backgroundColor: "#8A95A5",
    },
    color4: {
        backgroundColor: "#B9C6AE",
    },
    title: {
        fontSize: 45,
        fontWeight: 600,
        color: "#FFFFFF",
    },
    input: {
        fontSize: 16,
        color: "#757083",
    },
    backgroundText: {
       fontSize: 16,
       color: "#757083",
    },
    startChatting: {
        fontSize: 16,
        color: "#FFFFFF",
        backgroundColor: "#757083",
    },


  });

export default Start;