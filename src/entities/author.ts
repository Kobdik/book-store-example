import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

import { Book } from "./book";

@Entity()
@ObjectType({ description: "тип Автор" })
export class Author {
  @Field(type => ID, { description: "Код автора" })
  @PrimaryColumn()
  authorId: number;

  @Field({ description: "Имя автора" })
  @Column()
  name: string;

  @Field(type => [Book], { description: "Книги автора" })
  @OneToMany(type => Book, book => book.author, { cascade: ["insert"] })
  books: Book[];
}
