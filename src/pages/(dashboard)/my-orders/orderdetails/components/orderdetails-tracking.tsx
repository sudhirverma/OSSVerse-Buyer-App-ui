import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Stage } from "@/components/ui/stage";
import type { StageItem } from "../orderdetails-page";

interface Props {
  stages: StageItem[];
}

const OrderDetailsTracking = ({ stages }: Props) => {
  return (
    <Card className="py-7 mb-7">
      <div className="flex justify-center xl:mx-16 2xl:mx-48">
        {stages.map((stage, index) => (
          <div className="flex" key={stage.name}>
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <Stage
                  variant={stage.status === "pending" ? "pending" : "default"}
                />
              </div>
              <div>{stage.name}</div>
              {stage.remark && <div>({stage.remark})</div>}
            </div>
            <div className="mt-7">
              {index < stages.length - 1 && (
                <Separator className="h-[2px] w-[50px] 2xl:w-[125px]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OrderDetailsTracking;
