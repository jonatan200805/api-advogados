const { Advogado, Processo } = require('../models');


exports.listar = async (req, res) => {
const advs = await Advogado.findAll();
return res.json(advs);
};


exports.criar = async (req, res) => {
try {
const adv = await Advogado.create(req.body);
return res.status(201).json(adv);
} catch (err) {
if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'OAB já cadastrada' });
console.error(err);
return res.status(500).json({ message: 'Erro interno' });
}
};


exports.atualizar = async (req, res) => {
const { id } = req.params;
const adv = await Advogado.findByPk(id);
if (!adv) return res.status(404).json({ message: 'Advogado não encontrado' });
await adv.update(req.body);
return res.json(adv);
};


exports.deletar = async (req, res) => {
const { id } = req.params;
const adv = await Advogado.findByPk(id);
if (!adv) return res.status(404).json({ message: 'Advogado não encontrado' });


// Impedir exclusão se houver processos
const count = await Processo.count({ where: { id_advogado: id } });
if (count > 0) return res.status(400).json({ message: 'Não é possível excluir advogado com processos associados' });


await adv.destroy();
return res.json({ message: 'Advogado excluído com sucesso' });
};