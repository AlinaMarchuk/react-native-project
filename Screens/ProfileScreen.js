import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Map from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { auth, colPubs } from "../firebase/config";
import { useEffect } from "react";
import { getAllPublicationsDB } from "../firebase/operations";
import {
  chosePub,
  clearUser,
  getAllPubs,
} from "../redux/rootReducer/rootSlice";
import { signOut } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const displayName =
    useSelector((state) => state.user.displayName) ||
    useSelector((state) => state.user.email);

  const pubs = useSelector((state) => state.pubs);
  const state = useSelector((state) => state.chosenPub);
  console.log("pubs:", pubs);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.log("logout Error:", error);
    }
  };

  const handleComment = (item) => {
    dispatch(chosePub(item));
    navigation.navigate("CommentScreen");
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
      <ImageBackground
        source={require("../assets/photobg.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.content}>
          <TouchableHighlight onPress={handleLogout}>
            <Icon
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{
                position: "absolute",
                top: 22,
                right: 16,
              }}
            />
          </TouchableHighlight>
          <Image
            resizeMode={"cover"}
            source={require("../assets/avatar-source.jpeg")}
            style={{
              width: 120,
              height: 120,
              top: -60,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 8,
            }}
          ></Image>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: "#212121",
              marginTop: -40,
            }}
          >
            {displayName}
          </Text>
          <FlatList
            style={{ marginTop: 20 }}
            data={pubs}
            renderItem={({ item }) => (
              <View style={styles.item}>
                {console.log("image", item.image)}
                <Image
                  style={styles.image}
                  source={{ uri: item.image }}
                ></Image>
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
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 147,
    borderTopLeftRadius: 25,
    backgroundColor: "#FFF",
    flex: 1,
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
