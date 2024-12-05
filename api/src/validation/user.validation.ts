// user.validation.ts (or wherever you define your validation schemas)
import { Static, Type } from '@sinclair/typebox';

export const userValidationSchemas = {
  createUser: Type.Object({
    username: Type.String({ minLength: 3, description: "Username of the user" }),
    email: Type.String({ format: 'email', description: "Email address of the user" }),
    password: Type.String({ minLength: 6, description: "Password for the user" }),
  }),
  loginUser: Type.Object({
    email: Type.String({ format: 'email', description: "Email address of the user" }),
    password: Type.String({ minLength: 6, description: "Password for the user" }),
  }),
};
