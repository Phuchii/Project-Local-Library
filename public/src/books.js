function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let loaned = [];
  let stocked = [];
  books.forEach((book) =>
    book.borrows[0].returned ? stocked.push(book) : loaned.push(book)
  );
  result.push(loaned, stocked);
  return result;
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
    .map((borrow) => {
      let account = accounts.find((account) => account.id === borrow.id);
      return { ...account, returned: borrow.returned };
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
