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
exports.AuthorResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const author_1 = require("../entities/author");
const book_1 = require("../entities/book");
const author_input_1 = require("./author-input");
//import { Context } from "../index";
let AuthorResolver = class AuthorResolver {
    constructor(authorRepository, booksRepository) {
        this.authorRepository = authorRepository;
        this.booksRepository = booksRepository;
    }
    async author(authorId) {
        return await this.authorRepository.findOne(authorId);
    }
    authors() {
        return this.authorRepository.find();
    }
    async addAuthor(authorInput) {
        const author = this.authorRepository.create({ ...authorInput });
        return await this.authorRepository.save(author);
    }
    books(author) {
        return this.booksRepository.find({
            where: { authorId: author.authorId }
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => author_1.Author, { nullable: true }),
    __param(0, type_graphql_1.Arg("authorId", type => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "author", null);
__decorate([
    type_graphql_1.Query(returns => [author_1.Author]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "authors", null);
__decorate([
    type_graphql_1.Mutation(returns => author_1.Author),
    __param(0, type_graphql_1.Arg("author")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_input_1.AuthorInput]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "addAuthor", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [author_1.Author]),
    __metadata("design:returntype", void 0)
], AuthorResolver.prototype, "books", null);
AuthorResolver = __decorate([
    type_graphql_1.Resolver(of => author_1.Author),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(author_1.Author)),
    __param(1, typeorm_typedi_extensions_1.InjectRepository(book_1.Book)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AuthorResolver);
exports.AuthorResolver = AuthorResolver;
