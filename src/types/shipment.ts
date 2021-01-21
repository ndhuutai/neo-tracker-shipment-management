export type Mode = "sea" | "air"

export type ContainerType = "LCL" | "FCL"

export type ServiceType = "insurance" | "customs"

export type Status = "NEW" | "ACTIVE" | "COMPLETED"

export interface Service  {
    type: ServiceType,
    value?: string
}

export interface Cargo  {
    type: string,
    description: string,
    volume: string
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
    total: string,
    status: Status,
    userId: string,
}