# Guia de Inicialização - Versão MOBILE (Celular/Emulador)

Este guia explica como rodar o projeto Shaveasy no modo Mobile (Android/iOS).

## Pré-requisitos

1.  **Node.js** e **PostgreSQL** (iguais ao guia Web).
2.  **Expo Go** instalado no seu celular (Android ou iOS).
3.  (Opcional) **Android Studio** se quiser usar emulador no PC.

---

## Passo 1: Configurar o Backend

*(Siga os mesmos passos do Guia Web para iniciar o banco e o servidor)*

1.  Instale dependências: `npm install`
2.  Inicie o banco: `npx prisma migrate dev --name init`
3.  Rode o servidor: `npm run dev`

## Passo 2: Configurar o IP (MUITO IMPORTANTE!)

Para que o celular consiga acessar o backend no seu computador, você precisa configurar o IP correto.

1.  Abra o terminal e descubra o IP da sua máquina:
    *   **Windows:** Digite `ipconfig` e procure por `IPv4 Address` (ex: `192.168.1.15`).
    *   **Mac/Linux:** Digite `ifconfig`.

2.  Abra o arquivo `client-mobile/src/services/api.ts`.
3.  Atualize a linha do IP com o **SEU** endereço IPv4:

    ```typescript
    const api = axios.create({
        baseURL: Platform.OS === 'web' 
            ? 'http://localhost:3333' 
            : 'http://192.168.1.15:3333', // <--- COLOQUE SEU IP AQUI
    });
    ```

## Passo 3: Rodar no Celular

1.  Abra um novo terminal e entre na pasta mobile:
    ```bash
    cd client-mobile
    ```
2.  Inicie o Expo:
    ```bash
    npx expo start
    ```
3.  Um QR Code aparecerá no terminal.
4.  Abra o app **Expo Go** no seu celular e escaneie o QR Code.

## Solução de Problemas

*   **Network Error / Erro de Conexão:**
    *   Verifique se o celular e o computador estão na **mesma rede Wi-Fi**.
    *   Verifique se o Firewall do Windows não está bloqueando a porta 3333.
    *   Confirme se colocou o IP correto no `api.ts`.
