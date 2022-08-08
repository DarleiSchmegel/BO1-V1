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

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { newWeighing, WeighingProps } from "../libs/storage";

export function NewWeighing() {
  const navigation = useNavigation();
  const route = useRoute();

  const [isFocused, setIsFocused] = useState<boolean[]>([false, false]);
  const [isFilled, setIsFilled] = useState<boolean[]>([false, false]);
  const [title, setTitle] = useState<string>();

  const [description, setDescription] = useState<string>();

  function handleInputBlur(indexOF: number) {
    const aux = isFocused;
    aux[indexOF] = false;
    setIsFocused(aux.map((a) => a));
    setIsFilled([!!title, !!description]);
  }

  function handleInputFocus(indexOF: number) {
    const aux = isFocused;
    aux[indexOF] = true;
    setIsFocused(aux.map((a) => a));
  }

  function handleInputChange(value: string, indexOF: number) {
    const aux = isFilled;
    aux[indexOF] = !!value;
    setIsFilled(aux.map((a) => a));
    setIsFilled([!!title, !!description]);

    if (indexOF === 0) setTitle(value);
    if (indexOF === 1) setDescription(value);
  }

  async function handleSubmit() {
    if (!description)
      return Alert.alert("Coloque uma descrição sobre a pesagem 😄");
    if (!title) return Alert.alert("Coloque um titulo 😄");
    try {
      const id = await newWeighing(title, description);
        
      if(id){
        navigation.navigate("Confirmation", {
          title: "Tudo certo",
          subtitle:
            "Pesagem criada com sucesso. Agora é só clicar no botão para começar",
          buttonTitle: "Começar",
          icon: "hug",
          nextScreen: "Weighing",
          weighingId: id,
        });
      }
    } catch (err) {
      console.log(err);
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
                <Text style={styles.title}>Nova Pesagem</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (!!isFocused[0] || !!isFilled[0]) && {
                    borderColor: colors.green,
                  },
                ]}
                placeholder="Titulo"
                onBlur={() => handleInputBlur(0)}
                // onFocus={handleInputFocusTitle}
                onFocus={() => handleInputFocus(0)}
                onChangeText={(value) => handleInputChange(value, 0)}
              ></TextInput>
              <TextInput
                style={[
                  styles.input,
                  (isFocused[1] || isFilled[1]) && {
                    borderColor: colors.green,
                  },
                ]}
                placeholder="Descrição"
                onBlur={() => handleInputBlur(1)}
                // onFocus={handleInputFocusDescription}

                onFocus={() => handleInputFocus(1)}
                onChangeText={(value) => handleInputChange(value, 1)}
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
