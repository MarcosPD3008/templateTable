import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, TemplateRef } from '@angular/core';
import { TableComponent } from './table.component';
import { TableHeader, TableAction } from '../../models/table.models';
import { RouterTestingModule } from '@angular/router/testing';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.loading'));
    expect(spinner).toBeTruthy();
  });

  it('should display no data message when items is empty', () => {
    component.loading = false;
    component.items = [];
    fixture.detectChanges();

    const noDataMessage = fixture.debugElement.query(By.css('.no-data'));
    expect(noDataMessage.nativeElement.textContent).toContain('No hay datos para mostrar');
  });

  it('should sort items when column header is clicked', () => {
    component.items = [
      { name: 'Banana', price: 1 },
      { name: 'Apple', price: 2 },
      { name: 'Cherry', price: 3 }
    ];
    component.headers = [
      { key: 'name', label: 'Name' },
      { key: 'price', label: 'Price' }
    ];
    fixture.detectChanges();

    const nameHeader = fixture.debugElement.query(By.css('th:first-child'));
    nameHeader.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.items[0].name).toBe('Apple');
    expect(component.items[1].name).toBe('Banana');
    expect(component.items[2].name).toBe('Cherry');

    nameHeader.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.items[0].name).toBe('Cherry');
    expect(component.items[1].name).toBe('Banana');
    expect(component.items[2].name).toBe('Apple');
  });

  it('should trigger action when action is selected', () => {
    const actionFunction = jasmine.createSpy('actionFunction');
    component.actions = [
      { _id: '1', label: 'Edit', function: actionFunction },
      { _id: '2', label: 'Delete' }
    ];
    component.items = [{ name: 'Item 1' }];
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', { target: { value: '1' }, preventDefault: () => {}, stopPropagation: () => {} });
    fixture.detectChanges();

    expect(actionFunction).toHaveBeenCalledWith(component.items[0]);
  });

  it('should emit actionPress event when action without function is selected', () => {
    spyOn(component.actionPress, 'emit');
    component.actions = [
      { _id: '1', label: 'Edit' },
      { _id: '2', label: 'Delete' }
    ];
    component.items = [{ name: 'Item 1' }];
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', { target: { value: '1' }, preventDefault: () => {}, stopPropagation: () => {} });
    fixture.detectChanges();

    expect(component.actionPress.emit).toHaveBeenCalledWith({ action: component.actions[0], item: component.items[0] });
  });
});
