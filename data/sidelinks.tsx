import { paths } from "@/lib/paths";
import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
  IconSettingsQuestion,
} from "@tabler/icons-react";
import {
  Album02Icon,
  Calendar02Icon,
  Calendar03Icon,
  CustomerSupportIcon,
  DashboardSquare01Icon,
  FootballPitchIcon,
  NewsIcon,
  ServiceIcon,
  UserMultipleIcon,
} from "hugeicons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: paths.admin.dashboard,
    icon: <DashboardSquare01Icon size={18} />,
  },
  {
    title: "Players",
    label: "",
    href: paths.admin.players,
    icon: <UserMultipleIcon size={18} />,
  },
  {
    title: "Courts",
    label: "",
    href: paths.admin.courts,
    icon: <FootballPitchIcon size={18} />,
  },
  {
    title: "Book Now",
    label: "",
    href: paths.admin.booknow,
    icon: <Calendar03Icon size={18} />,
  },
  {
    title: "Bookings",
    label: "",
    href: paths.admin.bookings,
    icon: <Calendar02Icon size={18} />,
  },
  {
    title: "Gallery",
    label: "",
    href: paths.admin.gallery,
    icon: <Album02Icon size={18} />,
  },
  {
    title: "News And Events",
    label: "",
    href: paths.admin.newsevents,
    icon: <NewsIcon size={18} />,
  },
  {
    title: "Amenities",
    label: "",
    href: paths.admin.amenities,
    icon: <ServiceIcon size={18} />,
  },
  {
    title: "Support",
    label: "",
    href: paths.admin.support,
    icon: <CustomerSupportIcon size={18} />,
  },
  // {
  //   title: 'Tasks',
  //   label: '3',
  //   href: '/admin/tasks',
  //   icon: <IconChecklist size={18} />,
  // },
  // {
  //   title: 'Chats',
  //   label: '9',
  //   href: '/admin/chats',
  //   icon: <IconMessages size={18} />,
  // },
  // {
  //   title: 'Apps',
  //   label: '',
  //   href: '/admin/apps',
  //   icon: <IconApps size={18} />,
  // },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/login',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/signup',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgotpassword',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Extra Components',
  //   label: '',
  //   href: '/admin/extra-components',
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/admin/errors/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/admin/errors/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/admin/errors/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //     {
  //       title: 'Unauthorised Error',
  //       label: '',
  //       href: '/admin/errors/401',
  //       icon: <IconLock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   label: '',
  //   href: '/admin/settings',
  //   icon: <IconSettings size={18} />,
  // },
  // {
  //   title: 'Configuration',
  //   label: '',
  //   href: '/admin/configuration',
  //   icon: <IconSettingsQuestion size={18} />,
  // },
];
