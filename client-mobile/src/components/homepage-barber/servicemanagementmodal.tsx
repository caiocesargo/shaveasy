import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useAuth, useBarbearia } from "../../hooks";

interface ServiceManagementModalProps {
  visible: boolean;
  onClose: () => void;
}

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
  tempo: string;
}

export default function ServiceManagementModal({ visible, onClose }: ServiceManagementModalProps) {
  if (!visible) return null;
  
  const { data: authData } = useAuth();
  const { data: barbeariaData, refetch, isLoading: isFetching } = useBarbearia({
    token: authData?.token || null,
  });
  
    useEffect(() => {
      if (visible) {
        // Recarrega a barbearia sempre que o modal for aberto
        refetch?.();
      }
    }, [visible, refetch]);

  const barbearia = barbeariaData?.barbearia;

  const services: Service[] =
    barbearia?.servicos?.map((service: ApiService) => ({
      id: service.id,
      nome: service.nome,
      preco: `R$ ${Number(service.preco || 0).toFixed(2).replace('.', ',')}`,
      tempo: `${service.duracao_min ?? 0} min`,
    })) || [];

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
      <View className="bg-zinc-900 w-full rounded-2xl p-5 max-h-[80%]">
        <Text className="text-2xl font-bold text-[#FFA62B] text-center mb-4">
          Gerenciar Serviços
        </Text>

        {isFetching ? (
          <View className="items-center p-8">
            <Text className="text-white">Carregando serviços...</Text>
          </View>
        ) : (
          <ScrollView>
            {services.length > 0 ? (
            services.map((item) => (
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
            ))
            ) : (
              <View className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 items-center my-4">
                <Text className="text-4xl mb-3">✂️</Text>
                <Text className="text-white text-lg font-semibold mb-2">
                  Nenhum serviço cadastrado
                </Text>
                <Text className="text-zinc-400 text-center">
                  Comece adicionando um novo serviço para seus clientes
                </Text>
              </View>
            )}
          </ScrollView>
        )}

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
