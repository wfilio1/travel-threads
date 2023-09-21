import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignIn } from 'expo-google-app-auth';

const GoogleButton = () => {

const navigation = useNavigation();

    const URI = "http://localhost:3030/google";

    const GOOGLE_CLIENT_ID = "823796018324-hc6vig7b3862r9hgvdl1hahqcono3l3d.apps.googleusercontent.com";

    const handlePress = async () => {
        try {
          const result = await GoogleSignIn.signInAsync()
    
          if (result.type === 'success') {
            // You can access user information here:
            const { user } = result;
            console.log('Google user data:', user);
            // You can navigate to the next screen or perform other actions here
          } else {
            console.error('Google authentication failed:', result);
          }
        } catch (error) {
          console.error('Google authentication error:', error);
        }
      };

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={handlePress}
      >
        <View style={styles.circle}>
          <Text style={styles.text}>G</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#be674a",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});