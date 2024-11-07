export const api = {
  marketplace: {
    search: "client/v2/search",
  },
  placeorder: {
    select: "client/v2/get_quote",
    init: "client/v2/initialize_order",
    confirm: "client/v2/confirm",
  },
  myorders: {
    get: "client/v2/orders",
  },
};
