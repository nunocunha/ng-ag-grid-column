import {AgGridColumn} from '@nunocunha/ng-ag-grid-column';

export class Product {
    @AgGridColumn({headerName: 'product.name', sortable: true})
    name!: string;

    @AgGridColumn({headerName: 'product.price', sortable: true, filter: 'agNumberColumnFilter'})
    price!: number;

    @AgGridColumn({headerName: 'product.stock'})
    stock!: number;
}
