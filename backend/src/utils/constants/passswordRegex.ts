export const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})',
);

export const DEFAULT_EXPIRATION_MS = 15 * 60 * 1000;
