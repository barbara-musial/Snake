import { TestBed } from '@angular/core/testing';
import { SnakeComponent } from './snake.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SnakeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'snake' title`, () => {
    const fixture = TestBed.createComponent(SnakeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('snake');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SnakeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, snake');
  });
});
