/**
 * JWT constant values.
 * NOTE: The `secret` is within the source code here solely to illustrate the concept.
 *       Real token secrets should be stored outside the source code in a vault, or
 *       environment variable, or configuration service.
 */
export const jwtConstants = {
  secret:
    'PLACEHOLDER. GENERATE A COMPLEX SECRET AND NEVER INCLUDE IT WITH THE SOURCE CODE.',
};

export enum Role {
  User = 'user',
  Admin = 'admin',
}
