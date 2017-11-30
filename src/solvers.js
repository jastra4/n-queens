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
  for (let i = 0; i < n; i ++){
    board.togglePiece(i, i);
  }
  // if pass return return board._currentAttributes mapped to an array
  for (let i = 0; i < n; i++){
    solution.push(board._currentAttributes[i]);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;

  const board = new Board({'n': n});

  const realBoard = board._currentAttributes;

  //Place rook at (0,0)
  board.togglePiece(0,0);

  function checkSubsequentRow (row,n){

  }

  // Loop through every row
  for (let i = 0; i < n; i++){
    if (board.hasNoneInRow(i)){
      // Loop through every col in that row
      for (let j = 0; j < n; j++){
        if (board.hasNoneInCol(j)){
          board.togglePiece(i, j);
          if (board.hasNoneInRow(i+1)){
            // loop through every col in subsequent row
            for (let k = 0; k < n; k++){
              if (board.hasNoneInCol(k)){
                board.togglePiece(i+1, k);
                if (board.hasNoneInRow(i+2)){
                  // checking last row
                  for (let l = 0; l < n; l++){
                    if (board.hasNoneInCol(l)){
                      solutionCount++;
                    }
                  }
                }
              } else {
                continue;
              }
              board.togglePiece(i+1, k);
            }
          }
        } else {
          continue;
        }
        board.togglePiece(i, j);
      }
    } else {
      continue;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];

  const board = new Board(n);

  // add queen to each row, checking for now Conflicts
  for (let i = 0; i < n; i++){
    board.togglePiece(0,0)
    for (let j = 0; j < n; j++){
      board.togglePiece(i,j);
      if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !hasAnyMajorDiagonalConflicts() && !hasAnyMinorDiagonalConflicts()){
        continue;
      } else {
        board.togglePiece(i,j);
        break;
      }
    }
    if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !hasAnyMajorDiagonalConflicts() && !hasAnyMinorDiagonalConflicts()){
      return [board._currentAttributes];
    }
  }
  return false;
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
