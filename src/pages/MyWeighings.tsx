import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList, Alert, SafeAreaView } from "react-native";
import { loadWeighings, WeighingProps } from "../libs/storage";
// import { formatDistance } from "date-fns/esm";
// import { ptBR } from "date-fns/locale";

import { Header } from "../components/Header";
// import { PlantCardSecondary } from "../components/PlantCardSecondary";
// import { Load } from "../components/Load";

// import waterdrop from "../assets/waterdrop.png";
import colors from "../styles/colors";
import { WeighingCard } from "../components/WeighingCard";
import { ScrollView } from "react-native-gesture-handler";

export function MyWeighings() {
  const [myWeighings, setMyWeighings] = useState<WeighingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  // function handleRemove(plant: PlantProps) {
  //     Alert.alert('Remover', `Deseja remover ${plant.name}`, [
  //         {
  //             text: 'Não', style: 'cancel'
  //         },
  //         {
  //             text: 'Sim',
  //             onPress: async () => {
  //                 try {
  //                     await removePlant(plant.id);
  //                     setMyPlants((oldData) => (
  //                         oldData.filter((item) => item.id != plant.id)
  //                     ));
  //                 } catch (error) {
  //                     Alert.alert('Não foi possível remover!');
  //                 }
  //             }
  //         }
  //     ])
  // }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadWeighings();

      setMyWeighings(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  // if (loading)
  //     return <Load />

  return (
  
      

      
    
    <View style={styles.container}>
      <Header />
      {/* <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View> */}
      <View style={styles.plants}>
        {/* <Text style={styles.plantsTitle}>Próximas regadas</Text> */}
      {/* <ScrollView > */}
        
        <FlatList
          data={myWeighings}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            // <WeighingCard data={item} handleRemove={() => {handleRemove(item)}} />
            <WeighingCard
              data={{
                id: item.id,
                title: item.title,
                date: item.date,
              }}
              handleRemove={() => {
                // handleRemove(item);
              }}
            />
          )}
        // scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 50 }}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 20,
    marginBottom:20,
    backgroundColor: colors.background,
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.heading,
    paddingHorizontal: 20,
  },

  plants: {
    flex: 1,
    width: "100%",
    marginBottom: 65,
  },

  plantsTitle: {
    fontSize: 24,
    color: colors.heading,
    marginVertical: 20,
  },
});
