import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function App() {
  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpccvURVUmME_iz-iJR3NxREu24PGffl4",
  authDomain: "chat-app-108c0.firebaseapp.com",
  projectId: "chat-app-108c0",
  storageBucket: "chat-app-108c0.appspot.com",
  messagingSenderId: "235445032095",
  appId: "1:235445032095:web:402abd2b5ea38e54673eaa",
  measurementId: "G-9B409Z1M71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start}></Stack.Screen>
        <Stack.Screen name='Chat'>{props => <Chat db={db} {...props}></Chat>}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
