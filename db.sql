CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE todo (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  is_done boolean NOT NULL DEFAULT false
);