import * as Notifications from "expo-notifications";

export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  console.log("Permissão atual:", status);
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    console.log("Nova permissão:", newStatus);
    if (newStatus !== "granted") {
      alert("As notificações precisam ser ativadas nas configurações.");
      return false;
    }
  }
  return true;
}
