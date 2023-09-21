import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";

const NavBarButtons = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>{props.text}</Text>
            </View>

        </TouchableOpacity>
            
    );
}

export default NavBarButtons;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#933b1e",
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    text: {
        color: "white",
        textAlign: "center"
    }
});