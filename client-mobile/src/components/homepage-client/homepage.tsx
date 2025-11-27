import React, { useState, useEffect } from "react";
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

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const [selectedDate] = useState("2025-11-20"); 
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);

  const horariosPossiveis = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const barbeiroId = 123;
  const token = "TOKEN_TEMPORARIO";

  const services = [
    { id: 1, name: "Corte Simples", price: "R$ 25,00", duration: "40 min" },
    { id: 4, name: "Barba Completa", price: "R$ 20,00", duration: "25 min" },
    { id: 5, name: "Corte + Barba", price: "R$ 35,00", duration: "60 min" },
  ];

  const handleSchedule = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalVisible(true);
  };

  const fetchDisponibilidade = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/agendamento/disponibilidade?barbeiroId=${barbeiroId}&data=${selectedDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      const horasFormatadas = data.map((isoString: string) => {
        const date = new Date(isoString);
        return date.toISOString().substring(11, 16);
      });

      setHorariosOcupados(horasFormatadas);
    } catch (error) {
      console.error("Erro ao buscar disponibilidade", error);
    }
  };

  useEffect(() => {
    if (selectedDate && barbeiroId) fetchDisponibilidade();
  }, [selectedDate, barbeiroId]);

  const handleConfirmAgendamento = () => {
    if (!selectedHorario) {
      alert("Selecione um horário antes!");
      return;
    }

    console.log(`Agendado: ${selectedService} às ${selectedHorario}`);
    setModalVisible(false);

  };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="flex-row justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
        <Text className="text-[#FFA62B] text-lg font-semibold">Barbearia Shaveasy</Text>
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
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-[#FFA62B] text-xl font-semibold mb-4">Serviços disponíveis</Text>

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


      <Modal visible={isModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/70 justify-center items-center px-4">
          <View className="bg-zinc-900 w-full max-w-sm p-6 rounded-xl border border-zinc-800">
            <Text className="text-[#FFA62B] text-lg font-semibold mb-3">
              Agendar - {selectedService}
            </Text>

            <Text className="text-zinc-400 mb-2">Selecione um horário:</Text>

            <View className="flex-row flex-wrap gap-2">
              {horariosPossiveis.map((horario) => {
                const isOcupado = horariosOcupados.includes(horario);
                let bgClass = "bg-zinc-800";
                if (isOcupado) {
                  bgClass = "bg-zinc-700 opacity-50";
                } else if (selectedHorario === horario) {
                  bgClass = "bg-blue-600";
                }

                return (
                  <TouchableOpacity
                    key={horario}
                    disabled={isOcupado}
                    onPress={() => setSelectedHorario(horario)}
                    className={`px-3 py-2 rounded-lg ${bgClass}`}
                  >
                    <Text className={isOcupado ? "text-zinc-500" : "text-white"}>
                      {horario} {isOcupado ? "(ocupado)" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="flex-row justify-end mt-6 gap-3">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 bg-zinc-700 rounded-lg"
              >
                <Text className="text-white">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmAgendamento}
                className="px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
