import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { newWeighing, WeighingProps } from "../libs/storage";

interface Params {
  title: string;
}

export function NewWeighingDescription() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params as Params;

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [description, setDescription] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!description);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setDescription(value);
  }

  async function handleSubmit() {
    if (!description)
      return Alert.alert("Coloque uma descrição sobre a pesagem 😄");

    try {
      const date = new Date()
      const id = String(uuid.v4())
      await newWeighing({
        id,
        title,
        description
      });
      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Pesagem criada com sucesso. Agora é só clicar no botão para começar',
        buttonTitle: 'Começar',
        icon: 'hug',
        nextScreen: 'Weighing',
        weighingId: id
    });
    } catch {
      return Alert.alert("Não foi possível Proceguir");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>⚖</Text>

                <Text style={styles.title}>
                  Coloque uma {"\n"} descrição sobre nova pesagem.
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite uma descrição para a pesagem"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              ></TextInput>

              <View style={styles.footer}>
                <Button title="Criar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    width: "100%",
  },

  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },

  header: {
    alignItems: "center",
  },

  emoji: {
    fontSize: 44,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  footer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
});
