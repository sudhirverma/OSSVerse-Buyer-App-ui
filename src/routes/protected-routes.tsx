import DashboardPage from "@/pages/(dashboard)/dashboard-page";
import type { RouteObject } from "react-router-dom";
import { ROUTE_PATH } from "./route-path";
import PlaceOrderPage from "@/pages/(dashboard)/placeorder/placeorder-page";
import MyOrdersPage from "@/pages/(dashboard)/my-orders/my-orders-page";
import OrderDetailsPage from "@/pages/(dashboard)/my-orders/orderdetails/orderdetails-page";

const ProtectedRoutes: RouteObject[] = [
  {
    path: ROUTE_PATH.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: `${ROUTE_PATH.PLACEORDER}/:id`,
    element: <PlaceOrderPage />,
  },
  {
    path: ROUTE_PATH.MYORDERS,
    element: <MyOrdersPage />,
  },
  {
    path: `${ROUTE_PATH.ORDERDETAIL}/:id`,
    element: <OrderDetailsPage />,
  },
];

export default ProtectedRoutes;
