import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/AntDesign";
import Photo from "react-native-vector-icons/MaterialIcons";
import Map from "react-native-vector-icons/Feather";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Formik } from "formik";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { geoConverter } from "../helpers/geoConverter";
import uploadImageAsync from "../helpers/uploadImage";
import { addPublicationDB } from "../firebase/operations";
import { addPub } from "../redux/rootReducer/rootSlice";
import { useDispatch } from "react-redux";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [realAdress, setRealAdress] = useState("");
  const dispatch = useDispatch();

  console.log("location:", location);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);
      console.log("coords", coords);
      const res = await geoConverter(coords);
      setRealAdress(res);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Створити публікацію</Text>
          <Icon
            name="arrowleft"
            size={24}
            color="#212121"
            style={{
              position: "absolute",
              top: 54,
              left: 16,
            }}
          />
        </View>
        {image ? (
          <View style={styles.photoContainer}>
            <TouchableOpacity
              style={styles.svgContainerAfterPhoto}
              onPress={() => setImage(null)}
            >
              <Photo name="photo-camera" size={18} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></Image>
          </View>
        ) : (
          <Camera style={styles.photoContainer} type={type} ref={setCameraRef}>
            <TouchableOpacity
              style={styles.svgContainer}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                  setImage(uri);
                  console.log(uri);
                }
              }}
            >
              <Photo name="photo-camera" size={18} color="#BDBDBD" style={{}} />
            </TouchableOpacity>
          </Camera>
        )}

        <Text
          style={{
            marginLeft: 16,
            marginTop: 8,
            color: "#BDBDBD",
            fontSize: 16,
          }}
        >
          {image ? "Редагувати фото" : "Завантажте фото"}
        </Text>

        <Formik
          initialValues={{ title: "" }}
          onSubmit={async ({ title }) => {
            try {
              const imgUrl = await uploadImageAsync(image);
              const data = {
                title,
                image: imgUrl,
                location,
                city: realAdress,
              };
              console.log("imgURL:", imgUrl);
              const newDoc = await addPublicationDB(data);
              dispatch(addPub(data));
              console.log("newDoc:", newDoc);
              navigation.navigate("PostsScreen");
            } catch (error) {
              console.log("Create Post error", error);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
              <Map
                name="map-pin"
                size={16}
                color="#BDBDBD"
                style={{
                  position: "absolute",
                  top: 504,
                  left: 16,
                }}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 19 }]}
                placeholder="Місцевість..."
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                defaultValue={realAdress}
              />
              <Pressable
                style={styles.formButtonNonSubmit}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonTitle}>Опублікувати</Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    height: 88,
    backgroundColor: "#FFF",
    justifyContent: "center",
    backdropFilter: "blur(13.591408729553223px)",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerText: {
    // color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    marginHorizontal: "auto",
    marginTop: 44,
    paddingHorizontal: 48,
    paddingVertical: 11,
    fontSize: 17,
  },
  photoContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainerAfterPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    borderRadius: 50,
    position: "absolute",
    top: 90,
    left: (Dimensions.get("window").width - 32) / 2 - 30,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formButtonNonSubmit: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: 343,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
  },
  formButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: 343,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
  },
  buttonTitle: {
    fontSize: 16,
    lineHeight: 21,
    color: "#BDBDBD",
  },
  camera: { flex: 1 },
});
