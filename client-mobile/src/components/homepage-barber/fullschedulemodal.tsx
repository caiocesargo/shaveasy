import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";

type FullScheduleModalProps = {
  visible: boolean;
  onClose: () => void;
};

const weeklySchedule = [
  { id: "1", client: "Dionésio Batalha", time: "Seg • 09:00", status: "confirmado" },
  { id: "2", client: "Richardson Tiburcio", time: "Ter • 10:30", status: "cancelado" },
  { id: "3", client: "Clóvis Rocha", time: "Qua • 13:00", status: "confirmado" },
  { id: "4", client: "Pablo Henrique", time: "Qui • 15:30", status: "cancelado" },
  { id: "5", client: "Lucas Silva", time: "Sex • 11:00", status: "confirmado" },
  { id: "6", client: "Mateus Oliveira", time: "Sáb • 14:00", status: "cancelado" },
  { id: "7", client: "Felipe Costa", time: "Dom • 16:30", status: "confirmado" },
];

export default function FullScheduleModal({ visible, onClose }: FullScheduleModalProps) {
  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="w-11/12 bg-zinc-900 rounded-xl p-5">

          <Text className="text-xl font-bold text-[#FFA62B] mb-4 text-center">
            Agenda Completa da Semana
          </Text>

          <ScrollView className="max-h-[70%]">
            {weeklySchedule.map((item) => (
              <View
                key={item.id}
                className="p-4 rounded-lg mb-3 bg-zinc-800 border border-[#FFA62B]"
              >
                <Text className="text-[#FFA62B] font-bold text-lg">{item.client}</Text>
                <Text className="text-gray-300">{item.time}</Text>

                <Text
                  className={`mt-2 font-bold ${
                    item.status === "confirmado" ? "text-green-400" : "text-red-500"
                  }`}
                >
                  {item.status === "confirmado" ? "Confirmado" : "Cancelado"}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Botão fechar */}
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-[#FFA62B] p-3 rounded-lg items-center"
          >
            <Text className="text-black font-semibold">Fechar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}
