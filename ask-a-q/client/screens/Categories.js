import { FlatList, StyleSheet, Text, View } from "react-native";
import CategoryTiles from "../components/CategoryTiles";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Categories = () => {

    const auth = useContext(AuthContext);

    const categoryMapping = {
      1: { name: "General Travel Questions", id: 1 },
      2: { name: "Destination-specific", id: 2 },
      3: { name: "Travel Planning and Tips", id: 3 },
      4: { name: "Accommodation and Transportation", id: 4 },
      5: { name: "Travel Experiences and Stories", id: 5 },
    };
  
    const categoryArray = Object.values(categoryMapping);

    const navigation = useNavigation();

    const discussionBoardHandler = (id) => {
        navigation.navigate("Discussion Board", { id });
    }
  
    const renderCategoryItem = (itemData) => {
      return <CategoryTiles title={itemData.item.name} onPress={() => discussionBoardHandler(itemData.item.id) } />;
    };
  
    return (
        <View style={styles.outerContainer}>
            <View style={styles.titleContainer}>
                {auth.user && <Text style={styles.authText}>Welcome, {auth.user.username}!</Text>}
                <Text style={styles.titleText}>Start your travel discussion by choosing a category below:</Text>
            </View>

            <FlatList
            data={categoryArray}
            keyExtractor={(item) => item.id.toString()} // 
            renderItem={renderCategoryItem}
            numColumns={2}
        />
        </View>
            
    );
  };
  

export default Categories;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 30,
        margin: 5,
    },
    titleContainer: {
        alignItems: "center",
    },
    authText: {
        color: "#68220a",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
    },
    titleText: {
        color: "#9d4b30",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },

});