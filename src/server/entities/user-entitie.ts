import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "USER model" })
export class User {
    @Field(() => ID)
    id: string;

    @Field((_type) => String, { nullable: true })
    @Property({ required: true, type: String })
    login: String;

    @Field((_type) => String)
    @Property({ required: true, type: String })
    password: String;
}

export const UserModel = getModelForClass(User);
