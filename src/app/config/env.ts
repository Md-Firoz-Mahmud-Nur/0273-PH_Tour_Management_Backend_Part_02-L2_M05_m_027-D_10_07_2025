import dotenv from "dotenv";

dotenv.config({ quiet: true });

interface EnvConfig {
  MONGO_DB_USER: string;
  MONGO_DB_SECRET_KEY: string;
  MONGO_DB_URI_SECRET_KEY: string;
  PORT: string;
  NODE_ENV: "development" | "production";
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "MONGO_DB_USER",
    "MONGO_DB_SECRET_KEY",
    "MONGO_DB_URI_SECRET_KEY",
    "PORT",
    "NODE_ENV",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    MONGO_DB_USER: process.env.MONGO_DB_USER as string,
    MONGO_DB_SECRET_KEY: process.env.MONGO_DB_SECRET_KEY as string,
    MONGO_DB_URI_SECRET_KEY: process.env.MONGO_DB_URI_SECRET_KEY as string,
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVariables = loadEnvVariables();
