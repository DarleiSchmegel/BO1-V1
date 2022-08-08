import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";
// import { PlantSave } from "../pages/PlantSave";

import colors from "../styles/colors";
import { MyWeighings } from "../pages/MyWeighingsss";
import AuthRoutes from "./tabs.routes";
import { NewWeighingTitle } from "../pages/NewWeighingTitle";
import { NewWeighingDescription } from "../pages/NewWeighingDescription";
import { Weighing } from "../pages/Weighing";
// import AuthRoutes from "./tabs.routes";

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (

    <Stack.Navigator screenOptions={{contentStyle:{ backgroundColor: colors.white}, headerShown:false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="UserIdentification" component={UserIdentification} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
      <Stack.Screen name="MyWeighings" component={AuthRoutes}/>
      <Stack.Screen name="NewWeighingTitle" component={NewWeighingTitle} />
      <Stack.Screen name="NewWeighingDescription" component={NewWeighingDescription} />
      <Stack.Screen name="Weighing" component={Weighing} />
      {/* <Stack.Screen name="PlantSelect" component={AuthRoutes}/>
         <Stack.Screen name="PlantSave" component={PlantSave}/>
         <Stack.Screen name="MyPlants" component={AuthRoutes}/> */}
    </Stack.Navigator>
  // <stackRoutes.Navigator headerMode="none"
  // screenOptions={{
  //     cardStyle: {
  //         backgroundColor: colors.white
  //     },
  // }}>

  //     <stackRoutes.Screen name="Welcome" component={Welcome}/>
  //     <stackRoutes.Screen name="UserIdentification" component={UserIdentification}/>
  //     <stackRoutes.Screen name="Confirmation" component={Confirmation}/>
  //     <stackRoutes.Screen name="PlantSelect" component={AuthRoutes}/>
  //     <stackRoutes.Screen name="PlantSave" component={PlantSave}/>
  //     <stackRoutes.Screen name="MyPlants" component={AuthRoutes}/>

  // </stackRoutes.Navigator>
);

export default AppRoutes;
