import * as Notifications from "expo-notifications";

// Função para pedir permissão de notificações
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

// Função para agendar a notificação diária
export async function scheduleDailyNotification() {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  // Cancela notificações anteriores para evitar duplicações
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Agenda a notificação para às 8h diariamente
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Good Morning! 🌞",
      body: "Let's learn a new word! 📚",
      data: { screen: "LearnScreen" }, // Tela de destino ao clicar na notificação
    },
    trigger: {
      hour: 8, // 8h da manhã
      minute: 0,
      repeats: true, // Repetir diariamente
    },
  });

  console.log("Notificação diária agendada para às 8h!");
}
