import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export interface ClientsModalProps {
visible: boolean;
onClose: () => void;
}


export default function ClientsModal({ visible, onClose }: ClientsModalProps) {
if (!visible) return null;


const clients = [
{ id: "1", nome: "Dionésio Batalha", telefone: "(81) 98888-1111" },
{ id: "2", nome: "Richardson Tiburcio", telefone: "(81) 97777-2222" },
{ id: "3", nome: "Clóvis Rocha", telefone: "(81) 96666-3333" },
];


return (
<View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
<View className="bg-zinc-900 w-full rounded-2xl p-5 max-h-[80%]">
<Text className="text-2xl font-bold text-[#FFA62B] text-center mb-4">
Meus Clientes
</Text>


<ScrollView>
{clients.map((c) => (
<View
key={c.id}
className="bg-[#1F1F1F] p-4 rounded-xl mb-3 border border-[#FFA62B]"
>
<Text className="text-white text-lg font-bold">{c.nome}</Text>
<Text className="text-gray-300">Telefone: {c.telefone}</Text>
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