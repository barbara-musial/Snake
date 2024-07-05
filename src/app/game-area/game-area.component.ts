import { Component, HostListener, OnInit } from '@angular/core';
import { Point } from '../interfaces/point.interface';
import { FillPipe } from '../pipes/fill/fill.pipe';
import { Move } from '../enums/move.enum';
import { NgForOf, NgIf } from '@angular/common';

const gridCellXYAmountSCSSVariable = '--grid-cell-x-y-amount';
const gridCellSCSSVariable = '--grid-cell-size';
const gridCellXYAmount: number = 40;
const gridCellSize: number = 15;
const snakeStartPosition: Point = {
  x: Math.floor(gridCellXYAmount / 2),
  y: Math.floor(gridCellXYAmount / 2),
};
const pointsCount: number = 10;
const speed: number = 200;

@Component({
  selector: 'snake-game-area',
  standalone: true,
  imports: [FillPipe, NgIf, NgForOf],
  templateUrl: './game-area.component.html',
  styleUrl: './game-area.component.scss',
})
export class GameAreaComponent implements OnInit {
  public gridSize: number = Math.pow(gridCellXYAmount, 2);
  public score: number = 0;
  public isGameOver: boolean = false;
  public isGameNotStarted: boolean = true;

  private snake: Point[] = [snakeStartPosition];
  private direction: Move = Move.RIGHT;
  private food: Point = this.randomFoodPosition();
  private gameInterval!: number;

  public ngOnInit(): void {
    this.setSCSSVariable(gridCellXYAmountSCSSVariable, gridCellXYAmount);
    this.setSCSSVariable(gridCellSCSSVariable, gridCellSize);
  }

  public startGame(): void {
    this.resetGame();
    this.isGameNotStarted = false;
    this.isGameOver = false;
    this.gameInterval = window.setInterval(() => {
      this.update();
    }, speed);
  }

  public isSnake(index: number): boolean {
    const { x, y } = this.indexToPoint(index);
    return this.snake.some((part) => part.x === x && part.y === y);
  }

  public isFood(index: number): boolean {
    const { x, y } = this.indexToPoint(index);
    return this.food.x === x && this.food.y === y;
  }

  @HostListener('window:keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        if (this.direction !== Move.DOWN) this.direction = Move.UP;
        break;
      case 'ArrowDown':
      case 's':
        if (this.direction !== Move.UP) this.direction = Move.DOWN;
        break;
      case 'ArrowLeft':
      case 'a':
        if (this.direction !== Move.RIGHT) this.direction = Move.LEFT;
        break;
      case 'ArrowRight':
      case 'd':
        if (this.direction !== Move.LEFT) this.direction = Move.RIGHT;
        break;
    }
  }

  private resetGame(): void {
    this.snake = [snakeStartPosition];
    this.direction = Move.RIGHT;
    this.food = this.randomFoodPosition();
    this.score = 0;
  }

  private update(): void {
    const head = { ...this.snake[0] };

    switch (this.direction) {
      case Move.RIGHT:
        head.x += 1;
        break;
      case Move.LEFT:
        head.x -= 1;
        break;
      case Move.UP:
        head.y -= 1;
        break;
      case Move.DOWN:
        head.y += 1;
        break;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.food = this.randomFoodPosition();
      this.score += pointsCount;
    } else {
      this.snake.pop();
    }

    if (this.checkCollision(head)) {
      this.endGame();
    }
  }

  private indexToPoint(index: number): Point {
    return {
      x: index % gridCellXYAmount,
      y: Math.floor(index / gridCellXYAmount),
    };
  }

  private randomFoodPosition(): Point {
    let position: Point;
    do {
      position = {
        x: Math.floor(Math.random() * gridCellXYAmount),
        y: Math.floor(Math.random() * gridCellXYAmount),
      };
    } while (
      this.snake.some((part) => part.x === position.x && part.y === position.y)
    );
    return position;
  }

  private checkCollision(head: Point): boolean {
    const isCollisionWithBorder =
      head.x < 0 ||
      head.x >= gridCellXYAmount ||
      head.y < 0 ||
      head.y >= gridCellXYAmount;
    if (isCollisionWithBorder) {
      return true;
    }

    for (let part of this.snake.slice(1)) {
      const isCollisionWithPart = head.x === part.x && head.y === part.y;
      if (isCollisionWithPart) {
        return true;
      }
    }

    return false;
  }

  private endGame(): void {
    clearInterval(this.gameInterval);
    this.isGameOver = true;
  }

  private setSCSSVariable(variable: string, value: number | string): void {
    document.documentElement.style.setProperty(
      variable,
      value as unknown as string,
    );
  }
}
