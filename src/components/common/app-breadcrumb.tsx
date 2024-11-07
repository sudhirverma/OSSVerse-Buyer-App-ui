import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const AppBreadCrumb = ({
  data
}: {
  data: { title: string; url: string }[];
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((item, index) =>
          index === data.length - 1 ? (
            <BreadcrumbItem key={item.url}>
              <BreadcrumbPage className="uppercase text-[0.75rem] placeholder-opacity-50 text-primary opacity-50">
                {item.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={item.url}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.url}
                  className="uppercase text-[0.75rem] text-primary"
                >
                  {" "}
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator key={`${item.url}-separator`} />
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadCrumb;
