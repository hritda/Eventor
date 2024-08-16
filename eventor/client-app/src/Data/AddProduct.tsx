import { AddProductNav } from "../DefinedTypes/AddProduct";

export const addProductNav: AddProductNav[] = [
  {
    id: 1,
    icon: "product-detail",
    title: "Add event Details",
    detail: "Add event name & description",
  },
  {
    id: 2,
    icon: "product-gallery",
    title: "Event gallery",
    detail: "thumbnail & Add Event Gallery",
  },
  // {
  //   id: 3,
  //   icon: "pricing",
  //   title: "Ticket Prices",
  //   detail: "Add Event ticket price & Discount",
  // },
  // {
  //   id: 4,
  //   icon: "advance",
  //   title: "Advance",
  //   detail: "Add Meta details",
  // },
];

export const typesOfProductData = [
  {
    id: "radio-icon",
    check: true,
    title: "Fixed Price",
  },
  {
    id: "radio-icon4",
    title: "BOGO(Buy one, Get one)",
  },
  {
    id: "radio-icon5",
    title: "Seasonal or holiday discount",
  },
  {
    id: "radio-icon6",
    title: "Percentage-based discount(%)",
  },
  {
    id: "radio-icon7",
    title: "Volume or bulk discount",
  },
];

export const productFiveNavData = [
  "Inventory",
  "Additional Options",
  "Shipping",
];
