// src/models/userModel.ts

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Function to map the query result to a User object
  export const mapUser = (row: any): User => {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  };
  