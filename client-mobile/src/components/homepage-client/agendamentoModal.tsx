import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const horariosPossiveis = [
  "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00",
  "17:00", "18:00"
];

interface AgendamentoModalProps {
  visible: boolean;
  selectedService: string | null;
  selectedHorario: string | null;
  setSelectedHorario: (horario: string | null) => void;
  onClose: () => void;
  handleConfirmAgendamento: () => void;
  isLoading: boolean;
  horariosOcupados: string[];
}

export default function AgendamentoModal({
  visible,
  selectedService,
  selectedHorario,
  setSelectedHorario,
  onClose,
  handleConfirmAgendamento,
  isLoading,
  horariosOcupados,
}: AgendamentoModalProps) {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 justify-end">
      <View className="bg-zinc-900 rounded-t-3xl p-6 border-t-2 border-[#FFA62B]">

        {/* Header */}
        <View className="items-center mb-6">
          <View className="w-12 h-1 rounded-full bg-zinc-600 mb-4" />
          <Text className="text-white text-xl font-bold mb-1">
            Agendar Serviço
          </Text>
          <Text className="text-[#FFA62B] text-lg font-medium">
            {selectedService}
          </Text>
        </View>

        {/* Horários */}
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
                    className={`px-4 py-3 rounded-xl min-w-20 items-center border ${
                      (() => {
                        if (isOcupado) return "bg-white border-red-500";
                        if (isSelected) return "bg-white border-[#FFA62B]";
                        return "bg-black border-zinc-600";
                      })()
                    }`}
                  >
                    <Text 
                      className={`font-semibold ${
                        (() => {
                          if (isOcupado) return "text-red-500";
                          if (isSelected) return "text-[#FFA62B] font-bold";
                          return "text-white";
                        })()
                      }`}
                    >
                      {horario}
                    </Text>

                    {isOcupado && (
                      <Text className="text-red-500 text-xs mt-1">
                        Ocupado
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Botões */}
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            onPress={onClose}
            className="flex py-2 px-4 rounded-xl border border-zinc-600 bg-zinc-700"
          >
            <Text className="text-white text-center mt-2 font-semibold">
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleConfirmAgendamento}
            disabled={!selectedHorario || isLoading}
            className={`flex-1 py-4 rounded-xl ${
              selectedHorario && !isLoading
                ? "bg-[#FFA62B]"
                : "bg-zinc-600"
            }`}
          >
            <Text 
              className={`text-center font-bold ${
                selectedHorario && !isLoading ? "text-black" : "text-zinc-400"
              }`}
            >
              {isLoading ? 'Agendando...' : 'Confirmar Agendamento'}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}