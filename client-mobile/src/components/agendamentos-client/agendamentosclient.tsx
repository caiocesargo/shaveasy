import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";

/**
 * Tela "Meus Agendamentos" (cliente)
 * - lista apenas agendamentos futuros
 * - permite cancelar um agendamento (remove do state)
 * - mantém estilo alinhado ao resto do app (fundo escuro, tailwind)
 */

type Appointment = {
  id: string;
  service: string;
  datetimeISO: string; // ISO string (ex: "2025-11-30T14:00:00")
  barber?: string;
  price?: string;
};

export default function AgendamentosClient() {
  const router = useRouter();

  // MOCK: dados iniciais (vai vir do back depois)
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: "1", service: "Corte Simples", datetimeISO: "2025-11-26T15:00:00", barber: "Lucas", price: "R$ 25,00" },
    { id: "2", service: "Barba Simples", datetimeISO: "2025-10-10T10:00:00", barber: "João", price: "R$ 25,00" }, // passado
    { id: "3", service: "Corte + Barba", datetimeISO: "2025-12-05T09:00:00", barber: "Carlos", price: "R$ 35,00" },
  ]);

  // filtra apenas futuros (comparação com now)
  const upcoming = useMemo(() => {
    const now = new Date();
    return appointments.filter((a) => new Date(a.datetimeISO) > now).sort((a, b) => +new Date(a.datetimeISO) - +new Date(b.datetimeISO));
  }, [appointments]);

  const handleCancel = (id: string) => {
    const appt = appointments.find((a) => a.id === id);
    if (!appt) return;

    Alert.alert(
      "Confirmar cancelamento",
      `Cancelar "${appt.service}" em ${new Date(appt.datetimeISO).toLocaleString()} ?`,
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: () => {
            setAppointments((prev) => prev.filter((p) => p.id !== id));
            // futuramente: chamar endpoint DELETE /agendamentos/:id
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Appointment }) => {
    const dt = new Date(item.datetimeISO);
    return (
      <View className="bg-zinc-900 rounded-2xl px-4 py-3 mb-3 flex-row justify-between items-center">
        <View>
          <Text className="text-[#FFA62B] font-medium text-base">{item.service}</Text>
          <Text className="text-zinc-400 text-sm">
            {dt.toLocaleDateString()} • {dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
          {item.barber ? <Text className="text-zinc-400 text-sm">Barbeiro: {item.barber}</Text> : null}
        </View>

        <View className="items-end">
          <Text className="text-zinc-400 text-sm mb-2">{item.price ?? "—"}</Text>
          <TouchableOpacity
            onPress={() => handleCancel(item.id)}
            className="bg-red-600 px-3 py-2 rounded-lg"
          >
            <Text className="text-white font-medium text-sm">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Navbar fixa simples */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
        <Text className="text-[#FFA62B] text-lg font-semibold">Barbearia Shaveasy</Text>
        <View className="flex-row space-x-6">
          <TouchableOpacity onPress={() => router.push("/homepage")}>
            <Text className="text-[#FFA62B] font-medium">Início</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[#FFA62B] font-medium">Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 pt-6">
        <Text className="text-2xl font-semibold text-[#FFA62B] mb-4">Meus Agendamentos</Text>

        {upcoming.length === 0 ? (
          <View className="mt-8">
            <Text className="text-zinc-400">Você não tem agendamentos futuros.</Text>
            <Text className="text-zinc-400 mt-2">Faça um agendamento na página inicial.</Text>
          </View>
        ) : (
          <FlatList
            data={upcoming}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </View>
  );
}
