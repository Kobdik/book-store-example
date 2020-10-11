import { InputType, Field, ID } from "type-graphql";

@InputType()
export class AuthorInput {
  @Field(type => ID)
  authorId: number;

  @Field()
  name: string;
}