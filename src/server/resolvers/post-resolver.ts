import { Error } from "mongoose";
import { Arg, Mutation, Query, Resolver, Authorized, Ctx } from "type-graphql";

import { Post, PostModel } from "../entities/post-entitie";
import { UserModel } from "../entities/user-entitie";
import { PostInput } from "./input-types/post-input-type";
import { IContext } from "../interfaces/context";

@Resolver(Post)
export class PostResolver {
    @Query(() => Post, { nullable: false })
    async post(@Arg("id") id: string) {
        return await PostModel.findById(id);
    }

    @Query(() => [Post])
    async posts() {
        return await PostModel.find();
    }

	@Query(() => [Post])
	async postsByUserId(@Arg("userId") userId: string) {
		const user = await UserModel.findById(userId);
		if (user) {
			return await PostModel.find({ author: user });
		} else {
			throw new Error("Author not found");
		}
	}

	@Mutation(() => Post)
	@Authorized()
    async createPost(
		@Arg("data") { content, title }: PostInput,
		@Ctx() ctx: IContext
    ): Promise<Post> {
		console.log(ctx);
        const author = await UserModel.findById(ctx.payload?.userId);
        if (author) {
            const post = await PostModel.create({
                content,
				author,
				title
            });
            await post.save();

            return post;
        } else {
            throw new Error("Author not found");
        }
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg("id") id: string) {
        await PostModel.deleteOne({ id });

        return true;
    }
}
