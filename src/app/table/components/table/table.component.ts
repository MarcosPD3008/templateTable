import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Sorter, sortList } from '../../helpers/filter';
import { TableAction, TableHeader } from '../../models/table.models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() items: any[] = [];
  @Input() headers: TableHeader[] = [];
  @Input() template: TemplateRef<any> | null = null;
  @Input() noDataMessage: string = 'No hay datos para mostrar';
  @Input() loading: boolean = false;
  @Input() actions: TableAction[] = [];

  @Output() actionPress: EventEmitter<{ action: TableAction, item: any }> = new EventEmitter();

  sorter: Sorter = {};

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.sorter = {};
    }

    if (changes['actions']) {
      this.actions = this.actions.map(action => ({
        ...action,
        _id: action._id ?? Math.random().toString(36).substring(2, 9)
      }));
    }
  }

  sortList(column: string) {
    this.sorter[column] = this.sorter[column] === 'asc' ? 'desc' : 'asc';
    this.items = sortList(this.items, column, this.sorter[column]);
  }

  onActionChange(event: Event, item: any) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLSelectElement;
    const action = this.actions.find(action => action._id === target.value);

    if (action) {
      if (action.function) {
        action.function(item);
      } else {
        this.actionPress.emit({ action, item });
      }
    }
  }
}