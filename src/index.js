"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const typedi_1 = require("typedi");
const TypeORM = __importStar(require("typeorm"));
const TypeGraphQL = __importStar(require("type-graphql"));
const author_resolver_1 = require("./resolvers/author-resolver");
const book_resolver_1 = require("./resolvers/book-resolver");
const author_1 = require("./entities/author");
const book_1 = require("./entities/book");
// register 3rd party IOC container
TypeORM.useContainer(typedi_1.Container);
async function bootstrap() {
    try {
        // create TypeORM connection
        await TypeORM.createConnection({
            type: "mysql",
            database: "bookstore",
            username: "worker",
            password: "Kobdikov144",
            port: 3306,
            host: "localhost",
            entities: [author_1.Author, book_1.Book],
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
            resolvers: [author_resolver_1.AuthorResolver, book_resolver_1.BookResolver],
            container: typedi_1.Container,
        });
        // create mocked context
        const context = { user: 'User' };
        // Create GraphQL server
        const server = new apollo_server_1.ApolloServer({ schema, context });
        // Start the server
        const { url } = await server.listen(4000);
        console.log(`Server is running, GraphQL Playground available at ${url}`);
    }
    catch (err) {
        console.error(err);
    }
}
bootstrap();
