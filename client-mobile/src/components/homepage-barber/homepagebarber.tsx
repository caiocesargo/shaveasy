import React from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useRouter } from "expo-router";

export default function BarberHome() {
  const router = useRouter();

  // Simulação de agendamentos do barbeiro
  const agendamentos = [
    { id: "1", cliente: "Dionésio Batalha", horario: "09:00", servico: "Corte de cabelo", status: "Confirmado" },
    { id: "2", cliente: "Richardson Tiburcio", horario: "10:30", servico: "Barba completa", status: "Cancelado" },
    { id: "3", cliente: "Clóvis Rocha", horario: "13:00", servico: "Corte + Barba", status: "Confirmado" },
  ];

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Título */}
        <Text className="text-3xl font-bold text-[#FFA62B] mb-4 text-center">
          Painel do Barbeiro
        </Text>

        {/* Subtítulo */}
        <Text className="text-base text-gray-300 text-center mb-6">
          Gerencie seus horários e serviços com facilidade.
        </Text>

        {/* Seção de agendamentos */}
        <Text className="text-xl font-bold text-[#FFA62B] mb-3">
          Próximos Agendamentos
        </Text>

        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-[#1F1F1F] rounded-xl p-4 mb-3 border border-[#FFA62B]">
              <Text className="text-[#FFA62B] font-bold text-lg">{item.cliente}</Text>
              <Text className="text-gray-300">🕒 {item.horario}</Text>
              <Text className="text-gray-300">💈 {item.servico}</Text>
              <Text
                className={`font-bold mt-1 ${
                  item.status === "Confirmado"
                    ? "text-green-400"
                    : "text-red-500"
                }`}
              >
                {item.status}
              </Text>
            </View>
          )}
        />

        {/* Botões principais */}
        <View className="mt-6 space-y-4">
          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => router.push("/barbeiro/agenda")}
          >
            <Text className="text-black text-center font-bold text-lg">
              📅 Ver Agenda Completa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => router.push("/barbeiro/servicos")}
          >
            <Text className="text-black text-center font-bold text-lg">
              ✂️ Gerenciar Serviços
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => router.push("/barbeiro/clientes")}
          >
            <Text className="text-black text-center font-bold text-lg">
              👥 Meus Clientes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => router.push("/barbeiro/perfil")}
          >
            <Text className="text-black text-center font-bold text-lg">
              ⚙️ Perfil / Configurações
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
