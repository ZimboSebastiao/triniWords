import * as Notifications from "expo-notifications";

export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      alert("As notificações precisam ser ativadas nas configurações.");
      return false;
    }
  }
  return true;
}

export async function scheduleDailyNotification() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

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
  });

  console.log("Notificação diária agendada para às 8h!");
}
