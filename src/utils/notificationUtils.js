import * as Notifications from "expo-notifications";

export const scheduleDailyNotification = async (message) => {
  await Notifications.scheduleNotificationAsync({
    content: { title: "Nova Aula Disponível!", body: message },
    trigger: { hour: 9, minute: 0, repeats: true },
  });
};
