var MazeSolver = /** @class */ (function () {
    function MazeSolver() {
        this.mazeFillerElement = "<span class=\"o\">o</span>";
    }
    MazeSolver.prototype.solve = function (maze) {
        this.grid = this.getGrid(maze.split(''), 11);
        var mazeElement = document.querySelector('.maze');
        mazeElement.innerHTML = this.printMaze();
        var start = this.getCoordinate('S');
        var column = start[0];
        var row = start[1];
        this.traverse(column, row);
    };
    MazeSolver.prototype.getGrid = function (array, n) {
        var grid = [];
        while (array.length) {
            grid.push(array.splice(0, n));
        }
        return grid;
    };
    MazeSolver.prototype.printMaze = function () {
        return this.grid.map(function (grid) { return grid.join('') + "\n"; }).join('');
    };
    MazeSolver.prototype.getCoordinate = function (value) {
        var coordinate = [];
        this.grid
            .map(function (row, index) {
            if (row.includes(value)) {
                coordinate.push(index);
            }
            return row;
        })
            .find(function (row) { return row.includes(value); })
            .map(function (char, index) {
            if (char === value) {
                coordinate.push(index + 1);
            }
        });
        return coordinate;
    };
    MazeSolver.prototype.traverse = function (row, column) {
        var canTraverse = this.grid[row][column] !== '#';
        if (this.isFinish(row, column)) {
            console.log('solved');
        }
        else if (canTraverse && row > 0 && column > 0) {
            this.grid[row][column] = this.mazeFillerElement;
            this.printOutput(row, column);
        }
    };
    MazeSolver.prototype.printOutput = function (row, column) {
        var solutionElem = document.querySelector('.solution');
        if (this.canMoveUp(row, column)) {
            this.grid[row - 1][column] = this.mazeFillerElement;
            solutionElem.innerHTML = this.printMaze();
            this.traverse(row - 1, column);
        }
        else if (this.canMoveRight(row, column)) {
            this.grid[row][column + 1] = this.mazeFillerElement;
            solutionElem.innerHTML = this.printMaze();
            this.traverse(row, column + 1);
        }
        else if (this.canMoveDown(row, column)) {
            this.grid[row + 1][column] = this.mazeFillerElement;
            solutionElem.innerHTML = this.printMaze();
            this.traverse(row + 1, column);
        }
        else if (this.canMoveLeft(row, column)) {
            this.grid[row][column - 1] = this.mazeFillerElement;
            solutionElem.innerHTML = this.printMaze();
            this.traverse(row, column - 1);
        }
    };
    MazeSolver.prototype.isFinish = function (row, column) {
        return (this.grid[row][column + 1] === 'F' ||
            this.grid[row][column - 1] === 'F' ||
            this.grid[row + 1][column] === 'F' ||
            this.grid[row - 1][column] === 'F');
    };
    MazeSolver.prototype.canMoveUp = function (row, column) {
        return this.grid[row - 1][column] !== '#' && this.grid[row - 1][column] !== this.mazeFillerElement;
    };
    MazeSolver.prototype.canMoveRight = function (row, column) {
        return this.grid[row][column + 1] !== '#' && this.grid[row][column + 1] !== this.mazeFillerElement;
    };
    MazeSolver.prototype.canMoveDown = function (row, column) {
        return this.grid[row + 1][column] !== '#' && this.grid[row + 1][column] !== this.mazeFillerElement;
    };
    MazeSolver.prototype.canMoveLeft = function (row, column) {
        return this.grid[row][column - 1] !== '#' && this.grid[row][column - 1] !== this.mazeFillerElement;
    };
    return MazeSolver;
}());
var maze = new MazeSolver();
maze.solve("###########S #   #   ## # # # # ##   #   # ########## ## #       ## # ######## #   #   ## # # ### ##   #     F###########");
