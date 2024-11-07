import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H3, Muted, Paragraph } from "@/components/ui/typography";
import type { OrderDetails } from "@/services/myorders-service";
import { CreditCardIcon, TabletIcon, UserIcon } from "lucide-react";

interface IPaymentInfo {
  payment_method: string;
  status: string;
  amount: string;
}

interface IBillingInfo {
  first_name: string;
  last_name: string;
  work_mail: string;
  phone: string;
}

interface Props {
  payment_info: IPaymentInfo;
  billing_info: IBillingInfo;
  order: OrderDetails;
}

const OrderDetailsPaymentBillingInfo = ({
  payment_info,
  billing_info,
  order
}: Props) => {
  return (
    <Card className="px-5 py-6 mb-4">
      <>
        <H3 className="mb-3">Payment Info</H3>
        <div className="mb-7 flex items-center">
          <div className="pe-5">
            <Badge variant={"secondary"} className="p-2">
              <CreditCardIcon className="text-gray-500" />
            </Badge>
          </div>
          <div className="pe-10">
            <Muted className="text-base">Payment Method</Muted>
            <Paragraph>{payment_info.payment_method}</Paragraph>
          </div>
          <div className="pe-10">
            <Muted className="text-base">Status</Muted>
            <Paragraph>{payment_info.status}</Paragraph>
          </div>
          <div>
            <Muted className="text-base">Amount</Muted>
            <Paragraph>₹{order?.quote?.price?.value}</Paragraph>
          </div>
        </div>
      </>
      <>
        <H3 className="mb-3">Billing Info</H3>
        <div className="mb-7 flex items-center">
          <div className="pe-5">
            <Badge variant={"secondary"} className="p-2">
              <UserIcon className="text-gray-500" />
            </Badge>
          </div>
          <div className="pe-10">
            <Muted className="text-base">First Name</Muted>
            <Paragraph>{billing_info.first_name}</Paragraph>
          </div>
          <div className="pe-10">
            <Muted className="text-base">Last Name</Muted>
            <Paragraph>{billing_info.last_name}</Paragraph>
          </div>
          <div className="pe-5">
            <Badge variant={"secondary"} className="p-2">
              <TabletIcon className="text-gray-500" />
            </Badge>
          </div>
          <div className="pe-10">
            <Muted className="text-base">Work Mail</Muted>
            <Paragraph>{billing_info.work_mail}</Paragraph>
          </div>
          <div>
            <Muted className="text-base">Phone</Muted>
            <Paragraph>{billing_info.phone}</Paragraph>
          </div>
        </div>
        <div className="mb-5 flex items-center">
          <div className="pe-10">
            <Button
              variant={"outline"}
              className="border border-2 border-black font-semibold"
            >
              Edit Billing Info
            </Button>
          </div>
          <div>
            <Muted>
              Billing information can only be changed if the OASP <br /> hasn't
              accepted the order yet.
            </Muted>
          </div>
        </div>
      </>
    </Card>
  );
};

export default OrderDetailsPaymentBillingInfo;
