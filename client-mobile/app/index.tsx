import React from "react";
import { View, Text, TouchableOpacity} from "react-native";

const App: React.FC = () => (
    <View className="flex-1 bg-[#e9b72d]">

      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-6xl font-bold text-black mb-6 text-center">ShavEasy</Text>

        <Text className="text-lg text-white text-center mb-6 px-4">
          !
        </Text>


        <View className="flex-row space-x-4 justify-between w-72">
          <TouchableOpacity
            className="px-4 py-4 rounded-lg shadow-md bg-black"
          >
            <View className="flex-row items-center">
              <Text className="text-[#d4a31a] font-bold">Sou Barbeiro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-4 py-4 rounded-lg shadow-md bg-black"
          >
            <View className="flex-row items-center">
              <Text className="text-[#ffca3a] font-bold">Sou Cliente</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

export default App;