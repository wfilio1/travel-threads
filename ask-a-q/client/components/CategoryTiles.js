import { Pressable, StyleSheet, Text, View, Platform } from "react-native";

const CategoryTiles = (props) => {


    return(
        
        <View style={styles.gridItem}>
            <Pressable onPress={props.onPress} android_ripple={{color: "#ccc"}} style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null ]}>
                <View style={styles.innerContainer}>
                    <Text style={styles.tileText}>{props.title}</Text>
                </View>

            </Pressable>

        </View>
    );


}

export default CategoryTiles;

const styles = StyleSheet.create({
    gridItem: {
        flex:1,
        margin: 15,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: "#b5593a",
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height:2},
        shadowRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    button: {
        flex:1,
    },
    buttonPressed: {
        opacity: 0.3,
        backgroundColor: "#C68B59"
    },
    innerContainer: {
        flex:1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    tileText: {
        color: "#e7c9ba",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});