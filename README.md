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
ApolloServer предоставляет удобный инструмент - Playground, с помощью которого можно посмотреть схему и документацию, а также вводить запросы и мутации (изменения). 

# мутации на создание авторов

Меняя переменную input, поочередно вводим авторов.

```
mutation newAuthor($input: AuthorInput!){
  addAuthor(author: $input){
    authorId
    name
  }
}

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

# мутации на создание книг

Последовательно вводим книги, убеждаясь, что правильно введен код автора.

```
mutation newBook($input: BookInput!){
  addBook(book: $input){
    name
    pageCount
    author{
      name
    }
  }
}

{
  "input": {
    "bookId": 105,
    "name": "Лживые боги",
    "pageCount": 270,
    "authorId": 3
  }
}

{
  "input": {
    "bookId": 101,
    "name": "Возвышение Хоруса",
    "pageCount": 300
    "authorId": 1
  }
}

{
  "input": {
    "bookId": 102,
    "name": "Битва за бездну",
    "pageCount": 280,
    "authorId": 2
  }
}

{
  "input": {
    "bookId": 103,
    "name": "Легион",
    "pageCount": 320,
    "authorId": 1
  }
}

{
  "input": {
    "bookId": 104,
    "name": "Галактика в огне",
    "pageCount": 250,
    "authorId": 2
  }
}
```
# Запрос на получение списка книг с авторами

Запрашиваем все книги, раскрывая наименование и количество страниц, с авторами.
```
query allBooksWithAuthors {
  books {
    name
    pageCount
    author {
      name
    }
  }
}
```

# Запрос на получение списка книг не раскрывая авторов

Запрашиваем все книги, раскрывая наименование и количество страниц.
```
query allBooks {
  books {
    name
    pageCount
  }
}
```



# Запрос на получение автора со списком его книг

Запрашиваем автора и все его книги, раскрывая наименование и количество страниц.
```
query authorWithBooks {
  name
  books {
    name
    pageCount
  }
}
```

# Единый запрос

Один запрос к GraphQL возращает данные из двух таблиц, но за раз.
В author-resolver поле books у класса Author декорировано классом FieldResolver, что позволяет получить значение массива книг вместе с кодом и именем автора.
```
  @Query(returns => Author, { nullable: true })
  async author(@Arg("authorId", type => Int) authorId: number) {
    return await this.authorRepository.findOne(authorId);
  }

  @FieldResolver()
  books(@Root() author: Author) {
    return this.booksRepository.find({
      where: { authorId: author.authorId }
    });
  }

```
