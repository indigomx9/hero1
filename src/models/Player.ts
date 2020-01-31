import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, 
    Column } from "typeorm";

@ObjectType()
@Entity({ name: "players" })
export class Player extends BaseEntity {
    @Field(() => String)
    @PrimaryGeneratedColumn("uuid") id: string;

    @Field()
    @Column() firstName: string;

    @Field()
    @Column() lastName: string;

    @Field(() => Int)
    @Column() age: number;

    @Field()
    @Column() info: string;
};


