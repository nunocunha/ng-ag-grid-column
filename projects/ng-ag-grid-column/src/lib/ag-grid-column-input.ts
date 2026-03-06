import {type ColDef} from 'ag-grid-community';
import {Prettify} from "ts-essentials";

/**
 * Type alias for <code>{@link Omit}<{@link ColDef}<TData, TValue>, 'field'></code>.
 *
 * The type of the optional `meta` argument passed to <code>{@link AgGridColumn}</code>.
 */
export type AgGridColumnInput<TData extends object, TValue> = Prettify<Omit<ColDef<TData, TValue>, 'field'>>;
