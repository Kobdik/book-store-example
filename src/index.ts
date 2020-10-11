import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";

import { AuthorResolver } from "./resolvers/author-resolver";
import { BookResolver } from "./resolvers/book-resolver";
import { Author } from "./entities/author";
import { Book } from "./entities/book";
//import { seedDatabase } from "./helpers";

export interface Context { user: 'User'; }

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await TypeORM.createConnection({
      type: "mysql",
      database: "bookstore",
      username: "worker", // fill this with your username
      password: "Kobdikov144", // and password
      port: 3306, // and port
      host: "localhost", // and host
      entities: [Author, Book],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      dropSchema: false,
      cache: true,
    });

    // seed database with some data
    //const { defaultUser } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [AuthorResolver, BookResolver],
      container: Container,
    });

    // create mocked context
    const context: Context = { user: 'User' };

    // Create GraphQL server
    const server = new ApolloServer({ schema, context });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();