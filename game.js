const SIZE = 5;
const AVAILABLE_VALUES = [2, 4, 8];
const gameMatrix = randomMatrix();
let isGameOver = false;

function moveLeft() {
    gameMatrix.forEach(function (row) {
        reverse(row);
        shiftRight(row);
        reverse(row);
    });

    addRandomGameNumber();
}

function moveRight() {
    gameMatrix.forEach((row) => shiftRight(row));
    addRandomGameNumber();
}

function moveUp() {
    var transposedMatrix = transposeMatrix(gameMatrix);
    transposedMatrix.forEach((row, i) => {
        reverse(row);
        shiftRight(row);
        reverse(row);
    });
    transposeMatrix(transposedMatrix).forEach((row, i) => gameMatrix[i] = row);

    addRandomGameNumber();
}

function moveDown() {
    var transposedMatrix = transposeMatrix(gameMatrix);
    transposedMatrix.forEach((row) => shiftRight(row));

    transposeMatrix(transposedMatrix).forEach((row, i) => {
        gameMatrix[i] = row;
    });

    addRandomGameNumber();
}

function reverse(arr) {
    for (let i = 0; i <= Math.floor(arr.length / 2); i++) {
        var j = arr.length - i - 1;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function shiftRight(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (isNotNullAndEquals(arr[i], arr[j]) && !hasEqualsRighter(arr, j) && isEmptyRoad(arr, i, j)) {
                arr[i] = null;
                arr[j] *= 2;
                shiftRight(arr);
                return;
            }
        }
    }

    let emptyCellIndex = firstEmptyFromTheEnd(arr);
    for (let i = emptyCellIndex - 1; i >= 0; i--) {
        if (arr[i]) {
            arr[emptyCellIndex] = arr[i];
            arr[i] = null;
            emptyCellIndex = firstEmptyFromTheEnd(arr);
        }
    }
}

function isNotNullAndEquals(num1, num2) {
    return num1 && num2 && num1 == num2;
}

function hasEqualsRighter(row, index) {
    for (var i = index + 1; i < row.length; i++) {
        if (row[i] != null && row[index] != row[i]) {
            return false;
        }

        if (row[index] === row[i]) {
            return true;
        }
    }

    return false;
}

function firstEmptyFromTheEnd(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (!arr[i]) {
            return i;
        }
    }

    return false;
}

function isEmptyRoad(arr, start, end) {
    for (let i = start + 1; i < end; i++) {
        if (arr[i]) {
            return false;
        }
    }

    return true;
}

function transposeMatrix(matrix) {
    var transposedMatrix = [];

    matrixForEach(matrix, (element, i, j) => {
        if (!transposedMatrix[j]) {
            transposedMatrix[j] = [];
        }

        transposedMatrix[j][i] = matrix[i][j];
    });

    return transposedMatrix;
}

function randomMatrix() {
    var randomMatrix = [];
    for (let i = 0; i < SIZE; i++) {
        randomMatrix[i] = [];
    }

    for (let i = 0; i < SIZE * 2; i++) {
        let point = randomEmptyCell(randomMatrix);
        randomMatrix[point.row][point.column] = randomGameNumber();
    }

    matrixForEach(randomMatrix, (value, i, j) => {
        if (!value) {
            randomMatrix[i][j] = null;
        }
    });

    return randomMatrix;
}

function randomEmptyCell(matrix) {
    var i = random(0, SIZE);
    var j = random(0, SIZE);

    while (matrix[i][j]) {
        i = random(0, SIZE);
        j = random(0, SIZE);
    }

    return {
        row: i,
        column: j
    }
}

function checkGameMatrixHasEmptyCells() {
    var hasEmpty = false;
    matrixForEach(gameMatrix, (value) => hasEmpty = hasEmpty || !value);

    return hasEmpty;
}

function addRandomGameNumber() {
    if (!checkGameMatrixHasEmptyCells()) {
        isGameOver = true;
        throw 'Game Over';
    }

    var number = randomGameNumber();
    var point = randomEmptyCell(gameMatrix);

    gameMatrix[point.row][point.column] = number;
}

function randomGameNumber() {
    var indexInInitial = Math.floor(Math.random() * (AVAILABLE_VALUES.length + 1));
    return AVAILABLE_VALUES[indexInInitial];
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function matrixForEach(matrix, callback) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            callback(matrix[i][j], i, j, matrix);
        }
    }
}

function isOver() {
    return isGameOver;
}

function computeScore() {
    var sum = 0;
    matrixForEach(gameMatrix, (value) => sum += value ? value : 0);

    return sum;
}

function print() {
    var output = '';
    gameMatrix.forEach((row) => {
        row.forEach((element) => {
            output += element ? element : ' ';
        });
        output += '\n';
    });
    output += '-----';
    console.log(output);
}

module.exports = {
    matrix: gameMatrix,
    isOver: isOver,
    moveDown: moveDown,
    moveUp: moveUp,
    moveRight: moveRight,
    moveLeft: moveLeft,
    score: computeScore,
    print: print
};