import {createReducer, createAction} from "@reduxjs/toolkit";
import {Shipment, updateShipment, shipmentReducer, initialState as initialShipmentState} from './shipment';
import {REMOVE_SHIPMENT} from "../constants/actionTypes";


interface Shipments {
    shipments: Shipment[];
}

const initialState: Shipments = {
    shipments: []
};

export const removeShipment = createAction<string>(REMOVE_SHIPMENT);

export const shipmentsReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateShipment, (state, action) => {
            state.shipments = state.shipments.map(shipment => shipmentReducer(shipment, action))
        })
        .addCase(removeShipment,(state,action) => {
            state.shipments = state.shipments.filter(shipment => shipment.id !== action.payload)
        })
})





