class MazeSolver {

  private mazeFillerElement = `<span class="o">o</span>`;
  private grid;

  constructor() {}

  public solve(maze: string): void {
    this.grid = this.getGrid(maze.split(''), 11);

    const mazeElement = document.querySelector('.maze');
    mazeElement.innerHTML = this.printMaze();
    
    const start = this.getCoordinate('S');
  
    let column = start[0];
    let row = start[1];
    this.traverse(column, row);
  }

  private getGrid(array: string[], n: number): Array<string[]> {
    let grid = [];
    while (array.length) {
      grid.push(array.splice(0, n));
    }
    return grid;
  }
  
  private printMaze(): string {
    return this.grid.map(grid => `${grid.join('')}\n`).join('');
  }

  private getCoordinate(value: string): number[] {
    let coordinate = [];
    this.grid
      .map((row, index) => { 
        if (row.includes(value)) {
          coordinate.push(index);
        }
        return row;
      })
      .find(row => row.includes(value))
      .map((char, index) => {
        if (char === value) {
          coordinate.push(index + 1);
        }
      });
  
      return coordinate;
  }


  private traverse(row, column): void {
    const canTraverse = this.grid[row][column] !== '#';

    if (this.isFinish(row, column)) {
      console.log('solved');
    } else if (canTraverse && row > 0 && column > 0) {
      this.grid[row][column] = this.mazeFillerElement;
      this.printOutput(row, column);
    }
  }

  private printOutput(row: number, column: number): void {
    const solutionElem = document.querySelector('.solution');

    if (this.canMoveUp(row, column)) {
      this.grid[row - 1][column] = this.mazeFillerElement;
      solutionElem.innerHTML = this.printMaze();
      this.traverse(row - 1, column)
    } else if (this.canMoveRight(row, column)) {
      this.grid[row][column + 1] = this.mazeFillerElement;
      solutionElem.innerHTML = this.printMaze();
      this.traverse(row, column + 1)
    } else if (this.canMoveDown(row, column)) {
      this.grid[row + 1][column] = this.mazeFillerElement;
      solutionElem.innerHTML = this.printMaze();
      this.traverse(row + 1, column)
    } else if (this.canMoveLeft(row, column)) {
      this.grid[row][column - 1] = this.mazeFillerElement;
      solutionElem.innerHTML = this.printMaze();
      this.traverse(row, column - 1)
    }
  }

  private isFinish(row, column): boolean {
    return (
      this.grid[row][column + 1] === 'F' ||
      this.grid[row][column - 1] === 'F' ||
      this.grid[row + 1][column] === 'F' ||
      this.grid[row - 1][column] === 'F'
    );
  }

  private canMoveUp(row: number, column: number): boolean {
    return this.grid[row - 1][column] !== '#' && this.grid[row - 1][column] !== this.mazeFillerElement;
  }

  private canMoveRight(row: number, column: number): boolean {
    return this.grid[row][column + 1] !== '#' && this.grid[row][column + 1] !== this.mazeFillerElement;
  }

  private canMoveDown(row: number, column: number): boolean {
    return this.grid[row + 1][column] !== '#' && this.grid[row + 1][column] !== this.mazeFillerElement;
  }

  private canMoveLeft(row: number, column: number): boolean {
    return this.grid[row][column - 1] !== '#' && this.grid[row][column - 1] !== this.mazeFillerElement;
  }
}

const maze = new MazeSolver();
maze.solve(`###########S #   #   ## # # # # ##   #   # ########## ## #       ## # ######## #   #   ## # # ### ##   #     F###########`);