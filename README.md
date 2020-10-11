# book-store-example

Пример использования `TypeGraphQL` на примере схемы:
```
type Book {
  bookId: number;
  name: string;
  pageCount: number;
  authorId: number;
  author: Author;
}

type Author {
  authorId: number;
  name: string;
}
```
# Реализация

В качестве БД используется MySQL, а GraphQL - ApolloServer с использованием type-graphql и type-orm.
ApolloServer предоставляет удобный инструмент - Playground, с помощью которого можно посмотреть схему и документацию. 

# мутации на создание авторов и книг

```
mutation newAuthor($input: AuthorInput!){
  addAuthor(author: $input){
    authorId
    name
  }
}

"""Меняя переменную input, поочередно вводим авторов"""
{
  "input": {
    "authorId": 1,
    "name": "Dan Abnett"
  }
}

{
  "input": {
    "authorId": 2,
    "name": "Ben Counter"
  }
}

{
  "input": {
    "authorId": 3,
    "name": "Graham McNeill"
  }
}
```
