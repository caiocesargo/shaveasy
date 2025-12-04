import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth, useAgendamentos } from "../../hooks";

type Agendamento = {
  id: string;
  dataHora: string;
  dataHoraFim: string;
  status: string;
  servico: { nome: string };
  barbeiro: { nome: string };
  barbearia: { nome: string };
};

export default function AgendamentosClient() {
  const router = useRouter();
  const { data: authData } = useAuth();
  const { buscarMeusAgendamentos, cancelar } = useAgendamentos(authData?.token || null);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarAgendamentos = useCallback(async () => {
    if (!authData?.token) return;
    
    try {
      const data = await buscarMeusAgendamentos(authData.token);
      setAgendamentos(data);
    } catch (error) {
      const err = error as Error;
      Alert.alert('Erro', err.message || 'Erro ao carregar agendamentos');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [authData?.token, buscarMeusAgendamentos]);

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return agendamentos
      .filter((a) => new Date(a.dataHora) > now && a.status === 'confirmado')
      .sort((a, b) => +new Date(a.dataHora) - +new Date(b.dataHora));
  }, [agendamentos]);

  const handleCancel = (id: string) => {
    const appt = agendamentos.find((a) => a.id === id);
    if (!appt || !authData?.token) return;

    Alert.alert(
      "Confirmar cancelamento",
      `Cancelar "${appt.servico.nome}" em ${new Date(appt.dataHora).toLocaleString()}?`,
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: async () => {
            try {
              await cancelar(id, authData.token);
              Alert.alert('Sucesso', 'Agendamento cancelado com sucesso!');
              carregarAgendamentos();
            } catch (error) {
              const err = error as Error;
              Alert.alert('Erro', err.message || 'Erro ao cancelar agendamento');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    carregarAgendamentos();
  };

  const renderItem = ({ item }: { item: Agendamento }) => {
    const dt = new Date(item.dataHora);
    return (
      <View className="bg-zinc-900 rounded-2xl px-4 py-3 mb-3 flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-[#FFA62B] font-medium text-base">{item.servico.nome}</Text>
          <Text className="text-zinc-400 text-sm">
            {dt.toLocaleDateString()} • {dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
          <Text className="text-zinc-400 text-sm">Barbeiro: {item.barbeiro.nome}</Text>
          <Text className="text-zinc-500 text-xs">{item.barbearia.nome}</Text>
        </View>

        <View className="items-end">
          <View className={`px-2 py-1 rounded-full mb-2 ${
            item.status === 'confirmado' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <Text className={`text-xs font-medium ${
              item.status === 'confirmado' ? 'text-green-400' : 'text-red-400'
            }`}>
              {item.status === 'confirmado' ? 'Confirmado' : 'Cancelado'}
            </Text>
          </View>
          {item.status === 'confirmado' && (
            <TouchableOpacity
              onPress={() => handleCancel(item.id)}
              className="bg-red-600 px-3 py-2 rounded-lg"
            >
              <Text className="text-white font-medium text-sm">Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (!authData) {
    router.replace("/");
    return null;
  }

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="flex-row justify-between items-center px-6 py-4 pt-14 bg-zinc-900 border-b border-zinc-800">
        <Text className="text-[#FFA62B] text-lg font-semibold">Shaveasy</Text>
        <View className="flex-row space-x-6 gap-4">
          <TouchableOpacity onPress={() => router.push("/homepage")}>
            <Text className="text-zinc-400 font-medium">Início</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[#FFA62B] font-medium">Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 pt-6 flex-1">
        <Text className="text-2xl font-semibold text-[#FFA62B] mb-4">Meus Agendamentos</Text>

        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFA62B" />
            <Text className="text-zinc-400 mt-4">Carregando agendamentos...</Text>
          </View>
        )}

        {!isLoading && upcoming.length === 0 && (
          <View className="mt-8">
            <Text className="text-zinc-400">Você não tem agendamentos futuros.</Text>
            <Text className="text-zinc-400 mt-2">Faça um agendamento na página inicial.</Text>
            <TouchableOpacity 
              onPress={() => router.push("/homepage")}
              className="bg-[#FFA62B] px-6 py-3 rounded-xl mt-6 self-start"
            >
              <Text className="text-black font-semibold">Agendar agora</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && upcoming.length > 0 && (
          <FlatList
            data={upcoming}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );
}
