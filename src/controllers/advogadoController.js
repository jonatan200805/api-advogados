const { Advogado, Processo } = require('../models');

exports.listar = async (req, res) => {
  try {
    const advogados = await Advogado.findAll({ include: Processo });
    return res.status(200).json(advogados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao listar advogados' });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const advogado = await Advogado.findByPk(id, { include: Processo });
    if (!advogado)
      return res.status(404).json({ message: 'Advogado não encontrado' });
    return res.status(200).json(advogado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao buscar advogado' });
  }
};

exports.criar = async (req, res) => {
  try {
    const advogado = await Advogado.create(req.body);
    return res.status(201).json(advogado);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ message: 'OAB já cadastrada para outro advogado' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Erro ao criar advogado' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const advogado = await Advogado.findByPk(id);
    if (!advogado)
      return res.status(404).json({ message: 'Advogado não encontrado' });

    await advogado.update(req.body);
    return res.status(200).json(advogado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao atualizar advogado' });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const advogado = await Advogado.findByPk(id);
    if (!advogado)
      return res.status(404).json({ message: 'Advogado não encontrado' });

    // Verifica se há processos vinculados
    const processos = await Processo.findAll({ where: { id_advogado: id } });
    if (processos.length > 0) {
      return res.status(400).json({
        message: 'Não é possível excluir advogado com processos vinculados',
      });
    }

    await advogado.destroy();
    return res.status(200).json({ message: 'Advogado excluído com sucesso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao excluir advogado' });
  }
};