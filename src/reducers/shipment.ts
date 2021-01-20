import {createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
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
    cargo: Cargo[],
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
    cargo: [],
    mode: 'air',
    type: "FCL",
    destination: '',
    origin: '',
    services: [],
    status: 'NEW',
    total: 0,
    userId: ''
}

export const updateShipment = createAction<{id: string, name: string}>(UPDATE_SHIPMENT);
export const updateLocalShipment = createAsyncThunk("shipment/postByIdStatus",
async (id:string, {dispatch}) => {
}
)
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
