import React from "react";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

//  import {Welcome} from './src/pages/Welcome';
//  import {UserIdentification} from './src/pages/UserIdentification';
import Routes from "./src/routes";

const App = () => {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  //return <Welcome />;
  // return <UserIdentification/>
  return <Routes />;
};

export default App;
