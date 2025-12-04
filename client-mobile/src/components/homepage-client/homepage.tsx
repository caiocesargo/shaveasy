"use client";

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from "react-native";
import { Phone, Pin, Clock } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth, useBarbearia, useDisponibilidade, useAgendamentos } from "../../hooks";
import AgendamentoModal from './agendamentoModal';
import { authUtils } from "../../utils/auth";


export default function HomePage() {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate] = useState(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
  );
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = () => {
    authUtils.logout();
    router.replace("/");
  }

  
  const { data: authData } = useAuth();
  
  const { data: barbeariaData } = useBarbearia({ 
    token: authData?.token || null 
  });  

  const barbeiroId = barbeariaData?.barbearia?.usuarios[0]?.id || 0;
  
  const { horariosOcupados } = useDisponibilidade({
    barbeiroId,
    selectedDate,
    token: authData?.token || null,
  });

  const { agendarServico } = useAgendamentos(authData?.token || null);

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

  const handleConfirmAgendamento = async () => {
    if (!selectedHorario || !selectedService || !authData?.token) return;

    const service = services.find(s => s.nome === selectedService);
    if (!service) {
      Alert.alert('Erro', 'Serviço não encontrado.');
      return;
    }

    const dataHora = `${selectedDate}T${selectedHorario}:00`;

    setIsLoading(true);
    try {
      await agendarServico(
        service.id,
        barbeiroId,
        dataHora,
        authData.token
      );

      Alert.alert('Sucesso', 'Agendamento criado com sucesso!', [
        { text: 'OK', onPress: () => {
          setModalVisible(false);
          setSelectedHorario(null);
          setSelectedService(null);
          router.push('/agendamentosclient');
        }}
      ]);
    } catch (error) {
      const err = error as Error;
      Alert.alert('Erro', err.message || 'Erro ao criar agendamento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-zinc-900">
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />
      
      {/* Header com gradiente e sombra */}
      <View className="px-6 pt-14 pb-6 bg-zinc-800">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-zinc-400 text-sm">Bem-vindo à</Text>
            <Text className="text-[#FFA62B] text-2xl font-bold">
              {barbearia?.nome || "Shaveasy"}
            </Text>
          </View>
        </View>

        {/* Navigation */}
        <View className="flex-row justify-center space-x-8 mt-4 gap-2">
          <TouchableOpacity className="bg-[#FFA62B] px-6 py-3 rounded-full">
            <Text className="text-black font-semibold">Início</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push("/agendamentosclient")}
            className="bg-zinc-700 px-6 py-3 rounded-full border border-zinc-600"
          >
            <Text className="text-[#FFA62B] font-medium">Agendamentos</Text>
          </TouchableOpacity>
           <TouchableOpacity 
            onPress={() => handleLogOut()}
            className="bg-zinc-700 px-6 py-3 rounded-full border border-zinc-600"
          >
            <Text className="text-[#FFA62B] font-medium">
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      
      {/* Conteúdo */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Card de Informações da Barbearia */}
        <View className="mx-6 mt-6 mb-8">
          <View className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700/50">
            <View className="flex-row items-center mb-4 gap-2">
              <Pin color="orange" />
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                  {barbearia?.endereco || "Endereço não informado"}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4 gap-2">
             <Clock color="orange" />
              <Text className="text-zinc-200 text-base">
                Funcionamento: Terça à Sábado, 9h - 18h
              </Text>
            </View>
            <View className="flex-row items-center mb-4 gap-2">
              <Phone color="orange" />
              <Text className="text-zinc-200 text-base">
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
                className="bg-zinc-800 rounded-2xl p-5 mb-4 border border-zinc-700"
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
                    className="bg-orange-600 px-6 py-3 rounded-xl"
                  >
                    <Text className="text-black font-bold">Agendar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700">
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

      <AgendamentoModal
        visible={isModalVisible}
        selectedService={selectedService}
        selectedHorario={selectedHorario}
        setSelectedHorario={setSelectedHorario}
        onClose={() => setModalVisible(false)}
        handleConfirmAgendamento={handleConfirmAgendamento}
        isLoading={isLoading}
        horariosOcupados={horariosOcupados}
      />

    </View>
  );
}