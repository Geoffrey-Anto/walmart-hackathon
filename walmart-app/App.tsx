import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./screens/Auth/Auth";
// import AdminNav from "./screens/Navigation/AdminNav";
// import RetailerNav from "./screens/Navigation/RetailerNav";
import ConsumerNav from "./screens/Navigation/ConsumerNav";

export default function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  
  return (
    <NavigationContainer>
      {authenticated ? (
        <ConsumerNav />
      ) : (
        <Auth setAuthenticated={setAuthenticated} />
      )}
    </NavigationContainer>
  );
}
