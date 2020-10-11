import { Field, ID, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column, ManyToOne, RelationId } from "typeorm";

import { Author } from "./author";

@Entity()
@ObjectType({ description: "тип Книга" })
export class Book {
  @Field(type => ID, { description: "Код автора" })
  @PrimaryColumn()
  bookId: number;

  @Column()
  @Field({ description: "Наименование книги" })
  name: string;

  @Field(type => Int)
  @Column()
  pageCount: number;

  @Field(type => Author, { description: "Автор книги" })
  @ManyToOne(type => Author)
  author: Author;

  @Column()
  @RelationId((book: Book) => book.author)
  authorId: number;
}