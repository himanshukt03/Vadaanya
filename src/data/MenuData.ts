interface MenuItem {
   id: number;
   title: string;
   link: string;
   has_dropdown: boolean;
   sub_menus?: {
      link: string;
      title: string;
      inner_sub_menus?: {
         link: string;
         title: string;
      }[];
   }[];
};

const menu_data: MenuItem[] = [
   {
      id: 1,
      has_dropdown: false,
      title: "About",
      link: "/#about",
   },
   {
      id: 2,
      has_dropdown: false,
      title: "Founders",
      link: "/founders",
   },
   {
      id: 3,
      has_dropdown: false,
      title: "Portfolio",
      link: "/#portfolio",
   },
   {
      id: 4,
      has_dropdown: false,
      title: "Investors",
      link: "/#investors",
   },
   {
      id: 5,
      has_dropdown: false,
      title: "Partners",
      link: "/#partners",
   },
   {
      id: 6,
      has_dropdown: false,
      title: "Advisors",
      link: "/advisors",
   },
   {
      id: 7,
      has_dropdown: false,
      title: "Insights",
      link: "/#insights",
   },
   {
      id: 8,
      has_dropdown: false,
      title: "Contact Us",
      link: "/#contact",
   },
];
export default menu_data;