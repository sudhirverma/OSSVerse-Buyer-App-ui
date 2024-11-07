import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const isLessThanCurrentAnchor = (
  anchorIndex: number,
  currentAnchor: number,
) => anchorIndex < currentAnchor;
/**
 * Left side anchorLists, click them will show/hide right related sections.
 * Example: https://marvelapp.com/prototype/6j7768d/screen/95611318
 * According to the design, if anchor index is greater than right sections index, those sections will be hidden
 *
 * data source:
 * const anchroLists = [
 *  "Descripton Details",
 *  "Assessment Service Pricing",
 *  "Payment",
 * ];
 *
 * section: 0
 * <section className={cn( isLessThanCurrentAnchor(0, currentAnchor) && "hidden" )}>
 * ...
 * </section>
 *
 * section: 1
 * <section className={cn( isLessThanCurrentAnchor(1, currentAnchor) && "hidden" )}>
 * ...
 * </section>
 *
 * section: 2
 * <section className={cn( isLessThanCurrentAnchor(2, currentAnchor) && "hidden" )}>
 * ...
 * </section>
 *
 * if currentAnchor: 0 all sections will display
 * if currentAnchor: 1 then section 0 will be hidden
 * if currentAnchor: 2 then section 1 and 2 will be hidden
 */
interface AnchorListsProps {
  currentAnchor: number;
  setCurrentAnchor: (anchroIndex: number) => void;
  anchroLists: string[];
}
const AnchorLists = ({
  currentAnchor,
  setCurrentAnchor,
  anchroLists,
}: AnchorListsProps) => {
  return (
    <Card className="mb-8 p-2 bg-stone-100">
      <ul>
        {anchroLists.map((anchroList, index) => (
          <li key={anchroList}>
            <button
              type="button"
              className={cn(
                "px-4 py-3 w-full text-left rounded-md hover:bg-neutral-300",
                index === currentAnchor && "bg-neutral-300",
              )}
              onClick={() => setCurrentAnchor(index)}
            >
              {anchroList}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AnchorLists;
