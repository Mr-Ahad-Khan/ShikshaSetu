function getErrorStatus(error) {
  if (error.name === "SequelizeUniqueConstraintError") return 409;
  if (error.name === "SequelizeValidationError") return 400;
  return 500;
}

function sendError(res, error, action, label) {
  const status = getErrorStatus(error);
  return res.status(status).json({
    message: `Unable to ${action} ${label.toLowerCase()}`,
    ...(status < 500 ? { error: error.message } : {}),
  });
}

function createCrudController(Model, label) {
  return {
    create: async (req, res) => {
      try {
        const record = await Model.create(req.body);
        return res.status(201).json(record);
      } catch (error) {
        return sendError(res, error, "create", label);
      }
    },

    getAll: async (_req, res) => {
      try {
        const records = await Model.findAll();
        return res.status(200).json(records);
      } catch (error) {
        return sendError(res, error, "fetch", `${label}s`);
      }
    },

    getById: async (req, res) => {
      try {
        const record = await Model.findByPk(req.params.id);
        if (!record) {
          return res.status(404).json({ message: `${label} not found` });
        }
        return res.status(200).json(record);
      } catch (error) {
        return sendError(res, error, "fetch", label);
      }
    },

    update: async (req, res) => {
      try {
        const record = await Model.findByPk(req.params.id);
        if (!record) {
          return res.status(404).json({ message: `${label} not found` });
        }
        await record.update(req.body);
        return res.status(200).json(record);
      } catch (error) {
        return sendError(res, error, "update", label);
      }
    },

    remove: async (req, res) => {
      try {
        const record = await Model.findByPk(req.params.id);
        if (!record) {
          return res.status(404).json({ message: `${label} not found` });
        }
        await record.destroy();
        return res.status(200).json({ message: `${label} deleted successfully` });
      } catch (error) {
        return sendError(res, error, "delete", label);
      }
    },
  };
}

module.exports = { createCrudController, sendError };
