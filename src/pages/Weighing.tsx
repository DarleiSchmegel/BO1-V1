import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, SafeAreaView, View, Text, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useRoute } from "@react-navigation/native";
import { WeighingProps } from "../libs/storage";

interface Params {
  weighingId: string;
}

const emojis = {
  hug: "🤗",
  smile: "😄",
};

export interface StorageWeighingProps {
  [id: string]: {
    data: WeighingProps;
  };
}

export function Weighing() {
  const navigation = useNavigation();
  const routes = useRoute();

  const { weighingId } = routes.params as Params;

  const [weighings, setWeighings] = useState<WeighingProps>();

  async function getWeighing() {
    try {
      const data = await AsyncStorage.getItem("@BO1:Weighings");
      const weighings = data ? (JSON.parse(data) as StorageWeighingProps) : {};

      console.log("ID", weighings[weighingId]);
      setWeighings(weighings[weighingId].data);
    } catch {
      return Alert.alert("Não foi possível salvar o seu nome");
    }
  }
  useEffect(() => {
    getWeighing();
  }, [weighingId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {weighings && (
          <>
            <Text style={styles.title}>{weighings.title}</Text>

            <Text style={styles.subtitle}>{weighings.description}</Text>
            <Text style={styles.title}>{String(weighings.date)}</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 20,
    color: colors.heading,
  },

  emoji: {
    fontSize: 78,
  },

  footer: {
    width: "100%",
    paddingHorizontal: 75,
    marginTop: 20,
  },
});
