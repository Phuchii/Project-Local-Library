function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1: -1));
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0
  let accountId = account.id;
  let bookBorrows = books.forEach((book) => {
    book.borrows.forEach((borrowedId) => {
      if (accountId === borrowedId.id) total+=1;
    });
  });
  return total
}
/*{
  id: "5f446f2e189628dfd4e6225e",
  returned: false,
},*/
function getBooksPossessedByAccount(account, books, authors) {
  let borrowedBooks = books.filter((book) =>
    book.borrows.find(
      (borrow) => borrow.returned === false && borrow.id === account.id
    )
  );
  return borrowedBooks.map((book) => {
    return {
      ...book,
      author: authors.find((author) => author.id === book.authorId),
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
