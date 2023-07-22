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
                    <TextInput value={name} onChangeText={setName} placeholder='Your name'></TextInput>
                    <Text>Choose Background Color:</Text>
                    <View style={styles.colorButtons}>
                        <TouchableOpacity style={styles.color1} onPress={() => setColor(styles.color1.backgroundColor)}><Text></Text></TouchableOpacity>
                        <TouchableOpacity style={styles.color2} onPress={() => setColor(styles.color2.backgroundColor)}><Text></Text></TouchableOpacity>
                        <TouchableOpacity style={styles.color3} onPress={() => setColor(styles.color3.backgroundColor)}><Text></Text></TouchableOpacity>
                        <TouchableOpacity style={styles.color4} onPress={() => setColor(styles.color4.backgroundColor)}><Text></Text></TouchableOpacity>
                    </View>
                    <Button title='Start Chatting' onPress={() => navigation.navigate('Chat', {name: name, color: color})}></Button>
                </View>
            </ImageBackground>
        </View>
            );
}

const styles = StyleSheet.create({
    container: {
      flex: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    colorButtons: {
        flexDirection: "row",
    },
    color1: {
        backgroundColor: "blue",
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    color2: {
        backgroundColor: "red",
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    color3:  { 
        backgroundColor: "purple",
        height: 50,
        width: 50,
        borderRadius: 25,

    },
    color4: {
        backgroundColor: "pink",
        height: 50,
        width: 50,
        borderRadius: 25,
    },
  });

export default Start;