import { compare, hash } from "bcrypt";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entity/User";
import { useAuth } from "../middleware/auth";
import { AppContext } from "../types";
import { signToken } from "../utils/jwt";

@ObjectType()
class LoginResponse {
  @Field(() => String)
  token: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(useAuth)
  async me(@Ctx() ctx: AppContext) {
    const user = ctx.user;
    if (!user) return null;

    try {
      const foundUser = await User.findOne({
        id: user.id,
      });
      return foundUser;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (foundUser) throw new Error("Já existe um usuário com esse email.");

      await User.insert({
        email,
        password: await hash(password, 12),
        username: email.split("@")[0],
      });
      return true;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser)
        throw new Error("Não existe um usuário com o email informado.");

      const isValidPassword = await compare(password, foundUser.password);
      if (!isValidPassword) throw new Error("Senha inválida.");

      const accessToken = signToken({
        id: foundUser.id,
      });

      return {
        token: accessToken,
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
