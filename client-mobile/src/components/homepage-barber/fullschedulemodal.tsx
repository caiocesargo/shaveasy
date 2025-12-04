import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "lucide-react-native";
import { useAuth, useAgendamentos } from "../../hooks";

type FullScheduleModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function FullScheduleModal({ visible, onClose }: FullScheduleModalProps) {
  const { data: authData } = useAuth();
  const { agendamentos } = useAgendamentos(authData?.token || null);

  if (!visible) return null;

  const todosAgendamentos = agendamentos.data || [];

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
      <View className="bg-zinc-900 w-full rounded-2xl p-5 max-h-[85%]">

        <Text className="text-2xl font-bold text-[#FFA62B] mb-4 text-center">
          Agenda Completa
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {todosAgendamentos.length > 0 ? (
            todosAgendamentos.map((item: {
              id: string;
              dataHora: string;
              status: string;
              cliente?: { nome: string };
              servico?: { nome: string };
            }) => {
              const dataAgendamento = new Date(item.dataHora);
              return (
                <View
                  key={item.id}
                  className="bg-zinc-800 rounded-xl p-4 mb-3 border border-zinc-700"
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-lg">
                        {item.cliente?.nome || 'Cliente'}
                      </Text>
                      <Text className="text-[#FFA62B] font-medium mt-1">
                        {item.servico?.nome || 'Serviço'}
                      </Text>
                      <View className="flex-row items-center mt-2">
                        <View className="bg-zinc-700 px-2 py-1 rounded-lg mr-2">
                          <Text className="text-zinc-300 text-sm">
                            {dataAgendamento.toLocaleDateString()}
                          </Text>
                        </View>
                        <View className="px-2 py-1 rounded-lg">
                          <Text className="text-[#FFA62B] text-sm font-medium">
                            {dataAgendamento.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${
                      item.status === "confirmado" ? "bg-green-300" : "bg-red-300"
                    }`}>
                      <Text className={`text-xs font-semibold ${
                        item.status === "confirmado" ? "text-green-800" : "text-red-800"
                      }`}>
                        {item.status === "confirmado" ? "Confirmado" : "Cancelado"}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 items-center my-4">
              <View className="bg-zinc-700 p-4 rounded-full mb-4">
                <Calendar color="#FFA62B" size={32} />
              </View>
              <Text className="text-white text-lg font-semibold mb-2">
                Nenhum agendamento
              </Text>
              <Text className="text-zinc-400 text-center">
                Você não possui agendamentos no momento.
              </Text>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          onPress={onClose}
          className="bg-zinc-700 p-3 rounded-xl mt-4"
        >
          <Text className="text-center text-white text-lg font-bold">Fechar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
