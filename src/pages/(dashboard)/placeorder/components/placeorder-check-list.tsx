import CheckItem, { type ICheckItem } from "@/components/common/check-item";
interface PlaceOrderCheckListProps {
  items: ICheckItem[];
  setSelectedItems: React.Dispatch<React.SetStateAction<ICheckItem[]>>;
  disabledLength?: boolean;
  selectedItems: ICheckItem[];
}

const PlaceOrderCheckList = ({
  items,
  setSelectedItems,
  disabledLength,
  selectedItems,
}: PlaceOrderCheckListProps) => {
  return (
    <div className="overflow-auto h-[250px] w-full flex gap-2 flex-wrap content-start mb-10">
      {items.map((item) => (
        <CheckItem
          checkItem={item}
          key={item.id}
          setSelectedItems={setSelectedItems}
          disabledLength={disabledLength}
          selectedItems={selectedItems}
        />
      ))}
    </div>
  );
};

export default PlaceOrderCheckList;
