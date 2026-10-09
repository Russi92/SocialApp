import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedContent } from './feed-content';

describe('FeedContent', () => {
  let component: FeedContent;
  let fixture: ComponentFixture<FeedContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
