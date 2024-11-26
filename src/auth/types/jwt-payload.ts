export type JwtPayload = {
  email: string;
  sub: number;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
