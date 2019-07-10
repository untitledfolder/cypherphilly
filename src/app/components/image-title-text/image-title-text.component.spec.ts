import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTitleTextComponent } from './image-title-text.component';

describe('ImageTitleTextComponent', () => {
  let component: ImageTitleTextComponent;
  let fixture: ComponentFixture<ImageTitleTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTitleTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTitleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
