export interface CredentialsDto {
    login: string;
    password: string;
}

export interface TokenDto {
    access_token: string;
    expires_in: number
}