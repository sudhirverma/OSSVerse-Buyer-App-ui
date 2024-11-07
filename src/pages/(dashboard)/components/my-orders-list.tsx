import ProjectIcon from "@/components/icons/project-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Span } from "@/components/ui/span";
import type { Order, Response } from "@/services/myorders-service";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "@/lib/utils";
dayjs.extend(relativeTime);

const getSpanVariant = (status: string) => {
  let variant:
    | "default"
    | "success"
    | "progress"
    | "pending"
    | "destructive"
    | null
    | undefined;
  switch (status) {
    case "Pending Acceptance":
      variant = "pending";
      break;
    case "Work in Progress":
      variant = "progress";
      break;
    case "Delivered (Completed)":
      variant = "success";
      break;
  }
  return variant;
};

export const OrderCard = ({ order }: { order: Response }) => {
  return (
    <Link to={`/dashboard/orders/detail/${order.message.order.id ?? ""}`}>
      <Card className="max-w-full ld:max-w-[300px] sm:max-w-[280px] md:max-w-[290px] border rounded-lg overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="space-y-2">
            <Badge
              variant={"secondary"}
              className=" h-16 w-16 flex items-center justify-center rounded-full"
            >
              <ProjectIcon className="h-8 w-8" />

              {/* {order.type === "PROJECT" ? (
              <ProjectIcon className="h-8 w-8" />
              ) : (
                <MLModelIcon className="h-8 w-8" />
              )} */}
            </Badge>
            <h3 className="text-lg font-semibold ">
              {order?.message?.order?.items[0]?.descriptor?.name}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            Last update {dayjs(order?.message?.order?.updated_at).fromNow()}
          </div>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <div className="text-muted-foreground">Transaction ID</div>
              <div>{order?.message?.order?.id.slice(0, 8)}...</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Assigned OASP</div>
              <div>
                {/* {order.assignedOASP} */}
                DevOp Solution
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <div className="text-muted-foreground">Delivery Date</div>
              {/* <div>{"-"}</div> */}
              {order?.message?.order?.created_at && (
                <div className="text-muted-foreground">
                  {dayjs(order?.message?.order?.created_at).format(
                    "DD MMM YYYY",
                  )}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Order Status</div>
              <div>
                <Span variant={"success"}>{order?.message?.order?.state}</Span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-6 mt-auto">
          <div>
            <Button>View</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export const OrderListHeader = () => {
  return (
    <div className="sm:w-[50rem] md:w-[60rem] xl:w-full 2xl:w-[90rem] bg-secondary rounded-lg p-4">
      <div className="grid grid-cols-8">
        <div className="col-span-3">Order Project Name</div>
        <div>Transaction ID</div>
        <div>Assigned OASP</div>
        <div>Delivery Date</div>
        <div className="col-span-2">Order Status</div>
      </div>
    </div>
  );
};

export const OrderListItem = ({
  order,
}: {
  order: Response;
}) => {
  return (
    <Link to={`/dashboard/orders/detail/${order.message.order.id}`} className="xl:w-full ">
      <Card className="sm:w-[50rem] md:w-[60rem] xl:w-full 2xl:w-[90rem] border rounded-lg">
        <CardContent className="text-sm space-y-2 p-4">
          <div className="grid grid-cols-8 gap-6 items-center">
            <div>
              <Badge
                variant={"secondary"}
                className=" h-16 w-16 flex items-center justify-center rounded-full"
              >
                {/* {order.type === "PROJECT" ? (
                  <ProjectIcon className="h-8 w-8" />
                ) : (
                  <MLModelIcon className="h-8 w-8" />
                )} */}
                <ProjectIcon className="h-8 w-8" />
              </Badge>
            </div>
            <div className="col-span-2">
              <div>
                <h3 className="text-lg font-semibold ">
                  {order?.message?.order?.items[0]?.descriptor?.name}
                </h3>
              </div>
              <div>
                Last update {dayjs(order?.message?.order?.updated_at).fromNow()}
              </div>
            </div>
            <div>{order?.message?.order?.id.slice(0, 8)}...</div>
            <div>DevOp Solution</div>
            <div>
              <div>{"-"}</div>
              {order?.message?.order?.created_at && (
                <div className="text-muted-foreground">
                  {dayjs(order?.message?.order?.created_at).fromNow()}
                </div>
              )}
            </div>
            <div>
              <Span variant={getSpanVariant(order?.message?.order?.state)}>
                {order?.message?.order?.state}
              </Span>
            </div>
            <div>
              <Button>View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const MyOrdersList = ({
  showFilter,
  showGrid,
  orders,
}: {
  showFilter: boolean;
  showGrid: boolean;
  orders: Order[];
}) => {
  if (orders.length === 0) {
    return <div>No orders found</div>;
  }
  const typeFilter = ["All Type", "Project", "ML Model"];
  const serviceOrderFilter = [
    "All Service Offer",
    "Assessment",
    "Attestation",
    "Certification",
    "Redemetion",
  ];
  const oaspFilter = [
    "All OASPs",
    "DevOp Solution",
    "OpenFort",
    "GreenHill",
    "Tocomo",
  ];
  const categoryFilter = ["All Categories", "Cat A", "Cat B", "Cat C", "Cat D"];
  return (
    <div data-testid="my-orders-list" className="flex flex-col gap-9">
      <div className="w-full flex gap-[30px] items-start">
        {showFilter && (
          <div className="w-[283px] xl:w-[380px] flex flex-col gap-3">
            <div className="flex justify-between items-center gap-2 border p-2 rounded">
              <span>Filter</span>
              <Button>Reset</Button>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded ">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Type</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      {typeFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded ">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Service Order</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search service Offer..."
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {serviceOrderFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded ">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Assigned OASP</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search OASP..."
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {oaspFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2  border p-2 rounded ">
              <Accordion
                value="item-1"
                type="single"
                collapsible
                className="w-full  active:h-[14.88rem] border-none"
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger>Categories</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search categories..."
                        className="pl-8 w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      {categoryFilter.map((filter) => (
                        <div
                          className="flex items-center p-1 gap-2"
                          key={filter}
                        >
                          <Checkbox />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
        <div className=" space-y-4  w-full">
          <div
            className={cn(`
            ${!showGrid ? 'flex flex-wrap gap-7 justify-center mx-auto w-full' : `grid gap-[30px] justify-center mx-auto w-full
            ${
              showFilter
                ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }
            `}
        `)}
          >
            {!showGrid && <OrderListHeader />}
            {orders[0]?.orders[0]?.message?.responses?.map((order) =>
              showGrid ? (
                <OrderCard order={order} key={order.message.order.id} />
              ) : (
                <OrderListItem order={order} key={order.message.order.id} />
              ),
            )}
          </div>
          <div className="sm:flex space-y-4 justify-between items-center w-full">
            <div className="flex items-center  gap-2 w-96">
              <span className="text-xs ">Showing 1-20 of 100</span>{" "}
              <Separator orientation="vertical" className="h-4 w-[3px]" />
              <span className="text-xs ">10 per page</span>
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#">
                      <ChevronLeft className="h-4 w-4" />
                    </PaginationPrevious>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersList;
