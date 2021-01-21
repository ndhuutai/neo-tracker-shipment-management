import {createReducer} from "@reduxjs/toolkit";
import {shipmentReducer} from './shipment';
import {Shipment} from "../types/shipment";
import {updateShipment} from "../actions/shipment";
import {removeShipment, setShipments} from "../actions/shipments";

const initialState: Shipment[] = [];

export const shipmentsReducer = createReducer(initialState, builder => {
    builder
        .addCase(setShipments, (state, action) => {
            return action.payload
        })
        .addCase(updateShipment, (state, action) => {
            return state.map(shipment => {
                if(shipment.id === action.payload.id) {
                    return shipmentReducer(shipment, action)
                }
                return shipment;
            })
        })
        .addCase(removeShipment,(state,action) => {
            return state.filter(shipment => shipment.id !== action.payload)
        })
        .addDefaultCase(state => state)
})





