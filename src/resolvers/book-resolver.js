"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const author_1 = require("../entities/author");
const book_1 = require("../entities/book");
const book_input_1 = require("./book-input");
//import { Context } from "../index";
let BookResolver = class BookResolver {
    constructor(authorRepository, booksRepository) {
        this.authorRepository = authorRepository;
        this.booksRepository = booksRepository;
    }
    async book(bookId) {
        return await this.booksRepository.findOne(bookId);
    }
    books() {
        return this.booksRepository.find();
    }
    async addBook(bookInput) {
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
    async author(book) {
        return (await this.authorRepository.findOne(book.authorId));
    }
};
__decorate([
    type_graphql_1.Query(returns => book_1.Book, { nullable: true }),
    __param(0, type_graphql_1.Arg("bookId", type => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "book", null);
__decorate([
    type_graphql_1.Query(returns => [book_1.Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "books", null);
__decorate([
    type_graphql_1.Mutation(returns => book_1.Book),
    __param(0, type_graphql_1.Arg("book")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_input_1.BookInput]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "addBook", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_1.Book]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "author", null);
BookResolver = __decorate([
    type_graphql_1.Resolver(of => book_1.Book),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(author_1.Author)),
    __param(1, typeorm_typedi_extensions_1.InjectRepository(book_1.Book)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], BookResolver);
exports.BookResolver = BookResolver;
