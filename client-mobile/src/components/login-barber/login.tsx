import React, { useState } from "react";
import { useRouter } from "expo-router";
import { EyeOff, Eye } from "lucide-react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import { validateEmail } from "../../utils/valideEmail";
// import { validatePassword } from "../../utils/validePassword";

export default function LoginBarbeiro() {
  const router = useRouter();
  // const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  // const { valid } = validateEmail(email);
  // const { valid: validPassword } = validatePassword(senha);

  const isLoginDisabled = email === "" || senha === "";

  const handlePressLogin = async () => {
  router.push("/homepagebarber");
};

  // const handlePressLogin = async () => {
  //   if (isLoginDisabled) return;

  //   try {
  //     if (!valid || !validPassword) {
  //       setError("Credenciais inválidas");
  //     } else {
  //       // Redireciona para a tela inicial do barbeiro
  //       router.push("/barbeiro/home");
  //     }
  //   } catch (err) {
  //     setError("Erro ao fazer login");
  //     console.log("Erro na requisição", err);
  //   }
  // };

  return (
    <View className="flex-1 bg-zinc-900">
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-4xl font-bold text-[#E8B923] mb-8 text-center">
          Bem-vindo, Barbeiro!
        </Text>

        <Text className="text-lg text-[#E8B923] text-center mb-6 px-4">
          Acesse sua conta profissional para gerenciar seus agendamentos.
        </Text>

        <TextInput
          placeholder="Email profissional"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
          className="w-72 h-12 bg-[#E8B923] text-black rounded-lg font-bold px-4 mb-3"
        />

        {/* Campo de senha */}
        <View className="w-72 flex-row items-center bg-[#E8B923] px-2 mb-3 rounded-lg">
          <TextInput
            placeholder="Senha"
            placeholderTextColor="black"
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={setSenha}
            className="flex-1 h-12 text-black font-bold px-2"
          />
          <TouchableOpacity
            className="pr-4"
            onPress={() => setSenhaVisivel((prev) => !prev)}
          >
            {senhaVisivel ? (
              <EyeOff size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>

        {/* {error !== "" && <Text className="text-red-500 mb-4">{error}</Text>} */}

        <View className="flex-row space-x-4 justify-between w-72 ">
          <TouchableOpacity
            className="px-4 py-4 rounded-lg shadow-md bg-[#E8B923]"
            onPress={() => router.push("/register")}
          >
            <View className="flex-row items-center">
              <Text className="text-black font-bold">Cadastre-se</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-4 rounded-lg shadow-md ${
              isLoginDisabled ? "bg-[#E8B923]" : "bg-[#E8B923]"
            }`}
            disabled={isLoginDisabled}
            onPress={handlePressLogin}
          >
            <View className="flex-row items-center">
              <Text className="text-black font-bold">Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
