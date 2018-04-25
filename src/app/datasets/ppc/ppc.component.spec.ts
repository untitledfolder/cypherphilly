import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpcComponent } from './ppc.component';

describe('PpcComponent', () => {
  let component: PpcComponent;
  let fixture: ComponentFixture<PpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
