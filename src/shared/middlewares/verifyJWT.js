import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Nenhum token fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token mal formatado.' });
    }

    try {
        // Verifica se o token é válido usando a sua chave secreta
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        // ANEXA os dados do usuário (o payload) à requisição
        req.user = decodedPayload;

        // Deixa a requisição continuar para o Controller
        next();
    } catch (error){
        return res.status(403).json({ error: 'Token inválido ou expirado.' })
    }
};

// Middleware para verificar se o usuário é admin/barbeiro
export const verifyBarbeiro = (req, res, next) => {
    if (req.user?.tipo !== 'barbeiro') {
        return res.status(403).json({ 
            error: 'Acesso negado. Apenas administradores/barbeiros podem acessar este recurso.' 
        });
    }
    
    if (!req.user?.barbeariaId) {
        return res.status(403).json({ 
            error: 'Usuário admin deve estar associado a uma barbearia.' 
        });
    }
    
    next();
};

// Middleware para verificar se o usuário é cliente
export const verifyClient = (req, res, next) => {
    if (req.user?.tipo !== 'cliente') {
        return res.status(403).json({ 
            error: 'Acesso negado. Apenas clientes podem acessar este recurso.' 
        });
    }
    
    next();
};

// Middleware flexível para verificar tipos específicos
export const verifyUserType = (allowedTypes) => {
    return (req, res, next) => {
        if (!allowedTypes.includes(req.user?.tipo)) {
            return res.status(403).json({ 
                error: `Acesso negado. Tipos permitidos: ${allowedTypes.join(', ')}` 
            });
        }
        next();
    };
};