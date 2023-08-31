import { StyleSheet, Text, View, Pressable } from "react-native";

const NavBarButtons = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </Pressable>
    );
}

export default NavBarButtons;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#943d24",
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    text: {
        color: "white",
        textAlign: "center"
    }
});