import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Nenhum token fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token mal formatado;' });
    }

    try {
        // Verifica se o token é válido usando a sua chave secreta
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        // ANEXA os dados do usuário (o payload) à requisição
        req.user = decodedPayload;

        // Deixa a requisição continuar para o Controller
        next();
    } catch (error){
        return res.status(403).json({ error: 'Token inválido ou expirado;' })
    }
};