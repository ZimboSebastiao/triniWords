import { Share } from "react-native";

export const shareContent = async (content) => {
  try {
    const result = await Share.share({
      message: content,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // O conteúdo foi compartilhado com um tipo de atividade específico
      } else {
        // O conteúdo foi compartilhado sem um tipo de atividade
      }
    } else if (result.action === Share.dismissedAction) {
      // O compartilhamento foi cancelado
    }
  } catch (error) {
    console.error("Erro ao tentar compartilhar:", error);
  }
};
