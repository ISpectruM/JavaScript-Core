function solve(primary, secondary, overlay, start) {
    //Decode map
    for (let startPoint of overlay) {
        let rowOverlay = startPoint[0];
        let colOverlay = startPoint[1];

        for (let row = 0; row < secondary.length; row++) {
            for (let col = 0; col < secondary[row].length; col++) {

                if (secondary[row][col] === 1) {
                    try {
                        let primaryCell = primary[row + rowOverlay][col + colOverlay];
                        if (primaryCell !== 0) {
                            primary[row + rowOverlay][col + colOverlay] = 0;
                        } else {
                            primary[row + rowOverlay][col + colOverlay] = 1;
                        }
                    } catch (e) {
                    }
                }
            }
        }
    }

    let startRow = start[0];
    let startCol = start[1];
    let steps = 1;

    let currRow = startRow;
    let currCol = startCol;
    let isDeadEnd;
    let isExitAvailable;

    //Follow the path
    while (true) {
        isDeadEnd = true;
        isExitAvailable = false;

        if (currRow - 1 >= 0) {
            if (isWayAvailable(-1, 0)) {
                isDeadEnd = false;
                continue;
            }
        }else isExitAvailable = true;

        if (currCol - 1 >= 0) {
            if (isWayAvailable(0, -1)) {
                isDeadEnd = false;
                continue;
            }
        }else isExitAvailable = true;

        if (currRow + 1 <= primary.length - 1) {
            if (isWayAvailable(1, 0)) {
                isDeadEnd = false;
                continue;
            }
        }else isExitAvailable = true;

        if (currCol + 1 <= primary[currRow].length - 1) {
            if (isWayAvailable(0, 1)) {
                isDeadEnd = false;
                continue;
            }
        }else isExitAvailable = true;

        if (isDeadEnd) {
            if (isExitAvailable && isExit()) {
                isDeadEnd = false;
            }
            break;
        }
    }
    if (isDeadEnd) {
        console.log(steps);
        console.log("Dead end " + getQuadrant(currRow, currCol));
    } else {
        console.log(steps);
        console.log(checkDirection());
    }
    function checkDirection() {
        if (currRow === 0) return 'Top';
        if (currCol === 0) return 'Left';
        if (currRow === primary.length-1) return 'Bottom';
        if (currCol === primary[currRow].length-1) return 'Right'
    }

    function isExit() {
        return !((currRow === startRow && currCol === startCol) ||
            currRow === 0 && currCol === 0 ||
            currRow === primary.length - 1 && currCol === primary[currRow].length - 1 ||
            currRow === 0 && currCol === primary[currRow].length - 1 ||
            currRow === primary.length - 1 && currCol === 0);
    }

    function isWayAvailable(row, col) {
        if (primary[currRow + row][currCol + col] === 0) {
            primary[currRow][currCol] = 1;
            currRow += row;
            currCol += col;
            steps++;
            return true;
        }
        return false;
    }

    function getQuadrant(startRow, startCol) {
        let xThreshold = Math.floor((primary[0].length) / 2);
        let yThreshold = Math.floor((primary.length) / 2);

        if (startRow < yThreshold && startCol < xThreshold) return 2;
        if (startRow >= yThreshold && startCol < xThreshold) return 3;
        if (startRow < yThreshold && startCol >= xThreshold) return 1;
        if (startRow >= yThreshold && startCol >= xThreshold) return 4;
    }

}

solve([[1, 1, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 0, 0]],
    [[0, 1, 1],
        [0, 1, 0],
        [1, 1, 0]],
    [[1, 1],
        [2, 3],
        [5, 3]],
    [0, 2]


);
