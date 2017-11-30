/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  const solution = [];
  // board must have size n
  const board = new Board({'n': n});

  // add 'rooks' to board, checking for no row conflicts
  for (let i = 0; i < n; i++){
    board.togglePiece(i, i);
    solution.push(board._currentAttributes[i]);
  }
  // if pass return return board._currentAttributes mapped to an array
  // for (let i = 0; i < n; i++){
  //   solution.push(board._currentAttributes[i]);
  // }

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  const board = new Board({'n': n});
  let solutionCount = 0;
  let pieces = [];
  let rowIndex = 0;
  let colIndex = 0;
  // let placed = 0;
  // let ran = 0;

  function searchColumns() { // this finds a col to place a rook every time it runs except the last
    // ran++;
    // console.log('ran ',ran);
    for (let i = colIndex; i < n; i++) {
      board.togglePiece(rowIndex, i); 
      if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts()) {
        pieces.push({col: i, row: rowIndex});
        // placed++;
        // console.log('placed ',placed);
        if (pieces.length === n) { 
          solutionCount++;
        } else {
          i = -1;
          rowIndex++;
        }
      } else { 
        board.togglePiece(rowIndex, i); 
        continue; 
      }
    }
  }
  searchColumns();

  while (rowIndex > 0) {
    // how can I know ahead of time if no columns are viable? need to know existing rook col, total num cols
    rowIndex = pieces[pieces.length - 1].row;
    colIndex = pieces[pieces.length - 1].col + 1;
    pieces.pop();
    board.togglePiece(rowIndex, colIndex-1);
    searchColumns();
  }

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  const board = new Board({'n': n});
  let pieces = [];
  let rowIndex = 0;
  let colIndex = 0;
  var solution = [];
  var x = 0;
  // populate solution with blank arrays for n=2 & n=3
  if (n === 2 || n === 3) {
    for (let j = 0; j < n; j++) {
      solution.push([])
    }
    return solution;
  }

  function searchColumns() {
    for (let i = colIndex; i < n; i++) { // iterates over columns
      board.togglePiece(rowIndex, i); // place piece
      if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) { // check if piece has conflict
        pieces.push({col: i, row: rowIndex}); // add piece to pieces array
        if (pieces.length === n) { // if all pieces are placed
          for (var key in board.attributes) {
            solution.push(board.attributes[key]);
          }
          x = 1;
          return;
        } else {
          i = -1; // reset column
          rowIndex++; // increment row  
        }
      } else { // there was a conflic
        board.togglePiece(rowIndex, i); // remove piece
        continue; // next column
      }
    }
  }
  searchColumns();
  while (rowIndex > 0 && x === 0) {
    rowIndex = pieces[pieces.length - 1].row;
    colIndex = pieces[pieces.length - 1].col + 1;
    pieces.pop(1);
    solution.pop();
    board.togglePiece(rowIndex, colIndex-1);
    searchColumns();
  }

  solution.pop(); // last key is always n
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  const board = new Board({'n': n});
  let pieces = [];
  let rowIndex = 0;
  let colIndex = 0;
  let solutionCount = 0;
  //let count = 0;

  function searchColumns() {
    for (let i = colIndex; i < n; i++) { // iterates over columns
      board.togglePiece(rowIndex, i); // place piece
      if (!board.hasAnyColConflicts() && !board.hasAnyRowConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) { // check if piece has conflict
        pieces.push({col: i, row: rowIndex}); // add piece to pieces array
        if (pieces.length === n) { // if all pieces are placed
          solutionCount++;
        } else {
          i = -1; // reset column
          rowIndex++; // increment row  
        }
      } else { // there was a conflic
        board.togglePiece(rowIndex, i); // remove piece
        continue; // next column
      }
    }
  }
  searchColumns();
    while (rowIndex > 0) {
      //count++;
      rowIndex = pieces[pieces.length - 1].row;
      colIndex = pieces[pieces.length - 1].col + 1;
      pieces.pop(1);
      board.togglePiece(rowIndex, colIndex-1);
      searchColumns();
    }
  //console.log('for n', n,'callback count =', count, 'solutionCount =', solutionCount);
  return solutionCount;
};
