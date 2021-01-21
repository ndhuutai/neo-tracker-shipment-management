import {createReducer} from "@reduxjs/toolkit";
import {Shipment} from "../types/shipment";
import {updateShipment} from "../actions/shipment";


export const initialState: Shipment = {
    id: "",
    name: "",
    cargo: [],
    mode: "air",
    type: "FCL",
    destination: "",
    origin: "",
    services: [],
    status: "NEW",
    total: "0",
    userId: ""
}

export const shipmentReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateShipment, (state, action) => {
            const newState: Shipment = {
               ...state,
               name : action.payload.name
            }

            return newState;
        })
        .addDefaultCase(state => state)
})
