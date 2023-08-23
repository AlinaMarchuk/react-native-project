import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeatherIcons from "react-native-vector-icons/Feather";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import PostsScreen from "../Screens/PostsScreen";
import AddSvg from "../assets/addSvg";

const Home = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarLabel: "home",
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="grid" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <AddSvg color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
