import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {UPDATE_SHIPMENT} from "../constants/actionTypes";
import {Shipment} from "../types/shipment";

export const updateShipment = createAction<{id: string, name: string}>(UPDATE_SHIPMENT);
export const startUpdateShipment = createAsyncThunk("shipment/postByIdStatus",
    async ( {id, name} : {id:string, name: string}, {dispatch}) => {
        fetch(`http://localhost:3001/shipments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name
            })
        }).then(response => response.json())
            .then( (data: Shipment) => {
                dispatch(updateShipment({id: data.id, name: data.name}))
            })
            .catch(e => console.log('error posting'));
    }
)