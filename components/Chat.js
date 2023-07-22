import { useEffect } from 'react';
import { Button, StyleSheet, Text, View, } from 'react-native';

const Chat = ({ route, navigation }) => {

    const {name} = route.params;
    const {color} = route.params;

    useEffect(() => {
        navigation.setOptions({title: name});
        navigation.setOptions({backgroundColor: color});
    }, []);

    return(
        <View style={[styles.container, {backgroundColor: color}]}>
            <Text>Hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Chat;