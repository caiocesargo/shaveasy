import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity} from "react-native";
import Background  from "../src/assets";
import { authUtils } from "../src/utils/auth";

const App: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthToken = async () => {
      const authData = await authUtils.getAuthenticatedUser();
      
      if (authData) {
        const homeRoute = authUtils.getHomeRouteForUserType(authData.user.tipo);
        router.replace(homeRoute);
      }
    };

    checkAuthToken();
  }, [router]);
  return (
    <View className="flex-1 bg-zinc-950">
      <Background />

      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-6xl font-bold text-[#FFA62B] mb-6 text-center">ShavEasy</Text>

        <Text className="text-lg text-[#FFA62B] text-center mb-6 px-4">
          Seu corte, sua hora, seu app
        </Text>


        <View className="flex-row space-x-4 justify-between w-72 gap-4">
          <TouchableOpacity
            className="px-4 py-4 rounded-lg bg-black"
            onPress={() => router.push("/login-barber")}
          >
            <View className="flex-row items-center">
              <Text className="text-[#FFA62B] font-bold">Sou Barbeiro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-4 py-4 rounded-lg bg-black"
            onPress={() => router.push("/login-client")}
          >
            <View className="flex-row items-center">
              <Text className="text-[#FFA62B] font-bold">Sou Cliente</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default App;