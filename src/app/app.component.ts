import { Component } from '@angular/core';
import { TableHeader } from './table/models/table.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  headers: TableHeader[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'age', label: 'Edad' },
    { key: 'city', label: 'Ciudad' },
  ];

  items = [
    { name: 'Juan', age: 25, city: 'Medellin' },
    { name: 'Pedro', age: 30, city: 'Bogota' },
    { name: 'Maria', age: 22, city: 'Cali' },
  ];

  actions = [
    { label: 'Editar', icon: 'edit', function: this.editItem },
    { label: 'Eliminar', icon: 'delete', function: this.deleteItem },
  ];

  editItem(item: any) {
    console.log('Edit item', item);
  }

  deleteItem(item: any) {
    console.log('Delete item', item);
  }

  ageColor(age: number): string {
    if (age < 25) {
      return 'red';
    } else if (age < 30) {
      return 'orange';
    } else {
      return 'green';
    }
  }
}
