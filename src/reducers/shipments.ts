import {createReducer, createAction} from "@reduxjs/toolkit";
import {Shipment, updateShipment, shipmentReducer} from './shipment';
import {REMOVE_SHIPMENT, SET_SHIPMENT} from "../constants/actionTypes";

const initialState: Shipment[] = [];

export const setShipments = createAction<Shipment[]>(SET_SHIPMENT);
export const removeShipment = createAction<string>(REMOVE_SHIPMENT);

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





