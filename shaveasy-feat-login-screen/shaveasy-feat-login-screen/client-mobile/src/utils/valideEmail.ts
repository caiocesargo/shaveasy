import z from 'zod';

export const emailSchema = z 
    .string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "O email precisa ser válido"
    });

export const validateEmail = (email: unknown) => {
    try {
        emailSchema.parse(email);
        return { valid: true, errors: [] };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { valid: false, errors: error.errors.map((e) => e.message) };
        }
        return { valid: false, errors: ["Erro inesperado na validação"] };
    }
}
