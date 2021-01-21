import {Order} from "../types/table";
import {Shipment} from "../types/shipment";

export const comparator = (prop: keyof Shipment, columnOrder: Order) => (a: Shipment, b: Shipment) => {

    const order = columnOrder === "desc" ? 1 : -1;

    if(prop === "total") {
        return (parseInt(a[prop]) - parseInt(b[prop])) * order;
    }
    if (a[prop] < b[prop]) {
        return -1 * order;
    }
    if (a[prop] > b[prop]) {
        return 1 * order;
    }
    return 0;
}