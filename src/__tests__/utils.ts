import {comparator} from "../utils/table";
import {Shipment} from "../reducers/shipment";
import {Order} from "../types/table";


describe("comparator", () => {
    const mockData: Shipment[] = [
        {
            "id": "S1000",
            "name": "T-shirts(Summer2022) from Shanghai to Hamburg",
            "cargo": [
                {
                    "type": "Fabric",
                    "description": "1000 Blue T-shirts",
                    "volume": "2"
                },
                {
                    "type": "Fabric",
                    "description": "2000 Green T-shirts",
                    "volume": "3"
                }
            ],
            "mode": "sea",
            "type": "FCL",
            "destination": "Saarbrücker Str. 38, 10405 Berlin",
            "origin": "Shanghai Port",
            "services": [
                {
                    "type": "customs"
                }
            ],
            "total": "1000",
            "status": "ACTIVE",
            "userId": "U1000"
        },
        {
            "id": "S1001",
            "name": "New spring collection(2018)",
            "cargo": [
                {
                    "type": "Furniture",
                    "description": "300 Tables",
                    "volume": "20"
                },
                {
                    "type": "Furniture",
                    "description": "1500 Chairs",
                    "volume": "15"
                }
            ],
            "mode": "sea",
            "type": "FCL",
            "destination": "Saarbrücker Str. 38, 10405 Berlin",
            "origin": "Ningbo port",
            "services": [
                {
                    "type": "customs"
                },
                {
                    "type": "insurance",
                    "value": "100"
                }
            ],
            "total": "3000",
            "status": "NEW",
            "userId": "U1002"
        },
        {
            "id": "S1111",
            "name": "TEST",
            "cargo": [
                {
                    "type": "Furniture",
                    "description": "300 Tables",
                    "volume": "20"
                },
                {
                    "type": "Furniture",
                    "description": "1500 Chairs",
                    "volume": "15"
                }
            ],
            "mode": "sea",
            "type": "FCL",
            "destination": "Saarbrücker Str. 38, 10405 Berlin",
            "origin": "Ningbo port",
            "services": [
                {
                    "type": "customs"
                },
                {
                    "type": "insurance",
                    "value": "100"
                }
            ],
            "total": "3000",
            "status": "ACTIVE",
            "userId": "U1002"
        }
    ]

    describe("id prop - a unique string", () => {
        describe("undefined order",() => {
            it("should return 1 if a < b (because order defaults to ASC)", () => {
                expect(comparator("id", undefined)(mockData[0], mockData[1])).toBe(1);
            })
            it("should return -1 if a > b (because order defaults to ASC)", () => {
                expect(comparator("id", undefined)(mockData[1], mockData[0])).toBe(-1);
            })
        });

        describe("ASC order",() => {
            const order: Order = "asc"
            it("should return 1 if a < b (because ASC order)", () => {
                expect(comparator("id", order)(mockData[0], mockData[1])).toBe(1);
            })
            it("should return -1 if a > b (because ASC order)", () => {
                expect(comparator("id", order)(mockData[1], mockData[0])).toBe(-1);
            })
        });

        describe("DESC order",() => {
            const order: Order = "desc"
            it("should return 1 if a < b (because DESC order)", () => {
                expect(comparator("id", order)(mockData[0], mockData[1])).toBe(-1);
            })
            it("should return -1 if a > b (because DESC order)", () => {
                expect(comparator("id", order)(mockData[1], mockData[0])).toBe(1);
            })
        });
    })

    describe("status prop - a string", () => {
        describe("undefined order",() => {
            it("should return 1 if a < b (because order defaults to ASC)", () => {
                expect(comparator("status", undefined)(mockData[0], mockData[1])).toBe(1);
            })
            it("should return -1 if a > b (because order defaults to ASC)", () => {
                expect(comparator("status", undefined)(mockData[1], mockData[0])).toBe(-1);
            })
            it("should return -1 if a === b", () => {
                expect(comparator("status", undefined)(mockData[0], mockData[2])).toBe(0);
            })
        });

        describe("ASC order",() => {

            const order: Order = "asc";

            it("should return 1 if a < b (because ASC)", () => {
                expect(comparator("status", order)(mockData[0], mockData[1])).toBe(1);
            })
            it("should return -1 if a > b (because ASC)", () => {
                expect(comparator("status", order)(mockData[1], mockData[0])).toBe(-1);
            })
            it("should return -1 if a === b", () => {
                expect(comparator("status", order)(mockData[0], mockData[2])).toBe(0);
            })
        });

        describe("DESC order",() => {

            const order: Order = "desc";

            it("should return 1 if a < b (because DESC)", () => {
                expect(comparator("status", order)(mockData[0], mockData[1])).toBe(-1);
            })
            it("should return -1 if a > b (because DESC)", () => {
                expect(comparator("status", order)(mockData[1], mockData[0])).toBe(1);
            })
            it("should return -1 if a === b", () => {
                expect(comparator("status", order)(mockData[0], mockData[2])).toBe(0);
            })
        });
    })

    describe("total prop - a number", () => {
        describe("undefined order" , () => {
            const order: Order = undefined;

            it("should return greater than 0 if a < b (because undefined defaults the order to ASC)", () => {
                expect(comparator("total", order)(mockData[0], mockData[1])).toBeGreaterThan(0);
            })
            it("should return less than 0 if a > b (because undefined defaults the order to ASC)", () => {
                expect(comparator("total", order)(mockData[1], mockData[0])).toBeLessThan(0);
            })

            it("should return 0 if a === b (regardless of order)", () => {
                expect(comparator("total", order)(mockData[1], mockData[2])).toBe(-0); // JS :(
            })
        })

        describe("ASC order" , () => {
            const order: Order = "asc"

            it("should return greater than 0 if a < b (because of ASC order)", () => {
                expect(comparator("total", order)(mockData[0], mockData[1])).toBeGreaterThan(0);
            })

            it("should return less than 0 if a > b (because of ASC order)", () => {
                expect(comparator("total", order)(mockData[1], mockData[0])).toBeLessThan(0);
            })

            it("should return 0 if a === b (regardless of order)", () => {
                expect(comparator("total", order)(mockData[1], mockData[2])).toBe(-0); // JS :(
            })

        })
        describe("DESC order" , () => {
            const order: Order = "desc"

            it("should return less than 0 if a < b (because of DESC order)", () => {
                expect(comparator("total", order)(mockData[0], mockData[1])).toBeLessThan(0);
            })

            it("should return greater than 0 if a > b (because of DESC order)", () => {
                expect(comparator("total", order)(mockData[1], mockData[0])).toBeGreaterThan(0);
            })

            it("should return 0 if a === b (regardless of order)", () => {
                expect(comparator("total", order)(mockData[1], mockData[2])).toBe(0);
            })

        })
    })
})