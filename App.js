import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserAvatar from "react-native-user-avatar";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://random-data-api.com/api/v2/users?size=10")
      .then((resp) => {
        if (!resp.ok) throw new Error("Fetch problem!!!");
        return resp.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.userList}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.first_name}</Text>
          <Text style={styles.lastNameText}>{item.last_name}</Text>
        </View>
        <UserAvatar
          size={32}
          name={`${item.first_name} ${item.last_name}`}
          src={item.avatar}
          bgColor="#111"
        />
      </View>
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userList: {
    ...Platform.select({
      ios: {
        flexDirection: "row",
      },
      android: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
      },
    }),
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 10,
      },
      android: {
        flex: 1,
        paddingRight: 20,
      },
    }),
  },
  nameText: {
    ...Platform.select({
      ios: {
        fontWeight: "bold",
        fontSize: 16,
      },
      android: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "right",
      },
    }),
  },
  lastNameText: {
    ...Platform.select({
      ios: {
        fontSize: 14,
        color: "#666",
      },
      android: {
        fontSize: 14,
        color: "#666",
        textAlign: "right",
      },
    }),
  },
});
