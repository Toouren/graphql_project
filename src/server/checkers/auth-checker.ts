import { AuthChecker } from "type-graphql";
import { verify } from "jsonwebtoken";

import { IContext } from "../interfaces/context";

export const authChecker: AuthChecker<IContext> = ({ context }, roles) => {

    const authToken = context.req.headers["authorization"];
    if (!authToken) {
        throw new Error("No authorization key");
    }

    try {
        const payload = verify(authToken, "MySecretKey");
		context.payload = payload as any;
		
		return true;
    } catch (err) {
		console.log(err);

        return false;
	}
};
