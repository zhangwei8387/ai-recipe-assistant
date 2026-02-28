import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeChat } from './recipe-chat';

describe('RecipeChat', () => {
  let component: RecipeChat;
  let fixture: ComponentFixture<RecipeChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeChat],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
