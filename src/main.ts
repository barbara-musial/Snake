import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { SnakeComponent } from './app/snake.component';

bootstrapApplication(SnakeComponent, appConfig).catch((err) =>
  console.error(err),
);
