export const apiURL: string = import.meta.env[
  import.meta.env.PROD ? "API_URL" : "DEV_API_URL"
];
