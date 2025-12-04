import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { authUtils } from "../../utils/auth";
import { useAuth, useBarbearia } from "../../hooks";


interface ProfileSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileSettingsModal({ visible, onClose }: ProfileSettingsModalProps) {
  const router = useRouter();
  const { data: authData } = useAuth();
  const { data: barbeariaData } = useBarbearia({
    token: authData?.token || null,
  });

  const barbearia = barbeariaData?.barbearia;

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (barbearia) {
      setNome(barbearia.nome || "");
      setEndereco(barbearia.endereco || "");
      setTelefone(barbearia.telefone || "");
    }
  }, [barbearia]);

  if (!visible) return null;

  const handleLogOut = () => {
    authUtils.logout();
    onClose();
    router.replace("/");
  }

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
      <View className="bg-zinc-900 w-full rounded-2xl p-5 max-h-[85%]">
        <Text className="text-2xl font-bold text-[#FFA62B] text-center mb-4">
          Perfil & Configurações
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Nome */}
          <Text className="text-gray-300 mb-1">Nome da Barbearia</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4"
            placeholder="Nome da barbearia"
            placeholderTextColor="#888"
            value={nome}
            onChangeText={setNome}
          />

          {/* Endereço */}
          <Text className="text-gray-300 mb-1">Endereço</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4"
            placeholder="Endereço da barbearia"
            placeholderTextColor="#888"
            value={endereco}
            onChangeText={setEndereco}
          />

          {/* Telefone */}
          <Text className="text-gray-300 mb-1">Telefone</Text>
          <TextInput
            className="bg-[#1F1F1F] text-white p-3 rounded-xl mb-4"
            placeholder="(XX) XXXXX-XXXX"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <TouchableOpacity className="bg-red-600 p-3 rounded-xl mb-4" onPress={handleLogOut}>
            <Text className="text-white text-center font-semibold">Sair da conta</Text>
          </TouchableOpacity>

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
