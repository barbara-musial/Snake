import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameAreaComponent } from './game-area/game-area.component';

@Component({
  selector: 'snake',
  standalone: true,
  imports: [RouterOutlet, GameAreaComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss',
})
export class SnakeComponent {
  title: string = 'Snake';
}
