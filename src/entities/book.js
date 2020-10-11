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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const author_1 = require("./author");
let Book = class Book {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { description: "Код автора" }),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Book.prototype, "bookId", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field({ description: "Наименование книги" }),
    __metadata("design:type", String)
], Book.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Book.prototype, "pageCount", void 0);
__decorate([
    type_graphql_1.Field(type => author_1.Author, { description: "Автор книги" }),
    typeorm_1.ManyToOne(type => author_1.Author),
    __metadata("design:type", author_1.Author)
], Book.prototype, "author", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.RelationId((book) => book.author),
    __metadata("design:type", Number)
], Book.prototype, "authorId", void 0);
Book = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType({ description: "тип Книга" })
], Book);
exports.Book = Book;
