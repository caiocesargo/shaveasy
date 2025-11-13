import React, { useState } from "react";
import { useRouter } from "expo-router";
import { EyeOff, Eye } from "lucide-react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import { validateEmail } from "../../utils/valideEmail";
// import { validatePassword } from "../../utils/validePassword";

export default function Login() {
  const router = useRouter();
  // const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  // const { valid } = validateEmail(email);
  // const { valid: validPassword } = validatePassword(senha);

  const isLoginDisabled = email === "" || senha === "";

  const handlePressLogin = async () => {
  router.push("/homepage");
};


  //  const handlePressLogin = async () => {
  //   if (isLoginDisabled) return;

  //   try {
  //     if (!valid || !validPassword) {
  //       /* eslint-disable-next-line no-console */
  //       console.log("Credenciais inválidas");
  //       setError("Credenciais inválidas");
  //     } else {
  //       router.push("/homepage");
  //     }
  //   } catch (err) {
  //     setError("Erro ao fazer login");
  //     /* eslint-disable-next-line no-console */
  //     console.log("Erro na requisição", err);
  //   }
  // };

  return (
    <View className="flex-1 bg-zinc-950">
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-4xl font-bold text-[#FFA62B] mb-8 text-center">Olá, seja bem-vindo!</Text>

        <Text className="text-lg text-[#FFA62B] text-center mb-6 px-4">
          Digite suas credencias para fazer login ou cadastre-se para começar a usar o app.
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
          className="w-72 h-12 bg-[#FFA62B] text-[black] rounded-lg font-bold px-4 mb-3"
        />

        {/* Campo de senha com toggle de visibilidade */}
        <View className="w-72 flex-row items-center bg-[#FFA62B] px-2 mb-3 rounded-lg">
          <TextInput
            placeholder="Senha"
            placeholderTextColor="black"
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={setSenha}
            className="flex-1 h-12 text-black font-bold px-2"
          />
          <TouchableOpacity className="pr-4" onPress={() => setSenhaVisivel((prev) => !prev)}>
            {senhaVisivel ? <EyeOff size={20} color="black" /> : <Eye size={20} color="black" />}
          </TouchableOpacity>
        </View>

        {/* {error !== "" && <Text className="text-red-500 mb-4">{error}</Text>} */}

        <View className="flex-row space-x-4 justify-between w-72 ">
          <TouchableOpacity className="px-4 py-4 rounded-lg shadow-md bg-[#FFA62B]" onPress={() => router.push("/register")}>
            <View className="flex-row items-center">
              <Text className="text-black font-bold">Cadastre-se</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-4 py-4 rounded-lg shadow-md ${isLoginDisabled ? "bg-[#FFA62B]" : "bg-[#FFA62B]"}`}
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