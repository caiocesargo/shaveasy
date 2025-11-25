import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface ServiceManagementModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ServiceManagementModal({ visible, onClose }: ServiceManagementModalProps) {
  if (!visible) return null;

  const services = [
    { id: "1", nome: "Corte Simples", preco: "R$ 25,00", tempo: "30 min" },
    { id: "2", nome: "Barba Completa", preco: "R$ 20,00", tempo: "25 min" },
    { id: "3", nome: "Corte + Barba", preco: "R$ 35,00", tempo: "45 min" },
  ];

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
      <View className="bg-zinc-900 w-full rounded-2xl p-5 max-h-[80%]">
        <Text className="text-2xl font-bold text-[#FFA62B] text-center mb-4">
          Gerenciar Serviços
        </Text>

        <ScrollView>
          {services.map((item) => (
            <View
              key={item.id}
              className="bg-[#1F1F1F] p-4 rounded-xl mb-3 border border-[#FFA62B]"
            >
              <Text className="text-white text-lg font-bold">{item.nome}</Text>
              <Text className="text-gray-300">Preço: {item.preco}</Text>
              <Text className="text-gray-300 mb-2">Duração: {item.tempo}</Text>

              <View className="flex-row gap-3 mt-2">
                <TouchableOpacity className="flex-1 bg-[#FFA62B] p-2 rounded-xl">
                  <Text className="text-center font-bold text-black">Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-red-600 p-2 rounded-xl">
                  <Text className="text-center font-bold text-white">Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          className="bg-zinc-700 p-3 rounded-xl mt-4"
          onPress={onClose}
        >
          <Text className="text-center text-white text-lg font-bold">Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
