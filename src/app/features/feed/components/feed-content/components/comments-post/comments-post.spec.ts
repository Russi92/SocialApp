import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsPost } from './comments-post';

describe('CommentsPost', () => {
  let component: CommentsPost;
  let fixture: ComponentFixture<CommentsPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
