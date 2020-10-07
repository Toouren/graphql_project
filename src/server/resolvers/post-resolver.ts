import { Post, PostModel } from "../entities/post-entitie";
import { Resolver, Query, Arg, Mutation, Root } from "type-graphql";
import { PostInput } from "./input-types/post-input-type";
import { Error } from "mongoose";
import { UserModel } from "../entities/user-entitie";

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

    @Mutation(() => Post)
    async createPost(
        @Arg("data") { authorId, content }: PostInput
    ): Promise<Post> {
        const author = await UserModel.findById(authorId);
        if (author) {
            const post = await PostModel.create({
                content,
                author,
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
