
import {Shipment} from "./shipment";

export type Order = "asc" | "desc" | undefined

export interface Column {
    id: keyof Shipment,
    label: keyof Shipment,
    minWidth?: number,
    align?: "right",
    order?: Order
    active: boolean,
    hiddenAtSm?: boolean
}


export interface Filters {
    [key: string]: boolean,
}