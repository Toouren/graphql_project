import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "USER model" })
export class User {
    @Field(() => ID)
    id: string;

    @Field(_type => String, { nullable: true })
    @Property({ required: true, type: String })
    login: String;

    @Field(_type => String)
    @Property({ required: true, type: String })
    password: String;
}

export const UserModel = getModelForClass(User);
