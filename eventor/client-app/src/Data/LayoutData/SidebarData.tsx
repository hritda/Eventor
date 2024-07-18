import { MenuItem } from "../../Types/Layout/SidebarType";


export const MenuList: MenuItem[] = [
  {
    title: "General",
    lanClass: "lan-1",
    Items: [
      {
        title: 'Pages',
        icon: "home",
        type: "sub",
        children: [
          {
            title: 'Sample Page',
            path: `${process.env.PUBLIC_URL}/pages/sample_page`,
            type: "link",
          },
        ],
      },
      {
        title: "Support Ticket",
        icon: "support-tickets",
        type: "sub",
        children: [
          {
            title: "Raised Ticket",
            path: `https://support.pixelstrap.com/`,
            type: "link"
          }
        ]
      }
    ],
  },
];