const { Advogado, Processo } = require('../models');

exports.listarPorAdvogado = async (req, res) => {
  try {
    const { id_advogado } = req.params;
    const advogado = await Advogado.findByPk(id_advogado);
    if (!advogado)
      return res.status(404).json({ message: 'Advogado não encontrado' });

    const processos = await Processo.findAll({ where: { id_advogado } });
    return res.status(200).json(processos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.criar = async (req, res) => {
  const { id_advogado } = req.params;
  const advogado = await Advogado.findByPk(id_advogado);
  if (!advogado)
    return res.status(404).json({ message: 'Advogado não encontrado' });

  try {
    const processo = await Processo.create({ ...req.body, id_advogado });
    return res.status(201).json(processo);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ message: 'Número de processo já cadastrado' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Erro interno ao criar processo' });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const processo = await Processo.findByPk(id);
    if (!processo)
      return res.status(404).json({ message: 'Processo não encontrado' });

    await processo.destroy();
    return res.status(200).json({ message: 'Processo excluído com sucesso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao excluir processo' });
  }
};