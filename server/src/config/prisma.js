// src/config/prisma.js
import { PrismaClient } from '@prisma/client';

// Instância única do Prisma Client
export const prisma = new PrismaClient();