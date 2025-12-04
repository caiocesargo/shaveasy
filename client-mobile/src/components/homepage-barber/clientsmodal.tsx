import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";



export interface Agendamento {
	id: string;
	dataHora: string;
	dataHoraFim: string;
	status: string;
	cliente: {
		nome: string;
		telefone: string;
	};
	barbeiro: {
		nome: string;
	};
	servico: {
		nome: string;
	};
}

export interface ClientsModalProps {
	visible: boolean;
	onClose: () => void;
	agendamentos: Agendamento[];
}

export default function ClientsModal({ visible, onClose, agendamentos }: ClientsModalProps) {
if (!visible) return null;

// Extrai clientes únicos a partir dos agendamentos
const clientsMap = new Map<string, { nome: string; telefone: string }>();
(agendamentos || []).forEach((a) => {
	const c = a.cliente;
	if (!c) return;
	const key = `${c.nome}||${c.telefone}`;
	if (!clientsMap.has(key)) {
		clientsMap.set(key, { nome: c.nome, telefone: c.telefone });
	}
});

const clients = Array.from(clientsMap.values());


return (
<View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
<View className="bg-zinc-900 w-full rounded-2xl p-5 max-h-[80%]">
<Text className="text-2xl font-bold text-[#FFA62B] text-center mb-4">
Meus Clientes
</Text>


<ScrollView>
{clients.map((c) => (
<View
key={`${c.nome}||${c.telefone}`}
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