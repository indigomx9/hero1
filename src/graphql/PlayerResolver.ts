import { Resolver, Query, Mutation, Arg, Int, ID, InputType, Field } from "type-graphql";
import { Player } from "../models/Player";

@InputType()
class PlayerInput {
    @Field(() => String) firstName: string
    @Field(() => String) lastName: string
    @Field(() => Int) age: number
    @Field(() => String) info: string
};

@Resolver()
export class PlayerResolver {
    @Mutation(() => Player)
    async createPlayer(@Arg("options", () => PlayerInput) options: PlayerInput) {
        const player: Player = await Player.create(options).save()
        return player;
    }

    @Mutation(() => Boolean)
    async updatePlayer(
        @Arg("id", () => String) id: string,
        @Arg("input", () => PlayerInput) input: PlayerInput
    ) {
        await Player.update({id}, input)
        return true;
    }

    @Mutation(() => Boolean)
    async deletePlayer(@Arg("id", () => String) id: string) {
        await Player.delete({id})
        return true;
    }

    @Query(() => [Player])
    async players() {
        return await Player.find();
    }

    @Query(() => Player)
    async player(@Arg("id", () => String) ID: string) {
        return await Player.findOne(ID);
    }
};

