import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração padrão para a notificação
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NOTIFICATION_KEY = "dailyLearnNotification";

const scheduleLearnNotification = async () => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Data no formato YYYY-MM-DD
    const lastNotificationDate = await AsyncStorage.getItem(NOTIFICATION_KEY);

    if (lastNotificationDate === today) {
      console.log("Notificação já enviada hoje.");
      return; // Não agenda outra notificação
    }

    // Agenda uma notificação para ser enviada imediatamente
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Aprenda uma nova palavra! 📚",
        body: "Clique aqui para expandir seu vocabulário com a palavra do dia!",
        data: { screen: "LearnScreen" }, // Dados para navegação
      },
      trigger: null, // Enviar imediatamente
    });

    // Armazena a data da notificação enviada
    await AsyncStorage.setItem(NOTIFICATION_KEY, today);
    console.log("Notificação agendada com sucesso.");
  } catch (error) {
    console.error("Erro ao agendar notificação:", error);
  }
};

export default scheduleLearnNotification;
