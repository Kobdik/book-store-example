import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Author } from "../entities/author";
import { Book } from "../entities/book";
import { AuthorInput } from "./author-input";
//import { Context } from "../index";

@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  @Query(returns => Author, { nullable: true })
  async author(@Arg("authorId", type => Int) authorId: number) {
    return await this.authorRepository.findOne(authorId);
  }

  @Query(returns => [Author])
  authors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  @Mutation(returns => Author)
  async addAuthor(@Arg("author") authorInput: AuthorInput): Promise<Author> {
    const author = this.authorRepository.create({ ...authorInput });
    return await this.authorRepository.save(author);
  }

  @FieldResolver()
  books(@Root() author: Author) {
    return this.booksRepository.find({
      where: { authorId: author.authorId }
    });
  }
}