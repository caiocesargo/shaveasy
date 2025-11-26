import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { validateEmail } from "../../utils/valideEmail";
import { validatePassword } from "../../utils/validePassword";   

interface ModalRegisterProps {
    onClose: () => void;
}

const ModalRegister: React.FC<ModalRegisterProps> = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { valid: validEmail } = validateEmail(email);
    const { valid: validPassword } = validatePassword(password);

    const handleRegister = async () => {
        try {
            if (!validEmail || !validPassword || password !== confirmPassword) {
                setError("Verifique os campos e tente novamente.");
            } else {
                // Simulate successful registration
                onClose();
            }
        } catch (err) {
            console.error("Error registering user:", err);
        }
    };

    return (
        <View className="flex-1 bg-zinc-950 justify-center items-center">
            <View className="bg-zinc-950 p-5 rounded-lg w-4/5 items-center">
                <Text className="text-[#FFA62B] font-bold text-2xl mb-4">Cadastre-se</Text>
                <TextInput
                    className="w-full p-3 border border-[#FFA62B] rounded-lg text-[#FFA62B] mb-4"
                    placeholder="Nome"
                    placeholderTextColor="#FFA62B"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    className="w-full p-3 border border-[#FFA62B] rounded-lg text-[#FFA62B] mb-4"
                    placeholder="Email"
                    placeholderTextColor="#FFA62B"
                    value={email}
                    onChangeText={setEmail}
                />
                <View className="w-full flex-row items-center border border-[#FFA62B] rounded-lg mb-4">
                    <TextInput
                        className="flex-1 p-3 text-[#FFA62B]"
                        placeholder="Senha"
                        placeholderTextColor="#FFA62B"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity className="p-3" onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={20} color="#FFA62B" /> : <Eye size={20} color="#FFA62B" />}
                    </TouchableOpacity>
                </View>
                <View className="w-full flex-row items-center border border-[#FFA62B] rounded-lg mb-4">
                    <TextInput
                        className="flex-1 p-3 text-[#FFA62B]"
                        placeholder="Confirme a senha"
                        placeholderTextColor="#FFA62B"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity className="p-3" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={20} color="#FFA62B" /> : <Eye size={20} color="#FFA62B" />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className={`bg-zinc-950 p-3 rounded-lg w-full items-center mb-2 ${!name || !email || !password || !confirmPassword ? "opacity-50" : "bg-zinc-950 shadow-sm shadow-yellow-600"}`}
                    onPress={handleRegister}
                    disabled={!name || !email || !password || !confirmPassword}
                >
                    <Text className="text-[#FFA62B] font-bold">Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mt-2" onPress={onClose}>
                    <Text className="text-[#FFA62B] font-bold">Fechar</Text>
                </TouchableOpacity>
                {error && <Text className="text-red-600 mt-2">{error}</Text>}
            </View>
        </View>
    );
};

export default ModalRegister;