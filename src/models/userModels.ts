
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export const mapUser = (row: any): User => {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  };
  