import { Field, InputType } from "type-graphql";

import { User } from "../../entities/user-entitie";

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    login: string;

    @Field()
    password: string;
}
