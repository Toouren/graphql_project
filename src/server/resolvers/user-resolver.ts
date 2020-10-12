import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { User, UserModel } from "../entities/user-entitie";
import { UserInput } from "./input-types/user-input-type";

import { LoginOutput } from "./output-types/login-output-type";
import { sign } from "jsonwebtoken";

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
        @Arg("data") { login, password, name }: UserInput
    ): Promise<User> {
        const user = await UserModel.create({
            login,
			password,
			name
        });
        await user.save();

        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        await UserModel.deleteOne({ id });

        return true;
	}
	
	@Query(() => LoginOutput)
    async login(
		@Arg("login") login: string,
        @Arg("password") password: string
    ) {
		const user = await UserModel.findOne({ login });

        if (!user) {
            throw new Error("Could not find user");
		}

        if (password !== user.password) {
            throw new Error("Bad password");
        }

        return { accessToken: sign({ userId: user.id }, "MySecretKey") };
    }
}
