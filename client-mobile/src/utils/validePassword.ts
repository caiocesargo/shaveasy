import { z } from "zod";

// Esquema de validação para a senha
export const passwordSchema = z
  .string()
  .min(8, { message: "A senha precisa ter pelo menos 8 caracteres" })
  .regex(/\d/, { message: "A senha precisa ter pelo menos um número" })
  .regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'/]/, {
    message: "A senha precisa ter pelo menos um caractere especial",
  });

// Função para validar a senha
export const validatePassword = (password: unknown) => {
  try {
    passwordSchema.parse(password);
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.errors.map((e) => e.message) };
    }
    return { valid: false, errors: ["Erro inesperado na validação"] };
  }
};