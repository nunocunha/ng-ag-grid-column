import type {ColDefField} from 'ag-grid-community';
import {Prettify} from "ts-essentials";
import {AgGridColumnInput} from "./ag-grid-column-input";

/**
 * Internal type representing stored metadata per column.
 */
export type AgGridColumnMeta<TData extends object, TValue> = Prettify<AgGridColumnInput<TData, TValue> & {
    field: ColDefField<TData, TValue>;
}>;
