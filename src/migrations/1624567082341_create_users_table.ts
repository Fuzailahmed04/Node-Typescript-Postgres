import { MigrationBuilder } from 'pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('Users', {
    id: {
      type: 'serial',
      primaryKey: true,  // auto-incrementing primary key
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    email: {
      type: 'varchar(100)',
      unique: true,
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('Users');
};
