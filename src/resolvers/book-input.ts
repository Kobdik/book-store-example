import { InputType, Field, ID, Int } from "type-graphql";

@InputType()
export class BookInput {
  @Field(type => ID)
  bookId: number;

  @Field()
  pageCount: number;

  @Field()
  name: string;

  @Field(type => Int)
  authorId: number;
}