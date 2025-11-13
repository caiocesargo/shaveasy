import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomePageBarber() {
  const router = useRouter();

  // Simulação de agendamentos
  const agendamentos = [
    { id: '1', cliente: 'João Silva', servico: 'Corte de cabelo', horario: '09:00' },
    { id: '2', cliente: 'Pedro Lima', servico: 'Barba completa', horario: '10:30' },
    { id: '3', cliente: 'Lucas Souza', servico: 'Corte + Barba', horario: '13:00' },
  ];

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-2">Bem-vindo, Barbeiro!</Text>
      <Text className="text-gray-600 mb-6">Gerencie seus horários e atendimentos.</Text>

      {/* Lista de agendamentos */}
      <Text className="text-lg font-semibold mb-2">Agendamentos de hoje</Text>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 p-4 mb-3 rounded-lg">
            <Text className="text-base font-semibold">{item.cliente}</Text>
            <Text className="text-sm text-gray-700">{item.servico}</Text>
            <Text className="text-sm text-gray-500">{item.horario}</Text>
          </View>
        )}
      />

      {/* Botões de navegação */}
      <Text className="text-lg font-semibold mt-6 mb-2">Ações rápidas</Text>
      <View className="flex-row flex-wrap justify-between">
        <TouchableOpacity
          className="bg-black p-4 rounded-lg w-[48%] mb-3"
          onPress={() => router.push('/barbeiro/perfil')}
        >
          <Text className="text-white text-center font-semibold">Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black p-4 rounded-lg w-[48%] mb-3"
          onPress={() => router.push('/barbeiro/clientes')}
        >
          <Text className="text-white text-center font-semibold">Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black p-4 rounded-lg w-[48%] mb-3"
          onPress={() => router.push('/barbeiro/servicos')}
        >
          <Text className="text-white text-center font-semibold">Serviços</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black p-4 rounded-lg w-[48%]"
          onPress={() => router.push('/barbeiro/agenda')}
        >
          <Text className="text-white text-center font-semibold">Agenda</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
