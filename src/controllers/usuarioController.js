const { Usuario } = require('../models'); // Assumindo que você tem um modelo Usuario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.criar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = await Usuario.create({ nome, email, senha: hashedPassword });
        
        const userResponse = { ...user.toJSON() };
        delete userResponse.senha;

        return res.status(201).json(userResponse);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }
        console.error('Erro ao criar usuário:', err);
        return res.status(500).json({ message: 'Erro interno do servidor ao criar usuário.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Email ou senha inválidos.' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou senha inválidos.' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ message: 'Login realizado com sucesso!', token });
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        return res.status(500).json({ message: 'Erro interno do servidor ao tentar login.' });
    }
};