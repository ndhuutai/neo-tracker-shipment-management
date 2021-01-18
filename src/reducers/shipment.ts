import {createAction, createReducer} from "@reduxjs/toolkit";
import {UPDATE_SHIPMENT} from '../constants/actionTypes'

type Mode = "sea" | "air"

type ContainerType = "LCL" | "FCL"

type ServiceType = "insurance" | "customs"

type Status = "NEW" | "ACTIVE" | "COMPLETED"

interface Service  {
    type: ServiceType,
    value?: number
}

interface Cargo  {
    type: string,
    description: string,
    volume: number
}

export interface Shipment {
    id: string,
    name: string
    cargos: Cargo[],
    mode: Mode,
    type: ContainerType,
    destination: string,
    origin: string,
    services : Service[],
    total: number,
    status: Status,
    userId: string,
}

export const initialState: Shipment = {
    id: '',
    name: '',
    cargos: [],
    mode: 'air',
    type: "FCL",
    destination: '',
    origin: '',
    services: [],
    status: 'NEW',
    total: 0,
    userId: ''
}

export const updateShipment = createAction<string>(UPDATE_SHIPMENT);

export const shipmentReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateShipment, (state, action) => {
                state.name = action.payload
        })
        .addDefaultCase(state => state)
})
