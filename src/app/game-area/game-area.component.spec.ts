import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAreaComponent } from './game-area.component';

describe('GameComponent', () => {
  let component: GameAreaComponent;
  let fixture: ComponentFixture<GameAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
