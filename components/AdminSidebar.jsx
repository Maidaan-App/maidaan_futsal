"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { paths } from "@/lib/paths";

export default function MakeSidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  const navBarItems = [
    {
      icon: (
        <svg
          xmlns="http:www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 6.5c0-2.121 0-3.182.659-3.841S4.379 2 6.5 2s3.182 0 3.841.659S11 4.379 11 6.5s0 3.182-.659 3.841S8.621 11 6.5 11s-3.182 0-3.841-.659S2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22s-3.182 0-3.841-.659S13 19.621 13 17.5"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M2 17.5c0-2.121 0-3.182.659-3.841S4.379 13 6.5 13s3.182 0 3.841.659S11 15.379 11 17.5s0 3.182-.659 3.841S8.621 22 6.5 22s-3.182 0-3.841-.659S2 19.621 2 17.5m11-11c0-2.121 0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11s-3.182 0-3.841-.659S13 8.621 13 6.5"
          />
        </svg>
      ),
      text: "Dashboard",
      href: paths.admin.dashboard,
    },
    // {
    //   icon: (
    //     <img src="/images/admin/User.png" alt="Profile" className="h-6 w-6" />
    //   ),
    //   subMenu: [
    //     {
    //       icon: (
    //         <img
    //           src="/images/admin/bullet.png"
    //           alt="Profile"
    //           className="h-2 w-2 mt-2"
    //         />
    //       ),
    //       text: "Admins",
    //       href: paths.admin.usersAdmins,
    //     },

    //     {
    //       icon: (
    //         <img
    //           src="/images/admin/bullet.png"
    //           alt="Profile"
    //           className="h-2 w-2 mt-2"
    //         />
    //       ),
    //       text: "Agency Partners",
    //       href: paths.admin.usersAgencyPartners,
    //     },
    //     {
    //       icon: (
    //         <img
    //           src="/images/admin/bullet.png"
    //           alt="Profile"
    //           className="h-2 w-2 mt-2"
    //         />
    //       ),
    //       text: "Vendors",
    //       href: paths.admin.usersVendors,
    //     },
    //     {
    //       icon: (
    //         <img
    //           src="/images/admin/bullet.png"
    //           alt="Profile"
    //           className="h-2 w-2 mt-2"
    //         />
    //       ),
    //       text: "Companies",
    //       href: paths.admin.usersCompanies,
    //     },
    //   ],
    //   text: "Users",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="1.5em"
    //       height="1.5em"
    //       viewBox="0 0 24 24"
    //     >
    //       <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.4" />
    //       <ellipse
    //         cx="16"
    //         cy="17"
    //         fill="currentColor"
    //         opacity="0.4"
    //         rx="5"
    //         ry="3"
    //       />
    //       <circle cx="9.001" cy="6" r="4" fill="currentColor" />
    //       <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4" />
    //     </svg>
    //   ),
    // },

    {
      icon: (
        <svg
          xmlns="http:www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
          />
        </svg>
      ),
      text: "Players",
      href: paths.admin.players,
    },

    {
      icon: (
        <svg
          xmlns="http:www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
          />
        </svg>
      ),
      text: "Courts",
      href: paths.admin.courts,
    },

    {
      icon: (
        <svg
          xmlns="http:www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
          />
        </svg>
      ),
      text: "Book Now",
      href: paths.admin.addBookings,
    },



    {
      icon: (
        <svg
          xmlns="http:www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
          />
        </svg>
      ),
      text: "Bookings",
      href: paths.admin.bookings,
    },
   
    // {
    //   icon: (
    //     <svg
    //       xmlns="http:www.w3.org/2000/svg"
    //       width="1.5em"
    //       height="1.5em"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         fill="currentColor"
    //         d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
    //         opacity="0.5"
    //       />
    //       <path
    //         fill="currentColor"
    //         d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
    //       />
    //     </svg>
    //   ),
    //   text: "FAQs",
    //   href: paths.admin.faqs,
    // },
    // {
    //   icon: (
    //     <svg
    //       xmlns="http:www.w3.org/2000/svg"
    //       width="1.5em"
    //       height="1.5em"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         fill="currentColor"
    //         fill-rule="evenodd"
    //         d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083"
    //         clip-rule="evenodd"
    //         opacity="0.5"
    //       />
    //       <path
    //         fill="currentColor"
    //         d="M15.523 12c0 1.657-1.354 3-3.023 3s-3.023-1.343-3.023-3S10.83 9 12.5 9s3.023 1.343 3.023 3"
    //       />
    //     </svg>
    //   ),
    //   text: "Configuration",
    //   href: paths.admin.configuration,
    // },
    // {
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="1.5em"
    //       height="1.5em"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         fill="currentColor"
    //         d="M2 12.124C2 6.533 6.477 2 12 2s10 4.533 10 10.124v5.243c0 .817 0 1.378-.143 1.87a3.52 3.52 0 0 1-1.847 2.188c-.458.22-1.004.307-1.801.434l-.13.02a13 13 0 0 1-.727.105c-.209.02-.422.027-.64-.016a2.1 2.1 0 0 1-1.561-1.35a2.2 2.2 0 0 1-.116-.639c-.012-.204-.012-.452-.012-.742v-4.173c0-.425 0-.791.097-1.105a2.1 2.1 0 0 1 1.528-1.43c.316-.073.677-.044 1.096-.01l.093.007l.11.01c.783.062 1.32.104 1.775.275q.481.181.883.487v-1.174c0-4.811-3.853-8.711-8.605-8.711s-8.605 3.9-8.605 8.711v1.174c.267-.203.563-.368.883-.487c.455-.17.992-.213 1.775-.276l.11-.009l.093-.007c.42-.034.78-.063 1.096.01a2.1 2.1 0 0 1 1.528 1.43c.098.314.097.68.097 1.105v4.172c0 .291 0 .54-.012.743c-.012.213-.04.427-.116.638a2.1 2.1 0 0 1-1.56 1.35a2.2 2.2 0 0 1-.641.017c-.201-.02-.444-.059-.727-.104l-.13-.02c-.797-.128-1.344-.215-1.801-.436a3.52 3.52 0 0 1-1.847-2.188c-.118-.405-.139-.857-.142-1.461L2 17.58z"
    //       />
    //       <path
    //         fill="currentColor"
    //         fill-rule="evenodd"
    //         d="M12 5.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75m3 1.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75m-6 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V8A.75.75 0 0 1 9 7.25"
    //         clip-rule="evenodd"
    //         opacity="0.5"
    //       />
    //     </svg>
    //   ),
    //   text: "Support",
    //   href: paths.admin.support,
    // },
  ];

  return (
    <div className="relative h-screen">
      <div className={`h-screen transition-all ${expanded ? "w-64" : "w-64"} `}>
        <nav
          className={`flex flex-col h-screen shadow-lg ${
            expanded ? "overflow-y-auto" : "overflow-hidden"
          } scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300`}
        >
          <div className="flex items-center justify-between p-4">
            <img
              src="logo.png"
              className={`${
                expanded ? "w-16 h-16 object-cover" : "w-0"
              } transition-all duration-300`}
              alt="logo"
            />
            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-primary text-white rounded-full p-1.5 hover:text-primary hover:bg-white transition-all duration-300"
            >
              {expanded ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </button>
          </div>
          <ul className="flex-1 px-3 space-y-2">
            {navBarItems.map((item, index) => (
              <SidebarItem
                key={index}
                expanded={expanded}
                {...item}
                active={pathname === item.href}
                pathname={pathname}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
