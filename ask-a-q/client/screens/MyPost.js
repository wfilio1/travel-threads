import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from "../context/AuthContext";
import LinkText from "../components/LinkText";

const MyPost = () => {

  const auth = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const [postCount, setPostCount] = useState(0);

  const navigation = useNavigation();

  const loadPosts = () => {
    const url = "http://localhost:8080/api/question/personal"
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + auth.user.token,
                },
              })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch personal posts');
        }
    })
    .then(data => {
        setPosts(data);
    })
    .catch(error => {
        console.error(error);
    });
};

    useEffect(() => {
      loadPosts();
    }, [])

    useEffect(() => {
      const fetchAnswers = async () => {
        try {
          for (const q of posts) {
            const response = await fetch(`http://localhost:8080/api/answer/${q.questionId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch answers');
            }
            const data = await response.json();
            // Update the postCount for the specific question
            setPostCount(prevPostCount => ({
              ...prevPostCount,
              [q.questionId]: data.length,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchAnswers();
    }, [posts]);

    return(
        <View style={styles.container}>
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <Text style={styles.forumHeader}>My Threads</Text>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.topicHeader}>
                      <Text style={styles.textHeader}>Questions</Text>
                  </View>

                  <View style={styles.tablePostHeader}>
                      <Text style={{...styles.textHeader, justifyContent: "flex-end"}}># of Answers</Text>
                  </View>
                </View>
                
                {posts.map(q => 
                <View style={styles.tableRow}>
                  <View style={styles.tableTopicRegular}>
                    <LinkText style={styles.textLineItem} text={q.questionTitle} onPress={() => { navigation.navigate("Question", {questionId: q.questionId})} } />
                </View>
                
                  <View style={styles.tablePostCount}>
                      <Text style={{...styles.textLineItem, justifyContent: "flex-end"}}>{postCount[q.questionId]}</Text>
                  </View>
               </View>
                )}
                 
            </View>
    </View>
    )
}

export default MyPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 10,
      },
      tableContainer: {
        flex: 1,
      },
      tableRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      },
      topicHeader: {
        flex: 3,
        flexDirection: "row",
        backgroundColor: "#de6c46",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      tableTopicRegular: {
        flex: 3,
        flexDirection: "column",
        backgroundColor: "#cd9475",
        alignItems: "center",
        height: 60,
        padding: 5,
        flexWrap: "wrap",
      },
      tablePostHeader: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#de6c46",
        height: 25,
        alignItems: "center",
        justifyContent: "center"
      },
      tablePostCount: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#D7B19D",
        alignItems: "center",
        height: 60,
        padding: 5
      },
      forumHeader: {
        color: "#9d4b30",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
      },
      textHeader: {
        color: "white"
      },
      textLineItem: {
        color: "black"
      }
});