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
