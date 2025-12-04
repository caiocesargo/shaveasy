import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// O export default garante que 'import prisma from ...' funcione corretamente
export default prisma;