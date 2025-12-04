import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Calendar, Scissors, Users, Settings } from "lucide-react-native";
import { useAuth, useAgendamentos } from "../../hooks";
import FullScheduleModal from "./fullschedulemodal";
import ServiceManagementModal from "./servicemanagementmodal";
import ClientsModal from "./clientsmodal";
import ProfileSettingsModal from "./profilesettingsmodal";

export default function BarberHome() {
  const router = useRouter();
  const [openAgenda, setOpenAgenda] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openClients, setOpenClients] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const { data: authData } = useAuth();
  const { agendamentos } = useAgendamentos(authData?.token || null);

  const proximosAgendamentos = (agendamentos.data || [])
    .filter((a: { status: string }) => a.status === 'confirmado')
    .slice(0, 3);

  return (
    <View className="flex-1 bg-zinc-950">
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header */}
      <View className="px-6 pt-14 pb-6 bg-zinc-900 border-b border-zinc-800">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-zinc-400 text-sm">Bem-vindo de volta</Text>
            <Text className="text-[#FFA62B] text-2xl font-bold">
              {authData?.user?.nome || 'Barbeiro'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cards de Ações Rápidas */}
        <View className="px-6 mt-6">
          <Text className="text-white text-lg font-semibold mb-4">Ações Rápidas</Text>
          
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              className="bg-zinc-800 rounded-2xl p-4 mb-4 border border-zinc-700 w-[48%]"
              onPress={() => setOpenAgenda(true)}
            >
              <View className="p-3 rounded-full self-start mb-3">
                <Calendar color="#FFA62B" size={24} />
              </View>
              <Text className="text-white font-semibold text-base">Agenda</Text>
              <Text className="text-zinc-400 text-sm">Ver completa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-zinc-800 rounded-2xl p-4 mb-4 border border-zinc-700 w-[48%]"
              onPress={() => setOpenServices(true)}
            >
              <View className="p-3 rounded-full self-start mb-3">
                <Scissors color="#FFA62B" size={24} />
              </View>
              <Text className="text-white font-semibold text-base">Serviços</Text>
              <Text className="text-zinc-400 text-sm">Gerenciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-zinc-800 rounded-2xl p-4 mb-4 border border-zinc-700 w-[48%]"
              onPress={() => setOpenClients(true)}
            >
              <View className="p-3 rounded-full self-start mb-3">
                <Users color="#FFA62B" size={24} />
              </View>
              <Text className="text-white font-semibold text-base">Clientes</Text>
              <Text className="text-zinc-400 text-sm">Visualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-zinc-800 rounded-2xl p-4 mb-4 border border-zinc-700 w-[48%]"
              onPress={() => setOpenProfile(true)}
            >
              <View className="p-3 rounded-full self-start mb-3">
                <Settings color="#FFA62B" size={24} />
              </View>
              <Text className="text-white font-semibold text-base">Perfil</Text>
              <Text className="text-zinc-400 text-sm">Configurações</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Próximos Agendamentos */}
        <View className="px-6 mt-2">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="bg-[#FFA62B] w-1 h-6 rounded-full mr-3" />
              <Text className="text-white text-lg font-semibold">Próximos Agendamentos</Text>
            </View>
            <TouchableOpacity onPress={() => setOpenAgenda(true)}>
              <Text className="text-[#FFA62B] text-sm">Ver todos</Text>
            </TouchableOpacity>
          </View>

          {proximosAgendamentos.length > 0 ? (
            <FlatList
              data={proximosAgendamentos}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const dataAgendamento = new Date(item.dataHora);
                return (
                  <TouchableOpacity
                    className="bg-zinc-800 rounded-2xl p-4 mb-3 border border-zinc-700"
                    onPress={() => router.push(`/agendamento/${item.id}`)}
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
                        item.status === "confirmado" ? "bg-green-500" : "bg-red-500"
                      }`}>
                        <Text className={`text-xs font-semibold ${
                          item.status === "confirmado" ? "text-green-800" : "text-red-400"
                        }`}>
                          {item.status === "confirmado" ? "Confirmado" : item.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 items-center">
              <View className="bg-zinc-700 p-4 rounded-full mb-4">
                <Calendar color="#FFA62B" size={32} />
              </View>
              <Text className="text-white text-lg font-semibold mb-2">
                Nenhum agendamento
              </Text>
              <Text className="text-zinc-400 text-center">
                Você não possui agendamentos confirmados no momento.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <FullScheduleModal visible={openAgenda} onClose={() => setOpenAgenda(false)} />
      <ServiceManagementModal visible={openServices} onClose={() => setOpenServices(false)} />
      <ClientsModal visible={openClients} onClose={() => setOpenClients(false)} agendamentos={agendamentos.data || []} />
      <ProfileSettingsModal visible={openProfile} onClose={() => setOpenProfile(false)} />
    </View>
  );
}
