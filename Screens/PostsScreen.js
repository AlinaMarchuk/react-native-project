import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
} from "react-native";
import ExitSvg from "../assets/exitSvg";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { clearUser, getAllPubs } from "../redux/rootReducer/rootSlice";
import { getAllPublicationsDB } from "../firebase/operations";
import { useEffect } from "react";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Map from "react-native-vector-icons/Feather";

const PostsScreen = () => {
  const dispatch = useDispatch();

  const pubs = useSelector((state) => state.pubs);
  console.log("pubs", pubs);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.log("Logout error:", error);
    }
    console.log("logout", auth.currentUser);
  };

  const getAllPublications = async () => {
    const pubsArr = await getAllPublicationsDB();
    dispatch(getAllPubs(pubsArr));
    console.log("pubsArr:", pubsArr);
  };

  useEffect(() => {
    getAllPublications();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Публікації</Text>
        <TouchableHighlight onPress={handleLogout}>
          <ExitSvg />
        </TouchableHighlight>
      </View>
      <View style={styles.body}>
        <View style={styles.photoBox}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
            }}
            source={require("../assets/rectangle.png")}
          />
          <View styles={styles.photoInfo}>
            <Text>Natali Romanova</Text>
            <Text>email@example.com</Text>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          data={pubs}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {console.log("image", item.image)}
              <Image style={styles.image} source={{ uri: item.image }}></Image>
              <Text style={styles.itemTitle}>{item.title}</Text>

              <View style={{ flexDirection: "row" }}>
                <View style={styles.itemInfo}>
                  <TouchableHighlight
                    onPress={() => {
                      handleComment(item);
                    }}
                  >
                    <IconMaterial name="chat" size={24} color="#FF6C00" />
                  </TouchableHighlight>

                  <Text style={{ marginLeft: 0 }}>8</Text>
                </View>
                <View style={styles.itemInfo}>
                  <IconAntDesign name="like2" size={24} color="#FF6C00" />
                  <Text style={{ marginLeft: 0 }}>8</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    position: "absolute",
                    right: 10,
                  }}
                >
                  <Map name="map-pin" size={16} color="#BDBDBD" />
                  <Text style={{ marginLeft: 0 }}>
                    {item.city ? item.city : "Unknown"}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 88,
    background: "#FFF",
    justifyContent: "center",
    backdropFilter: "blur(13.591408729553223px)",
    shadowColor: "rgba(0, 0, 0, 0.30)",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 1,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Roboto",
    marginHorizontal: "auto",
    marginTop: 44,
    paddingHorizontal: 48,
    paddingVertical: 11,
    fontSize: 17,
  },
  body: {
    height: 640,
  },
  photoBox: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 16,
    marginTop: 32,
  },
  photoInfo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    height: "100%",
  },
  footer: {
    height: 83,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  item: {
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 240,
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemTitle: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "normal",
  },
  itemInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
  },
});
