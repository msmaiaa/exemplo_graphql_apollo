import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { CONST } from "../constants";
import { AppContext } from "../types";

export const useAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
  try {
    const token = context.req.get("Authorization");
    if (!token) throw new Error("Token faltando");

    const tokenPayload = verify(token, CONST.JWT_SECRET);
    if (!tokenPayload) throw new Error("Token inválido");

    context.user = tokenPayload as any;
  } catch (e: any) {
    throw new Error(e.message || "Erro na autenticação");
  }
  return next();
};
