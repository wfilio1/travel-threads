import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navbar from './components/Navbar';
import DiscussionBoard from './screens/DiscussionBoard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyPost from './screens/MyPost';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
    
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer> 
        <Stack.Navigator
          screenOptions={{
            header: (props) => <Navbar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={DiscussionBoard} />
          <Stack.Screen name="My Posts" component={MyPost} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:60,
    backgroundColor: "#ef9273"
  },
  discussionContainer: {
    flex:3,
  }
});
