import { describe, it, expect } from "vitest";
import { ROUTE_PATH } from "../route-path";

describe("ROUTE_PATH", () => {
    it("should have the correct route paths", () => {
        expect(ROUTE_PATH).toEqual({
            HOME: "/",
            DASHBOARD: "/dashboard",
            MARKETPLACE: "/marketplace",
            PLACEORDER: "/dashboard/placeorder",
            MYORDERS: "/dashboard/orders",
            ORDERDETAIL: "/dashboard/orders/detail",
        });
    });
});
