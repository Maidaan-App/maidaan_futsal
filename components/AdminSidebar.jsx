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
    {
      icon: (
        <img src="/images/admin/User.png" alt="Profile" className="h-6 w-6" />
      ),
      subMenu: [
        {
          icon: (
            <img
              src="/images/admin/bullet.png"
              alt="Profile"
              className="h-2 w-2 mt-2"
            />
          ),
          text: "Admins",
          href: paths.admin.usersAdmins,
        },

        {
          icon: (
            <img
              src="/images/admin/bullet.png"
              alt="Profile"
              className="h-2 w-2 mt-2"
            />
          ),
          text: "Agency Partners",
          href: paths.admin.usersAgencyPartners,
        },
        {
          icon: (
            <img
              src="/images/admin/bullet.png"
              alt="Profile"
              className="h-2 w-2 mt-2"
            />
          ),
          text: "Vendors",
          href: paths.admin.usersVendors,
        },
        {
          icon: (
            <img
              src="/images/admin/bullet.png"
              alt="Profile"
              className="h-2 w-2 mt-2"
            />
          ),
          text: "Companies",
          href: paths.admin.usersCompanies,
        },
      ],
      text: "Users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.4" />
          <ellipse
            cx="16"
            cy="17"
            fill="currentColor"
            opacity="0.4"
            rx="5"
            ry="3"
          />
          <circle cx="9.001" cy="6" r="4" fill="currentColor" />
          <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4" />
        </svg>
      ),
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.413c1.05.276 2.296.866 3.282 1.388A3.5 3.5 0 0 0 12 5.275v15.2a3.46 3.46 0 0 1-1.628-.406c-1-.532-2.29-1.15-3.372-1.435c-.877-.232-2.016-.35-2.985-.411C2.906 18.153 2 17.255 2 16.143"
            clip-rule="evenodd"
            opacity="0.5"
          />

          <path
            fill="currentColor"
            d="M22 16.144V4.934c0-1.073-.846-1.953-1.918-1.916c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315A3.5 3.5 0 0 1 12 5.275v15.2c.56 0 1.121-.136 1.628-.406c1-.532 2.29-1.15 3.372-1.435c.877-.232 2.016-.35 2.985-.411c1.109-.07 2.015-.968 2.015-2.08"
          />
        </svg>
      ),
      text: "Blogs & Articles",
      href: "/admin/blogs",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z"
            clip-rule="evenodd"
          />
          <path
            fill="currentColor"
            d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z"
          />
        </svg>
      ),
      text: "Success Stories",
      href: paths.admin.successstories,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M16.519 16.501c.175-.136.334-.295.651-.612l3.957-3.958c.096-.095.052-.26-.075-.305a4.3 4.3 0 0 1-1.644-1.034a4.3 4.3 0 0 1-1.034-1.644c-.045-.127-.21-.171-.305-.075L14.11 12.83c-.317.317-.476.476-.612.651q-.243.311-.412.666c-.095.2-.166.414-.308.84l-.184.55l-.292.875l-.273.82a.584.584 0 0 0 .738.738l.82-.273l.875-.292l.55-.184c.426-.142.64-.212.84-.308q.355-.17.666-.412m5.849-5.809a2.163 2.163 0 1 0-3.06-3.059l-.126.128a.52.52 0 0 0-.148.465c.02.107.055.265.12.452c.13.375.376.867.839 1.33s.955.709 1.33.839c.188.065.345.1.452.12a.53.53 0 0 0 .465-.148z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M7.25 9A.75.75 0 0 1 8 8.25h6.5a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m0 4a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"
            clip-rule="evenodd"
          />
        </svg>
      ),
      text: "Case Studies",
      href: paths.admin.casestudies,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M9.878 4.25a2.251 2.251 0 0 1 4.244 0a.75.75 0 1 0 1.414-.5a3.751 3.751 0 0 0-7.073 0a.75.75 0 1 0 1.415.5m-7.13 3.84a.8.8 0 0 0-.168-.081c.153-.318.347-.594.591-.838C4.343 6 6.23 6 10 6h4c3.771 0 5.657 0 6.828 1.172a3 3 0 0 1 .592.838a.8.8 0 0 0-.167.081c-2.1 1.365-3.42 2.22-4.517 2.767A.75.75 0 0 0 15.25 11v.458c-2.12.64-4.38.64-6.5 0V11a.75.75 0 0 0-1.487-.142C6.167 10.31 4.847 9.456 2.747 8.09"
            clip-rule="evenodd"
          />
          <path
            fill="currentColor"
            d="M2 14c0-1.95 0-3.397.162-4.5c2.277 1.48 3.736 2.423 5.088 3.004V13a.75.75 0 0 0 1.5.016c2.13.562 4.37.562 6.5 0a.75.75 0 0 0 1.5-.016v-.495c1.352-.582 2.811-1.525 5.088-3.005C22 10.604 22 12.05 22 14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14"
            opacity="0.5"
          />
        </svg>
      ),
      text: "Hire",
      href: paths.admin.hire,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M7.25 12a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0-4A.75.75 0 0 1 8 7.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 8a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"
            clip-rule="evenodd"
          />
        </svg>
      ),
      text: "RFPs",
      href: paths.admin.rfps,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828S6.239 2 10.03 2c.606 0 1.091 0 1.5.017q-.02.12-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22"
            clip-rule="evenodd"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M6 13.75a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 3.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zm5.51-14.99l-.01 2.835c0 1.097 0 2.066.105 2.848c.114.847.375 1.694 1.067 2.385c.69.691 1.538.953 2.385 1.067c.781.105 1.751.105 2.848.105h4.052q.02.232.028.5H22c0-.268 0-.402-.01-.56a5.3 5.3 0 0 0-.958-2.641c-.094-.128-.158-.204-.285-.357C19.954 7.494 18.91 6.312 18 5.5c-.81-.724-1.921-1.515-2.89-2.161c-.832-.556-1.248-.834-1.819-1.04a6 6 0 0 0-.506-.154c-.384-.095-.758-.128-1.285-.14z"
          />
        </svg>
      ),
      text: "Proposals",
      href: paths.admin.proposals,
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
            d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"
          />
          <path
            fill="currentColor"
            d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
            opacity="0.4"
          />
          <path
            fill="currentColor"
            d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5"
          />
          <path
            fill="currentColor"
            d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5m-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5"
            opacity="0.4"
          />
        </svg>
      ),
      text: "Partners",
      href: paths.admin.partners,
    },

    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"
          />
          <path
            fill="currentColor"
            d="M19.5 7.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-15 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
            opacity="0.4"
          />
          <path
            fill="currentColor"
            d="M18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5"
          />
          <path
            fill="currentColor"
            d="M22 16.5c0 1.38-1.79 2.5-4 2.5s-4-1.12-4-2.5s1.79-2.5 4-2.5s4 1.12 4 2.5m-20 0C2 17.88 3.79 19 6 19s4-1.12 4-2.5S8.21 14 6 14s-4 1.12-4 2.5"
            opacity="0.4"
          />
        </svg>
      ),
      text: "Consortium",
      href: paths.admin.consortium,
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
      text: "FAQs",
      href: paths.admin.faqs,
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
            fill-rule="evenodd"
            d="M15.328 7.542H8.672c-3.374 0-5.062 0-6.01.987s-.725 2.511-.278 5.56l.422 2.892c.35 2.391.525 3.587 1.422 4.303c.898.716 2.22.716 4.867.716h5.81c2.646 0 3.97 0 4.867-.716s1.072-1.912 1.422-4.303l.422-2.892c.447-3.049.67-4.573-.278-5.56s-2.636-.987-6.01-.987m-.747 8.252c.559-.346.559-1.242 0-1.588l-3.371-2.09c-.543-.337-1.21.101-1.21.794v4.18c0 .693.667 1.13 1.21.794z"
            clip-rule="evenodd"
          />
          <path
            fill="currentColor"
            d="M8.51 2h6.98c.232 0 .41 0 .566.015c1.108.109 2.015.775 2.4 1.672H5.543c.384-.897 1.291-1.563 2.399-1.672C8.099 2 8.277 2 8.51 2"
            opacity="0.4"
          />
          <path
            fill="currentColor"
            d="M6.31 4.723c-1.39 0-2.53.84-2.911 1.953l-.023.07c.398-.12.812-.199 1.232-.253c1.08-.138 2.446-.138 4.032-.138h6.892c1.586 0 2.951 0 4.032.138a8 8 0 0 1 1.232.253l-.023-.07c-.38-1.114-1.521-1.953-2.912-1.953z"
            opacity="0.7"
          />
        </svg>
      ),
      text: "Resources",
      href: paths.admin.resources,
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
            fill-rule="evenodd"
            d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083"
            clip-rule="evenodd"
            opacity="0.5"
          />
          <path
            fill="currentColor"
            d="M15.523 12c0 1.657-1.354 3-3.023 3s-3.023-1.343-3.023-3S10.83 9 12.5 9s3.023 1.343 3.023 3"
          />
        </svg>
      ),
      text: "Configuration",
      href: paths.admin.configuration,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 12.124C2 6.533 6.477 2 12 2s10 4.533 10 10.124v5.243c0 .817 0 1.378-.143 1.87a3.52 3.52 0 0 1-1.847 2.188c-.458.22-1.004.307-1.801.434l-.13.02a13 13 0 0 1-.727.105c-.209.02-.422.027-.64-.016a2.1 2.1 0 0 1-1.561-1.35a2.2 2.2 0 0 1-.116-.639c-.012-.204-.012-.452-.012-.742v-4.173c0-.425 0-.791.097-1.105a2.1 2.1 0 0 1 1.528-1.43c.316-.073.677-.044 1.096-.01l.093.007l.11.01c.783.062 1.32.104 1.775.275q.481.181.883.487v-1.174c0-4.811-3.853-8.711-8.605-8.711s-8.605 3.9-8.605 8.711v1.174c.267-.203.563-.368.883-.487c.455-.17.992-.213 1.775-.276l.11-.009l.093-.007c.42-.034.78-.063 1.096.01a2.1 2.1 0 0 1 1.528 1.43c.098.314.097.68.097 1.105v4.172c0 .291 0 .54-.012.743c-.012.213-.04.427-.116.638a2.1 2.1 0 0 1-1.56 1.35a2.2 2.2 0 0 1-.641.017c-.201-.02-.444-.059-.727-.104l-.13-.02c-.797-.128-1.344-.215-1.801-.436a3.52 3.52 0 0 1-1.847-2.188c-.118-.405-.139-.857-.142-1.461L2 17.58z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M12 5.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75m3 1.5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75m-6 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V8A.75.75 0 0 1 9 7.25"
            clip-rule="evenodd"
            opacity="0.5"
          />
        </svg>
      ),
      text: "Support",
      href: paths.admin.support,
    },
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
