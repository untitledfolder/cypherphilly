import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Table.PageComponent } from './table.page.component';

describe('Table.PageComponent', () => {
  let component: Table.PageComponent;
  let fixture: ComponentFixture<Table.PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Table.PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Table.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
