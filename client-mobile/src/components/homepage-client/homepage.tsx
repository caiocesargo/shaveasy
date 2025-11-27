import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [availableSlots] = useState([
    { day: "Terça-feira", time: "09:00" },
    { day: "Terça-feira", time: "10:00" },
    { day: "Quarta-feira", time: "15:00" },
    { day: "Quinta-feira", time: "14:00" },
  ]);

  const services = [
    { id: 1, name: "Corte Simples", price: "R$ 25,00", duration: "40 min" },
    { id: 4, name: "Barba Completa", price: "R$ 20,00", duration: "25 min" },
    { id: 5, name: "Corte + Barba", price: "R$ 35,00", duration: "60 min" },
  ];

  const handleSchedule = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalVisible(true);
  };

  const handleSlotSelect = (slot: { day: string; time: string }) => {
    console.log(`Agendou ${selectedService} para ${slot.day} às ${slot.time}`);
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="flex-row justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
        <Text className="text-[#FFA62B] text-lg font-semibold">
          Barbearia Shaveasy
        </Text>
        <View className="flex-row space-x-6">
          <TouchableOpacity>
            <Text className="text-[#FFA62B] font-medium">Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/agendamentosclient")}>
            <Text className="text-[#FFA62B] font-medium">Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6">
          <Text className="text-2xl font-semibold text-[#FFA62B] mb-2">
            Barbearia Shaveasy
          </Text>
          <Text className="text-[#FFA62B] mb-1">
            Rua das Flores, 123 - Centro, Olinda/PE
          </Text>
          <Text className="text-[#FFA62B] mb-3">
            Funcionamento: terça à sábado, das 9h às 18h
          </Text>
          <Text className="text-[#FFA62B]">
            Bem-vindo à Barbearia Shaveasy! Aqui tradição e estilo se encontram.
            Oferecemos cortes modernos e atendimento de qualidade.
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-[#FFA62B] text-xl font-semibold mb-4">
            Serviços disponíveis
          </Text>

          {services.map((service) => (
            <View
              key={service.id}
              className="flex-row justify-between items-center bg-zinc-900 rounded-2xl px-4 py-3 mb-3"
            >
              <View>
                <Text className="text-[#FFA62B] text-base font-medium">
                  {service.name}
                </Text>
                <Text className="text-zinc-400 text-sm">
                  {service.price} • {service.duration}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleSchedule(service.name)}
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-medium">Agendar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Horários */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 justify-center items-center">
          <View className="bg-zinc-900 w-11/12 p-5 rounded-lg border border-zinc-800">
            <Text className="text-lg font-semibold text-[#FFA62B] mb-4">
              {selectedService ? `Agendar ${selectedService}` : "Agendar"}
            </Text>

            {availableSlots.map((slot) => (
              <TouchableOpacity
                key={`${slot.day}-${slot.time}`}
                className="bg-zinc-800 p-3 rounded-md mb-2"
                onPress={() => handleSlotSelect(slot)}
              >
                <Text className="text-white">
                  {slot.day} - {slot.time}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="mt-3 p-3 bg-red-500 rounded-md"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
