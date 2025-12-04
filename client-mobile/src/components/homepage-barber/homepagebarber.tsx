import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import  {useRouter}  from "expo-router";
import { useAuth, useAgendamentos } from "../../hooks";
import FullScheduleModal from "./fullschedulemodal";
import ServiceManagementModal from "./servicemanagementmodal";
import  ClientsModal from "./clientsmodal";
import ProfileSettingsModal from "./profilesettingsmodal";

export default function BarberHome() {
  const router = useRouter();
  const [openAgenda, setOpenAgenda] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openClients, setOpenClients] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const { data: authData } = useAuth();
  const { agendamentos } = useAgendamentos(authData?.token || null);

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        <Text className="text-3xl font-bold text-[#FFA62B] mb-4 text-center">
          Painel do Barbeiro
        </Text>

        <Text className="text-base text-gray-300 text-center mb-6">
          Gerencie seus horários e serviços com facilidade.
        </Text>

        <Text className="text-xl font-bold text-[#FFA62B] mb-3">
          Próximos Agendamentos
        </Text>

        <FlatList
          data={agendamentos.data || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-[#1F1F1F] rounded-xl p-4 mb-3 border border-[#FFA62B]"
              onPress={() => router.push(`/agendamento/${item.id}`)}
            >
              <Text className="text-[#FFA62B] font-bold text-lg">{item.cliente?.nome || 'Cliente'}</Text>
              <Text className="text-gray-300">{new Date(item.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              <Text className="text-gray-300">{item.servico?.nome || 'Serviço'}</Text>
              <Text
                className={`font-bold mt-1 ${
                  item.status === "confirmado" ? "text-green-400" : "text-red-500"
                }`}
              >
                {item.status === "confirmado" ? "Confirmado" : item.status}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View className="mt-6 space-y-4">

          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => setOpenAgenda(true)}
          >
            <Text className="text-black text-center font-bold text-lg">
              Ver Agenda Completa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => setOpenServices(true)}

          >
            <Text className="text-black text-center font-bold text-lg">
              Gerenciar Serviços
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => setOpenClients(true)}
          >
            <Text className="text-black text-center font-bold text-lg">
              Meus Clientes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FFA62B] py-4 rounded-xl"
            onPress={() => setOpenProfile(true)}
            
          >
            <Text className="text-black text-center font-bold text-lg">
              Perfil / Configurações
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      <FullScheduleModal visible={openAgenda} onClose={() => setOpenAgenda(false)} />
      <ServiceManagementModal visible={openServices}onClose={() => setOpenServices(false)}/>
      <ClientsModal visible={openClients} onClose={() => setOpenClients(false)} agendamentos={agendamentos.data || []} />
      <ProfileSettingsModal visible={openProfile} onClose={() => setOpenProfile(false)} /> 
  </View>
  );
}
