import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { useAuth } from "../middleware/auth";
import { AppContext } from "../types";

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  @UseMiddleware(useAuth)
  async createProduct(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("image_url") image_url: string,
    @Arg("price") price: number,
    @Ctx() ctx: AppContext
  ) {
    try {
      const user = await User.findOne(ctx.user?.id);

      const createdProduct = getConnection().getRepository("Product").save({
        name,
        description,
        image_url,
        price,
        created_by: user,
      });

      return createdProduct;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  @Query(() => [Product!])
  @UseMiddleware(useAuth)
  async products() {
    try {
      const products = await Product.find({
        relations: ["created_by"],
      });
      return products;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  @Query(() => Product)
  @UseMiddleware(useAuth)
  async product(@Arg("id") id: number) {
    try {
      const product = await Product.findOne(id, {
        relations: ["created_by"],
      });
      if (!product) throw new Error("Não existe um produto com esse id :(");
      return product;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(useAuth)
  async deleteProduct(@Arg("id") id: number) {
    try {
      const productExists = await Product.findOne(id);
      if (!productExists) throw Error("Não existe um produto com esse id :(");

      await Product.delete(id);
      return true;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  @Mutation(() => Product)
  @UseMiddleware(useAuth)
  async updateProduct(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("image_url") image_url: string,
    @Arg("price") price: number,
    @Arg("productId") productId: number
  ) {
    try {
      const product = await Product.findOne(productId, {
        relations: ["created_by"],
      });
      if (!product) throw Error("Não existe um produto com esse id :(");

      product.name = name;
      product.image_url = image_url;
      product.description = description;
      product.price = price;

      await product.save();
      return product;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
