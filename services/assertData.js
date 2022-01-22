const assertDataByPk = async (model, id) => {
  const data = await model.findByPk(id);
  if (!data) throw new Error('Resource not found');
};

module.exports = { assertDataByPk };
