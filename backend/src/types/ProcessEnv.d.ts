declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    POSTGRES_URI: string;
    JWT_SECRET: string;
  }
}
