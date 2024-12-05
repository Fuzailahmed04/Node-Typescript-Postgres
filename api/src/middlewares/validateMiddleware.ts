export const userValidationSchemas = {
  createUser: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' },
      age: { type: 'number', minimum: 18 },
    },
  },
};
