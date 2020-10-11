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
exports.Author = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const book_1 = require("./book");
let Author = class Author {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { description: "Код автора" }),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Author.prototype, "authorId", void 0);
__decorate([
    type_graphql_1.Field({ description: "Имя автора" }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(type => [book_1.Book], { description: "Книги автора" }),
    typeorm_1.OneToMany(type => book_1.Book, book => book.author, { cascade: ["insert"] }),
    __metadata("design:type", Array)
], Author.prototype, "books", void 0);
Author = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType({ description: "тип Автор" })
], Author);
exports.Author = Author;
