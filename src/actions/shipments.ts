import {createAction} from "@reduxjs/toolkit";
import {Shipment} from "../types/shipment";
import {REMOVE_SHIPMENT, SET_SHIPMENT} from "../constants/actionTypes";

export const setShipments = createAction<Shipment[]>(SET_SHIPMENT);
export const removeShipment = createAction<string>(REMOVE_SHIPMENT);
