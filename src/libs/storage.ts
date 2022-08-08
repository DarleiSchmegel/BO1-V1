import AsyncStorage from "@react-native-async-storage/async-storage";

import uuid from "react-native-uuid";
import { format } from "date-fns";

export interface WeighingProps {
  id: string;
  title: string;
  description: string;
  date?: Date;
}

export interface StorageWeighingProps {
  [id: string]: {
    data: WeighingProps;
  };
}

export async function newWeighing(
  title: string,
  description: string
): Promise<string> {
  try {
    const data = await AsyncStorage.getItem("@BO1:Weighings");
    const oldWeighings = data ? (JSON.parse(data) as StorageWeighingProps) : {};

    const id = String(uuid.v4());
    const date = format(new Date(), "dd/MM/yyyy");
    const newWeighing = {
      [id]: {
        data: {
          id,
          title,
          description,
          date,
        },
      },
    };

    await AsyncStorage.setItem(
      "@BO1:Weighings",
      JSON.stringify({
        ...newWeighing,
        ...oldWeighings,
      })
    );
    console.log("chegou");

    console.log(oldWeighings);
    return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadWeighings(): Promise<WeighingProps[]> {
  try {
    // await AsyncStorage.setItem('@BO1:Weighings', '')
    const data = await AsyncStorage.getItem("@BO1:Weighings");
    const weighings = data ? (JSON.parse(data) as StorageWeighingProps) : {};

    const weighingsSorted = Object.keys(weighings).map((weighing) => {
      return {
        ...weighings[weighing].data,
      };
    });
    console.log("lib", weighings);

    return weighingsSorted;
  } catch (error) {
    throw new Error(error);
  }
}

// export async function removePlant(id: string): Promise<void> {
//     const data = await AsyncStorage.getItem('@plantmanager:plants');
//     const plants = data ? (JSON.parse(data) as StorageWeighingProps) : {};

//     await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
//     delete plants[id];

//     await AsyncStorage.setItem(
//         '@plantmanager:plants', JSON.stringify(plants)
//     );
// }
