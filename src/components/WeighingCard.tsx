import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { GestureHandlerRootView, RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
 import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface WeighingProps extends RectButtonProps {
  data: {
    id: string;
    title: string;
    date: Date;
  };
  handleRemove: () => void;
}

export function WeighingCard({ data, handleRemove, ...rest }: WeighingProps) {
  return (
    <GestureHandlerRootView>
    <Swipeable
      overshootRight={true}
      
     
      renderRightActions={() => (
        <GestureHandlerRootView>
          <View>
            <RectButton style={styles.buttonRemove} onPress={()=> console.log("foi")}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </GestureHandlerRootView>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        {/* <SvgFromUri uri={data.photo} width={50} height={50} /> */}

        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>Data</Text>
          <Text style={styles.time}>{String(data.date)}</Text>
        </View>
      </RectButton>
    </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },

  title: {
    flex: 1,
    marginLeft: 10,
    // fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },

  details: {
    alignItems: "flex-end",
  },

  timeLabel: {
    marginTop: 5,
    fontSize: 16,
    // fontFamily: fonts.text,
    color: colors.body_light,
  },

  time: {
    marginTop: 5,
    fontSize: 16,
    // fontFamily: colors.heading,
    color: colors.body_dark,
  },

  buttonRemove: {
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 20,
    paddingLeft: 15,
  },
});
