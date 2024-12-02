import * as Notifications from "expo-notifications";
import { requestNotificationPermissions } from "./notificationsRequest";
export async function scheduleDailyNotification() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good Morning! 🌞",
        body: "Let's learn a new word! 📚",
        data: { screen: "LearnScreen" },
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
      // trigger: { seconds: 1 },
    });

    console.log("Notificação diária agendada para às 8h!");
  } catch (error) {
    console.error("Erro ao agendar a notificação:", error);
  }
}
