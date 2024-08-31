export type UserRow = {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  CreatedAt: string;
  UpdatedAt: string;
};

export type User = UserRow & { avatar?: string };
