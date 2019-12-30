const envVariables = require('dotenv-safe').config();

export interface DatabaseConnectionOptions {
  HOST: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
}

// TODO: migrate to a secret manager instead of using a .env file
export const getDatabaseConnectionOptions = (): DatabaseConnectionOptions => {
  let { PORT, ...rest } = envVariables.parsed;
  PORT = parseInt(PORT);
  if (isNaN(PORT)) {
    throw new Error('Invalid port supplied');
  }

  return { ...rest, PORT };
};
