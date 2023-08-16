import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function StoreScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Store Screen</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function CartScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Cart Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function AdminNav() {
  const AdminTabs = [
    { name: "Manage Staff", component: StoreScreen, icon: "account-multiple" },
    { name: "Manage Stock", component: SearchScreen, icon: "database-plus" },
    { name: "Home", component: HomeScreen, icon: "home" },
    { name: "Analytics", component: CartScreen, icon: "chart-line" },
    { name: "Profile", component: ProfileScreen, icon: "account" },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#007CC2"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      {AdminTabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.name,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name={tab.icon} color={color} size={26} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
