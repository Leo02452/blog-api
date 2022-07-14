const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = 'Some required fields are missing';
    error.code = 400;
    throw error;
  }
  return value;
};

module.exports = { runSchema };