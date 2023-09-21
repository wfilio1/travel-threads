import { StyleSheet, View, Text } from "react-native";
import NavBarButtons from "./NavBarButtons";
import AuthContext from "../context/AuthContext"
import { useContext } from "react";


const Navbar = (props) => {

    const auth = useContext(AuthContext);

    const onPressHome = () => {
        props.navigation.navigate("Home");
    }

    const onPressQuestionForm = () => {
        props.navigation.navigate("Question Form", {questionId: 0});
    }


    const onPressMyPosts = () => {
        props.navigation.navigate("My Posts");
    }

    const onPressLogin = () => {
        props.navigation.navigate("Login");
    }

    const onPressLogOut = () => {
        auth.logout();
        props.navigation.navigate("Home");
    }

    const renderAuthButton = () => {
        if (auth.user) {
          return (
            <>
            <View style={styles.nav}>
                <NavBarButtons text="Ask a Q!" onPress={onPressQuestionForm} />
            </View>

            <View style={styles.nav}>
                <NavBarButtons text="My Threads" onPress={onPressMyPosts} />
            </View>

            <View style={styles.nav}>
                <NavBarButtons text="Logout" onPress={onPressLogOut} />
            </View>
            </>
          );

        } else if (!auth.user) {
          return (
            <View style={styles.nav}>
                <NavBarButtons text="Login" onPress={onPressLogin} />
            </View>
            
          );
        }
        return null;
      };



    return(
        <View style={styles.navBtnContainer}>
            <View style={styles.nav}>
                <NavBarButtons text="Travel Threads" onPress={onPressHome} />
            </View>

            {renderAuthButton()}
            
        </View>
    );
}

export default Navbar;

const styles = StyleSheet.create({
    navBtnContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",

    },
    nav: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#933b1e",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }

});