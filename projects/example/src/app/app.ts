import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {AgGridAngular} from 'ag-grid-angular';
import {generateColumnDefsFrom} from '@nunocunha/ng-ag-grid-column';
import {Product} from './product.model';

@Component({
    selector: 'app-root',
    imports: [AgGridAngular, AsyncPipe],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly columnDefs$ = generateColumnDefsFrom(Product);

    protected readonly rows: Product[] = [
        {name: 'Widget', price: 9.99, stock: 42},
        {name: 'Gadget', price: 19.99, stock: 7},
    ];
}
