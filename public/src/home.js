function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);

  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
} 

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let loaned = books.filter((book) => !book.borrows[0].returned)
  return loaned.length
}

function getMostCommonGenres(books) {
  //let listOfGenres = books.map((book) => book.genre)
  let something = books.reduce((acc, {genre}) => {
    if (acc[genre]){
      acc[genre].push(1)  
    } else{
      acc[genre] = [1]
    }
    return acc
  },{}) 
  for (let id in something) {
    const sum = something[id].reduce((acc, b) => acc + b);
    something[id] = sum;
  }
  const sorted = _sortObjectByValues(something)
  let arr = sorted.map((authorId) => { 
    return {name: authorId,count: something[authorId]}
  });
  return arr.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularityBooks = [];
    books.forEach((book) => {
      popularityBooks.push({"name": book.title, "count": book.borrows.length});
    });
  popularityBooks.sort((a, b) => b.count - a.count);
 
  let numberItems=5;
  return popularityBooks.slice(0, numberItems);    
}


function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
      //console.log(authorId)
      //console.log(acc[authorId])
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((acc, b) => acc + b);
    count[id] = sum;
  }
  const sorted = _sortObjectByValues(count);
  //console.log(sorted);
  let arr = sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      let name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
  //console.log(arr);
  //{ name: "Cristina Buchanan", count: 112 },
  return arr;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
