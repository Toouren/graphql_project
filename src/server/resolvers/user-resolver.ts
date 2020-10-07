import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User, UserModel } from "../entities/user-entitie";
import { UserInput } from "./input-types/user-input-type";

@Resolver(User)
export class UserResolver {
    @Query(() => User, { nullable: false })
    async user(@Arg("id") id: string) {
        return await UserModel.findById(id);
    }

    @Query(() => [User])
    async users() {
        return await UserModel.find();
    }

    @Mutation(() => User)
    async createUser(
        @Arg("data") { login, password }: UserInput
    ): Promise<User> {
        const user = await UserModel.create({
            login,
            password,
        });
        await user.save();

        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        await UserModel.deleteOne({ id });

        return true;
    }
}
