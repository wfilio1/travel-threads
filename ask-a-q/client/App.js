import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navbar from './components/Navbar';
import DiscussionBoard from './screens/DiscussionBoard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyPost from './screens/MyPost';
import Login from './screens/Login';
import { useEffect, useState } from 'react';
import QuestionPage from './screens/QuestionPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // Import jwt-decode or your preferred JWT decoding library
import AuthContext from './context/AuthContext';
import Categories from './screens/Categories';
import QuestionForm from './screens/QuestionForm';

const Stack = createNativeStackNavigator();

const LOCAL_STORAGE_TOKEN_KEY = "appUserToken";

export default function App() {
  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    // Attempt to restore the user's token from AsyncStorage
    const restoreToken = async () => {
      try {
        const token = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (token) {
          setUser(login(token));
        }
      } catch (error) {
        console.error("Error restoring token:", error);
      } finally {
        setRestoreLoginAttemptCompleted(true);
      }
    };

    restoreToken();
  }, []);

  const login = (token) => {
    // Store the token in AsyncStorage
    AsyncStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    // Decode token (you might use a library like jwt-decode for this)
    const { sub: username, authorities: authoritiesString } = jwtDecode(token);

    // Split the authorities string into an array of roles
    const roles = authoritiesString.split(',');

    // Create the 'user' object
    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      },
    };

    setUser(user);
    
    return user;
  };

  const logout = () => {
    // Remove the token from AsyncStorage
    AsyncStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);

    // Clear the user state
    setUser(null);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout,
  };

  if (!restoreLoginAttemptCompleted) {
    //  can show a loading screen or return null while attempting to restore login.
    return null;
  }
    
  return (
    <AuthContext.Provider value={auth}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer> 
          <Stack.Navigator
            screenOptions={{
              header: (props) => <Navbar {...props} />,
            }}
          >
            <Stack.Screen name="Home" component={Categories} />
            <Stack.Screen name="Question Form" component={QuestionForm} />
            <Stack.Screen name="Discussion Board" component={DiscussionBoard} />
            <Stack.Screen name="My Posts" component={MyPost} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Question" component={QuestionPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#ef9273"
  },
  discussionContainer: {
    flex: 3,
  }
});
