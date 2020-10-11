import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Author } from "../entities/author";
import { Book } from "../entities/book";
import { BookInput } from "./book-input";
//import { Context } from "../index";

@Resolver(of => Book)
export class BookResolver {
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  @Query(returns => Book, { nullable: true })
  async book(@Arg("bookId", type => Int) bookId: number) {
    return await this.booksRepository.findOne(bookId);
  }

  @Query(returns => [Book])
  books(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  @Mutation(returns => Book)
  async addBook(@Arg("book") bookInput: BookInput): Promise<Book> {
    // find the Author
    const author = await this.authorRepository.findOne(bookInput.authorId, {
      relations: ["books"],
    });
    if (!author) {
      throw new Error("Invalid Author ID");
    }
    const book = this.booksRepository.create(bookInput);
    return await this.booksRepository.save(book);
  }

  @FieldResolver()
  async author(@Root() book: Book): Promise<Author> {
    return (await this.authorRepository.findOne(book.authorId))!;
  }
}