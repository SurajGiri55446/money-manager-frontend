import logo from "./logo.png";
import login_bg from "./login_bg.png";
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";

export const assets = {
  login_bg,
  logo,
};


export const SIDE_BAR_DATA = [
  {
    id: "1",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "2",
    label: "Category",
    icon: List,
    path: "/category",
  },
  {
    id: "3",
    label: "Income",
    icon: Wallet,
    path: "/income",
  },
  {
    id: "4",
    label: "Expense",
    icon: Coins,
    path: "/expense",
  },
  {
    id: "5",
    label: "Filters",
    icon: FunnelPlus,
    path: "/filter",
  },
];
