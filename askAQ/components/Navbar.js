import { StyleSheet, View } from "react-native";
import NavBarButtons from "./NavBarButtons";


const Navbar = (props) => {

    //add onPress={} with funcions that handles each btn

    const onPressHome = () => {
        props.navigation.navigate("Home");
    }

    const onPressMyPosts = () => {
        props.navigation.navigate("My Posts");
    }

    const onPressLogin = () => {
        props.navigation.navigate("Login");
    }

    const onPressLogOut = () => {
        props.navigation.navigate("Home");
    }


    return(
        <View style={styles.navBtnContainer}>
            <View style={styles.nav}>
                <NavBarButtons text="Home" onPress={onPressHome} />
            </View>

            <View style={styles.nav}>
                <NavBarButtons text="My Posts" onPress={onPressMyPosts} />
            </View>

            <View style={styles.nav}>
                <NavBarButtons text="Login" onPress={onPressLogin} />
            </View>

            <View style={styles.nav}>
                <NavBarButtons text="Logout" onPress={onPressLogOut} />
            </View>
            
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
        backgroundColor: "#943d24",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }

});