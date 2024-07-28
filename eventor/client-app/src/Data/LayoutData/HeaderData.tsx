import { profilesMessageType } from "../../Types/Layout/HeaderType";

export const notificationData = [
    {
        img:"5.png",
        title:"Ralph Edwards wants to edit tetrisly design system",
        subTitle:"2hrs Ago",
        color:"primary"
    },
    {
        img:"6.jpg",
        title:"Jenny Wilson Completed Create new component",
        subTitle:"2.15pm",
        color:"secondary"
    },
    {
        img:"7.png",
        title:"Jenny Wilson mentioned you in rewrite button component",
        subTitle:"3.10pm",
        color:""
    }
]


export const messageData = [
    {
      img: "3.png",
      statusClass: "Do you want to go see movie?",
      userName: "Hackett Yessenia",
    },
    {
      img: "6.jpg",
      statusClass: "Thank you for rating us.",
      userName: "Jason Borne",
    },
    {
      img: "10.jpg",
      statusClass: "What`s the project report update?",
      userName: "Sarah Loren",
    },
  ];

export const cartsData = [
    {
        img:"06.jpg",
        userName:"Winter T-shirt",
        amount:"1 X $ 299.00"
    },
    {
        img:"02.jpg",
        userName:"Men Shirt",
        amount:"1 X $ 299.00"
    }
]

export const profilesMessage:profilesMessageType[] = [
    {
        name: "Account",
        icon:"User",
        link: `${process.env.PUBLIC_URL}/chat/privatechat  `
    },
    {
        name: "Your events",
        icon:"FileText",
        link: `${process.env.PUBLIC_URL}/users/dashboard`
    },
    // {
    //     name: "Inbox",
    //     icon:"Mail",
    //     link: `${process.env.PUBLIC_URL}/email/letterbox`
    // },
   
    // {
    //     name: "Settings",
    //     icon:"Settings",
    //     link: `${process.env.PUBLIC_URL}/users/useredit`
    // },
    {
        name: "Log Out",
        icon:"LogOut",
        link:`${process.env.PUBLIC_URL}/login`,
        
    },
];

export const bookMarkData = [
    {
        icon: "form",
        title: "Form",
    },
    {
        icon: "user",
        title: "Profile",
    },
    {
        icon: "table",
        title: "Tables",
    },
  ];