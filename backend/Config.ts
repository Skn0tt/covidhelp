export namespace Config {
  export const JWT_SECRET = process.env.JWT_SECRET ?? "";
  export const MONGODB_URI =
    process.env.MONGODB_URI ?? "mongodb://localhost:27017";
}
