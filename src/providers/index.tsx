import type { FC, PropsWithChildren } from "react";
import ModalProvider from "./modal-provider";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "../routes";
const Providers: FC<PropsWithChildren<{ queryClient: QueryClient }>> = ({
  queryClient,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ModalProvider />
    </QueryClientProvider>
  );
};

export default Providers;
