import SearchAltIcon from "@/components/icons/search-alt-icon";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    DEFAULT_CATEGORY_IDS,
    DEFAULT_PRODUCT_SUB_CATEOGRY_1,
    LOCAL_DEFAULT_CATEGORY_IDS,
    LOCAL_DEFAULT_PRODUCT_SUB_CATEOGRY_1,
    type FilterKey,
} from "@/lib/constant";
import type { IFilterSortPager } from "@/store/data-store";
import { type ChangeEvent, useState } from "react";

export const setFilterKeyData = (filterKey: FilterKey) => {
    switch (filterKey) {
        case "category_id":
            return DEFAULT_CATEGORY_IDS;
        case "productSubcategory1":
            return DEFAULT_PRODUCT_SUB_CATEOGRY_1;
        default:
            throw new Error("No such filter Key, please correct it");
    }
};
interface IFilterCol {
    filterSortPager: IFilterSortPager;
    setFilterSortPager: React.Dispatch<React.SetStateAction<IFilterSortPager>>;
}
const FilterCol = ({ filterSortPager, setFilterSortPager }: IFilterCol) => {
    const { category_id, productSubcategory1, price: __ } = filterSortPager;

    const typeCategoryIdFilter = [...category_id];
    const productSubCategory1Filter = [...productSubcategory1];
    const [searchTerm, setSearchTerm] = useState("");
    const [localTypeCategoryIdFilter, _] =
        useState(LOCAL_DEFAULT_CATEGORY_IDS);
    const [localProductSubCategory1Filter, setLocalProductSubCategory1Filter] =
        useState(LOCAL_DEFAULT_PRODUCT_SUB_CATEOGRY_1);
    const hasFilter =
        typeCategoryIdFilter.length !== 0 ||
        productSubCategory1Filter.length !== 0;

    const handleFilter = <T,>(
        checked: boolean,
        filter: T | "All",
        filterData: T[],
        _localData: T[],
        filterKey: FilterKey,
    ) => {
        // if click item is not 'All'
        if (filter !== "All") {
            if (checked) {
                // if current 'All' is not checked, then means, not all items are checked, then we just push the click filter
                if (!filterData.includes(filter)) {
                    setFilterSortPager((prev) => ({
                        ...prev,
                        [filterKey]: [...filterData, filter],
                    }));
                }
            }

            // if we uncheck, then filter it
            if (!checked) {
                setFilterSortPager((prev) => ({
                    ...prev,
                    [filterKey]: [...filterData.filter((d) => d !== filter)],
                }));
            }
        } else {
            // if we are clicking 'All'
            // if checked it
            if (checked) {
                setFilterSortPager((prev) => ({
                    ...prev,
                    [filterKey]: setFilterKeyData(filterKey),
                }));
            }
            if (!checked) {
                setFilterSortPager((prev) => ({
                    ...prev,
                    [filterKey]: [],
                }));
            }
        }
    };

    const handleRestFilter = () => {
        setFilterSortPager((prev) => ({
            ...prev,
            category_id: [],
            productSubcategory1: [],
        }));
        setSearchTerm("");

        setLocalProductSubCategory1Filter(localProductSubCategory1Filter);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.trim();
        setSearchTerm(term);
    };
    return (
        <div className="w-[283px] xl:w-[380px] flex flex-col gap-3">
            {/* Filter Header */}
            <div className="flex justify-between items-center gap-2 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800">
                <span className="text-gray-900 dark:text-gray-100">Filter</span>
                <Button
                    disabled={!hasFilter}
                    onClick={handleRestFilter}
                    className={`text-sm ${hasFilter ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}
                >
                    Reset
                </Button>
            </div>

            {/* Filter by Type */}
            <div className="flex flex-col gap-2 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800">
                <FilterBox value="filter-type" trigger="Type">
                    <FilterCheckBox
                        all_title="All Type"
                        handleFilter={(checked, filter) =>
                            handleFilter(
                                checked,
                                filter,
                                typeCategoryIdFilter,
                                localTypeCategoryIdFilter,
                                "category_id",
                            )
                        }
                        localData={localTypeCategoryIdFilter}
                        filterData={typeCategoryIdFilter}
                        searchTerm={searchTerm}
                    />
                </FilterBox>
            </div>

            {/* Filter by Service Order */}
            <div className="flex flex-col gap-2 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800">
                <FilterBox value="filter-service-order" trigger="Service Order">
                    <div className="relative">
                        <SearchAltIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search service Offer..."
                            className="pl-8 w-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded"
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                    </div>
                    <FilterCheckBox
                        all_title="All Service Order"
                        handleFilter={(checked, filter) =>
                            handleFilter(
                                checked,
                                filter,
                                productSubCategory1Filter,
                                localProductSubCategory1Filter,
                                "productSubcategory1",
                            )
                        }
                        localData={localProductSubCategory1Filter.filter((item) =>
                            item.toString().toLowerCase().includes(searchTerm.toLowerCase())
                        )}
                        filterData={productSubCategory1Filter}
                        searchTerm={searchTerm}
                    />
                </FilterBox>
            </div>
        </div>

    );
};

export default FilterCol;

interface FilterCheckBoxProps<T> {
    handleFilter: (checked: boolean, filter: T | "All") => void;
    localData: T[];
    filterData: T[];
    all_title: string;
    searchTerm: string;
}
export const FilterCheckBox = <T,>({
    handleFilter,
    localData,
    filterData,
    all_title,
}: FilterCheckBoxProps<T>) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center p-1 gap-2">
                <Checkbox
                    data-testid={String(all_title)}
                    id={all_title}
                    onCheckedChange={(checked: boolean) => handleFilter(checked, "All")}
                    checked={filterData.length === 0}
                    disabled={true}
                />
                <label
                    htmlFor={all_title}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {all_title}
                </label>
            </div>
            {localData.map((filter: T) => (
                <div className="flex items-center p-1 gap-2" key={String(filter)}>
                    <Checkbox
                        data-testid={String(filter)}
                        onCheckedChange={(checked: boolean) =>
                            handleFilter(checked, filter)
                        }
                        id={String(filter)}
                        checked={filterData.includes(filter)}
                    />
                    {/* <Checkbox onCheckedChange={(checked:boolean) =>  handleFilter(checked, filter)} id={filter} checked={filterData.includes(filter) && localData.length !== filterData.length}/> */}
                    <label
                        htmlFor={String(filter)}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {String(filter)}
                    </label>
                </div>
            ))}
        </div>
    );
};

interface FilterBoxProps {
    value: string;
    trigger: string;
    children: React.ReactNode;
}
export const FilterBox = ({ value, trigger, children }: FilterBoxProps) => {
    return (
        <Accordion
            defaultValue={value}
            type="single"
            collapsible
            className="w-full border-none"
        >
            <AccordionItem value={value} className="border-none">
                <AccordionTrigger>{trigger}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
