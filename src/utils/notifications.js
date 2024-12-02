import * as Notifications from "expo-notifications";
import { requestNotificationPermissions } from "./notificationsRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function scheduleDailyNotification() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  try {
    // Verificar se a notificação já foi agendada
    const notificationScheduled = await AsyncStorage.getItem(
      "notificationScheduled"
    );

    if (notificationScheduled === "true") {
      console.log("Notificação diária já foi agendada.");
      return; // Não agenda novamente
    }

    // Cancelar notificações agendadas anteriores
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Agendar nova notificação
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Let's learn! 👩‍🏫",
        body: "Let's learn a new word today! 📚",
        data: { screen: "LearnScreen" },
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });

    // Marcar que a notificação foi agendada
    await AsyncStorage.setItem("notificationScheduled", "true");

    console.log("Notificação diária agendada para às 8h!");
  } catch (error) {
    console.error("Erro ao agendar a notificação:", error);
  }
}
