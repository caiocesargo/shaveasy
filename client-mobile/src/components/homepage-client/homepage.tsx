import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  const services = [
    { id: 1, name: "Corte Social", price: "R$ 00,00", duration: "30 min" },
    { id: 2, name: "Corte Degradê", price: "R$ 00,00", duration: "40 min" },
    { id: 3, name: "Corte Máquina", price: "R$ 00,00", duration: "20 min" },
    { id: 4, name: "Barba Simples", price: "R$ 00,00", duration: "30 min" },
    { id: 5, name: "Cabelo e Barba", price: "R$ 00,00", duration: "60 min" },
  ];

  const handleSchedule = (serviceName: string) => {
    // futuramente podemos redirecionar para a tela de agendamento
    console.log(`Agendar: ${serviceName}`);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Navbar fixa */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
        <Text className="text-white text-lg font-semibold">Barbearia Shaveasy</Text>
        <View className="flex-row space-x-6">
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/meus-agendamentos")}>
            <Text className="text-zinc-300 font-medium">Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Informações da barbearia */}
        <View className="mb-6">
          <Text className="text-2xl font-semibold text-white mb-2">
            Barbearia Shaveasy
          </Text>
          <Text className="text-zinc-400 mb-1">
            Rua das Flores, 123 - Centro, Olinda/PE
          </Text>
          <Text className="text-zinc-400 mb-3">
            Funcionamento: terça à sábado, das 9h às 18h
          </Text>
          <Text className="text-zinc-300">
            Bem-vindo à Barbearia Shaveasy! Aqui tradição e estilo se encontram.
            Oferecemos cortes modernos e atendimento de qualidade, garantindo uma
            experiência única em cada visita.
          </Text>
        </View>

        {/* Lista de serviços */}
        <View className="mt-4">
          <Text className="text-white text-xl font-semibold mb-4">
            Serviços disponíveis
          </Text>

          {services.map((service) => (
            <View
              key={service.id}
              className="flex-row justify-between items-center bg-zinc-900 rounded-2xl px-4 py-3 mb-3"
            >
              <View>
                <Text className="text-white text-base font-medium">
                  {service.name}
                </Text>
                <Text className="text-zinc-400 text-sm">
                  {service.price} • {service.duration}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleSchedule(service.name)}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-medium">Agendar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
