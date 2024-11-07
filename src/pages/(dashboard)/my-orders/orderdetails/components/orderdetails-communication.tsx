import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Select, { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { H3, Muted } from "@/components/ui/typography";
import {
  CodesandboxIcon,
  FlagIcon,
  FrownIcon,
  MessageCircleIcon,
  PaperclipIcon,
  SendIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

const userMessage = {
  userName: "Adam",
  message: "Hi I'm Adam ! How I can help you?",
  timeStamp: "1/3/2024 05:32 EST",
};
const oaspMessage = {
  userName: "OASP",
  message:
    "Hi Adam. I need to compare the two residential solar products to see which is better fit for assessment",
  timeStamp: "1/3/2024 05:33 EST",
};

const ActionBtn = ({
  srName,
  children,
}: {
  srName: string;
  children: React.ReactNode;
}) => {
  return (
    <Button
      variant={"outline"}
      className="border-gray-400 px-2 py-5 rounded-md bg-stone-100"
    >
      <span className="sr-only">{srName}</span>
      {children}
    </Button>
  );
};

const OrderDetailsCommunication = () => {
  return (
    <Card className="px-5 py-6 mb-4">
      <div className="flex justify-between">
        <div>
          <H3>Communicate with OASP</H3>
          <Muted className="mb-7">
            Communications with the OASP that assigned to the order or offered
            to do the order
          </Muted>
        </div>
        <div className="flex items-center">
          <div className="pe-5">Active</div>
          <div className="w-[150px]">
            <Select defaultValue="1" id="oaspCommunication">
              <SelectItem value="1" key={"1"} className="text-red">
                End Chat
              </SelectItem>
            </Select>
          </div>
        </div>
      </div>
      <div className="bg-stone-100 rounded-md py-5">
        <div className="pb-5">
          <Separator className="h-[2px]" />
          <div className="text-sm font-semibold text-center mt-2">
            Session started - 1/3/2024 04:30 EST
          </div>
          <div className="flex justify-center mt-5">
            <div className="flex">
              <CodesandboxIcon />
              <span className="ms-2">
                Adam T joined the conversation - 05:30 EST
              </span>
            </div>
          </div>
          <div className="mt-7 text-end">
            <div className="inline-flex flex-col mx-10">
              <div className="bg-stone-500 text-white p-3 rounded-l-xl rounded-tr-xl mb-2">
                {userMessage.message}
              </div>
              <div className="text-start">
                {userMessage.userName} - {userMessage.timeStamp}
              </div>
            </div>
          </div>
          <div className="my-7">
            <div className="inline-flex flex-col mx-10">
              <div className="bg-stone-200 p-3 rounded-r-xl rounded-tl-xl mb-2">
                {oaspMessage.message}
              </div>
              <div className="text-start">
                {oaspMessage.userName} - {oaspMessage.timeStamp}
              </div>
            </div>
          </div>
          <Separator className="h-[2px]" />
        </div>
        <div className="flex mx-10">
          <div className="me-2">
            <ActionBtn srName="Frown Icon">
              <FrownIcon />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="Users Icon">
              <UsersIcon />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="MessageCircle Icon">
              <MessageCircleIcon />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="ShieldCheck Icon">
              <ShieldCheckIcon />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="Paperclip Icon">
              <PaperclipIcon />
            </ActionBtn>
          </div>
          <div className="me-2">
            <ActionBtn srName="Flag Icon">
              <FlagIcon />
            </ActionBtn>
          </div>
        </div>
        <div className="mx-10 mt-4 flex">
          <Input
            placeholder="Reply to message"
            className="border-gray-400 h-10 me-2 placeholder:text-primary"
          />
          <Button variant={"default"} className="px-2 py-5 rounded-md">
            <span className="sr-only">Send Icon</span>
            <SendIcon />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderDetailsCommunication;
