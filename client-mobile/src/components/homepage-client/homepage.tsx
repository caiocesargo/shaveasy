"use client";

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, StatusBar } from "react-native";
import { Phone } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth, useBarbearia, useDisponibilidade } from "../../hooks";

const horariosPossiveis = [
  "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00",
  "17:00", "18:00"
];

export default function HomePage() {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate] = useState("2025-11-20");
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);

  const barbeiroId = 123;

  const { data: authData } = useAuth();

  const { data: barbeariaData } = useBarbearia({ 
    token: authData?.token || null 
  });  

  const { horariosOcupados } = useDisponibilidade({
    barbeiroId,
    selectedDate,
    token: authData?.token || null,
  });

  // Redirecionamento simples
  if (!authData) {
    router.replace("/");
    return null;
  }

  const barbearia = barbeariaData?.barbearia;
  
  interface ApiService {
    id: string;
    nome: string;
    preco: number;
    duracao_min: number;
    barbeariaId: string;
  }
  
  interface Service {
    id: string;
    nome: string;
    preco: string;
    duracao: string;
  }
  
  const services: Service[] = barbearia?.servicos?.map((service: ApiService) => ({
    id: service.id,
    nome: service.nome,
    preco: service.preco.toString(),
    duracao: service.duracao_min.toString(),
  })) || [];

  const handleSchedule = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalVisible(true);
  };

  const handleConfirmAgendamento = () => {
    if (!selectedHorario) return;
    // TODO: Implementar lógica de agendamento
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />
      
      {/* Header com gradiente e sombra */}
      <View className="px-6 pt-14 pb-6 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-zinc-400 text-sm">Bem-vindo à</Text>
            <Text className="text-[#FFA62B] text-2xl font-bold">
              {barbearia?.nome || "Shaveasy"}
            </Text>
          </View>
          
          <View className="bg-[#FFA62B]/10 p-3 rounded-full">
            <Text className="text-[#FFA62B] text-2xl">✂️</Text>
          </View>
        </View>

        {/* Navigation */}
        <View className="flex-row justify-center space-x-8 mt-4 gap-2">
          <TouchableOpacity className="bg-[#FFA62B] px-6 py-3 rounded-full">
            <Text className="text-black font-semibold">Início</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push("/agendamentosclient")}
            className="bg-zinc-700/50 px-6 py-3 rounded-full border border-zinc-600"
          >
            <Text className="text-[#FFA62B] font-medium">Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      
      {/* Conteúdo */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Card de Informações da Barbearia */}
        <View className="mx-6 mt-6 mb-8">
          <View className="bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700/50 shadow-2xl">
            <View className="flex-row items-center mb-4">
              <View className="bg-[#FFA62B]/20 p-2 rounded-full mr-3">
                <Text className="text-[#FFA62B] text-xl">📍</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                  {barbearia?.endereco || "Endereço não informado"}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="bg-[#FFA62B]/20 p-2 rounded-full mr-3">
                <Text className="text-[#FFA62B] text-xl">🕒</Text>
              </View>
              <Text className="text-zinc-300 text-base">
                Funcionamento: Terça à Sábado, 9h - 18h
              </Text>
            </View>
            <View className="flex-row items-center mb-4">
              <View className="bg-[#FFA62B]/20 p-2 rounded-full mr-3">
                <Phone color="white" />
              </View>
              <Text className="text-zinc-300 text-base">
                Contato: {barbearia?.telefone || "Telefone não informado"}
              </Text>
            </View>

            <View className="bg-[#FFA62B]/10 rounded-xl p-4 mt-2">
              <Text className="text-[#FFA62B] text-center font-medium">
                Experiência premium em cortes e cuidados masculinos
              </Text>
            </View>
          </View>
        </View>


        {/* Seção de Serviços */}
        <View className="mx-6">
          <View className="flex-row items-center mb-6">
            <View className="bg-[#FFA62B] w-1 h-8 rounded-full mr-3" />
            <Text className="text-white text-2xl font-bold">
              Nossos Serviços
            </Text>
          </View>

          {services.length > 0 ? (
            services.map((service: Service) => (
              <View
                key={service.id}
                className="bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-2xl p-5 mb-4 border border-zinc-700/30 shadow-xl"
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1 mr-4">
                    <Text className="text-white text-lg font-semibold mb-1">
                      {service.nome}
                    </Text>
                    <View className="flex-row items-center">
                      <View className="bg-green-500/20 px-2 py-1 rounded-full mr-2">
                        <Text className="text-green-400 text-sm font-medium">
                          R$ {service.preco}
                        </Text>
                      </View>
                      <View className="bg-blue-500/20 px-2 py-1 rounded-full">
                        <Text className="text-blue-400 text-sm font-medium">
                          {service.duracao} min
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleSchedule(service.nome)}
                    className="bg-gradient-to-r from-[#FFA62B] to-orange-500 px-6 py-3 rounded-xl shadow-lg"
                  >
                    <Text className="text-black font-bold">Agendar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700/50">
              <View className="items-center">
                <View className="bg-zinc-700/50 p-4 rounded-full mb-4">
                  <Text className="text-4xl">✂️</Text>
                </View>
                <Text className="text-white text-lg font-semibold mb-2">
                  Serviços em breve
                </Text>
                <Text className="text-zinc-400 text-center">
                  Estamos preparando nossos melhores serviços para você. 
                  Em breve você poderá agendar seus cortes favoritos!
                </Text>
              </View>
            </View>
          )}
        </View>

      </ScrollView>


      {/* Modal de Agendamento */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black/80 justify-end">
          <View className="bg-zinc-900 rounded-t-3xl p-6 border-t-2 border-[#FFA62B]/20">
            
            {/* Header do Modal */}
            <View className="items-center mb-6">
              <View className="w-12 h-1 bg-zinc-600 rounded-full mb-4" />
              <Text className="text-white text-xl font-bold mb-1">
                Agendar Serviço
              </Text>
              <Text className="text-[#FFA62B] text-lg font-medium">
                {selectedService}
              </Text>
            </View>

            {/* Seleção de Horário */}
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-3">
                Horários disponíveis:
              </Text>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="mb-2"
              >
                <View className="flex-row gap-3 px-1">
                  {horariosPossiveis.map((horario) => {
                    const isOcupado = horariosOcupados.includes(horario);
                    const isSelected = selectedHorario === horario;

                    return (
                      <TouchableOpacity
                        key={horario}
                        disabled={isOcupado}
                        onPress={() => setSelectedHorario(horario)}
                        className={`px-4 py-3 rounded-xl min-w-20 items-center ${
                          (() => {
                            if (isOcupado) return "bg-red-900/30 border border-red-500/30";
                            if (isSelected) return "bg-[#FFA62B] border border-[#FFA62B]";
                            return "bg-zinc-800 border border-zinc-600";
                          })()
                        }`}
                      >
                        <Text 
                          className={`font-semibold ${
                            (() => {
                              if (isOcupado) return "text-red-400";
                              if (isSelected) return "text-black";
                              return "text-white";
                            })()
                          }`}
                        >
                          {horario}
                        </Text>
                        {isOcupado && (
                          <Text className="text-red-400 text-xs mt-1">
                            Ocupado
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            {/* Botões de Ação */}
            <View className="flex-row gap-3 mt-4">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 py-4 bg-zinc-700 rounded-xl border border-zinc-600"
              >
                <Text className="text-white text-center font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmAgendamento}
                disabled={!selectedHorario}
                className={`flex-1 py-4 rounded-xl ${
                  selectedHorario 
                    ? "bg-gradient-to-r from-[#FFA62B] to-orange-500" 
                    : "bg-zinc-600"
                }`}
              >
                <Text 
                  className={`text-center font-bold ${
                    selectedHorario ? "text-black" : "text-zinc-400"
                  }`}
                >
                  Confirmar Agendamento
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}