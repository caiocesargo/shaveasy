import React from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";

interface ProfileSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileSettingsModal({ visible, onClose }: ProfileSettingsModalProps) {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
      <View className="bg-zinc-900 w-full rounded-2xl p-5 max-h-[85%]">
        <Text className="text-2xl font-bold text-[#FFA62B] text-center mb-4">
          Perfil & Configurações
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Nome */}
          <Text className="text-gray-300 mb-1">Nome</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4"
            placeholder="Seu nome"
            placeholderTextColor="#888"
          />

          {/* Endereço */}
          <Text className="text-gray-300 mb-1">Endereço</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4"
            placeholder="Endereço da barbearia"
            placeholderTextColor="#888"
          />

          {/* Telefone */}
          <Text className="text-gray-300 mb-1">Telefone</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4"
            placeholder="(XX) XXXXX-XXXX"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />

          {/* Política de Cancelamento */}
          <Text className="text-gray-300 mb-1">Política de Cancelamento</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4 h-24"
            placeholder="Descreva a política..."
            placeholderTextColor="#888"
            multiline
          />

          {/* Tempo mínimo de antecedência */}
          <Text className="text-gray-300 mb-1">Tempo mínimo de antecedência</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4"
            placeholder="Ex: 1 hora"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />

          {/* Botão Salvar */}
          <TouchableOpacity className="bg-[#FFA62B] p-4 rounded-xl mb-4">
            <Text className="text-black text-center text-lg font-bold">Salvar Alterações</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Botão Fechar */}
        <TouchableOpacity className="bg-zinc-700 p-3 rounded-xl" onPress={onClose}>
          <Text className="text-center text-white text-lg font-bold">Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
