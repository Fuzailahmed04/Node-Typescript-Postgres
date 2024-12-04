
export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
  
  }
  
  export const mapUser = (row: any): User => {
    return {
      id: row.id,
      username: row.name,
      email: row.email,
      createdAt: row.created_at,
   
    };
  };
  