// import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronRightCircleIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SidebarItemProps {
  active?: boolean;
  icon: React.ReactNode;
  text: string;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
  href?: string;
  pathname: string;
}

interface SubMenuItemProps
  extends Omit<SidebarItemProps, "expanded" | "pathname"> {
  expanded?: never;
  subMenu?: never;
}

function HoveredSubMenuItem({ icon, text, active, href }: SubMenuItemProps) {
  return (
    <Link href={href || "#"}>
      <div
        className={` rounded-md p-2 ${
          active ? "bg-indigo-50" : "hover:bg-indigo-50"
        }`}
      >
        <div className="flex items-center">
          <span className="text-primary-500  w-[1.5rem] h-[1.5rem]">
            {icon}
          </span>
          <span className="text-primary-500 ml-3  text-start">{text}</span>
          <div className="bg-primary-200 h-1" />
        </div>
      </div>
    </Link>
  );
}

export default function SidebarItem({
  icon,
  active,
  text,
  expanded = false,
  subMenu = null,
  href = "#",
  pathname,
}: SidebarItemProps) {
  const [expandSubMenu, setExpandSubMenu] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setExpandSubMenu(false);
    }
  }, [expanded]);

  const subMenuHeight = expandSubMenu
    ? `${((subMenu?.length || 0) * 43 + (subMenu! && 15)).toString()}px`
    : 0;

  return (
    <>
      <li>
        <Link href={href} passHref>
          <button
            className={`
              group relative my-1 flex w-full cursor-pointer
              items-center rounded-md px-3
              py-2 font-medium transition-colors
              ${
                active && !subMenu
                  ? "bg-[#e6f6f1] text-primary"
                  : "text-[#637381] hover:bg-[#e6f6f1]"
              }
              ${!expanded && "flex"}
            `}
            onClick={() => setExpandSubMenu((curr) => expanded && !curr)}
          >
            <span className="">{icon}</span>
            <span
              className={`overflow-hidden text-start transition-all ${
                expanded ? "ml-3 w-44 " : "w-0"
              }`}
            >
              {text}
            </span>

            {subMenu && (
              <div
                className={`absolute right-2 h-4 w-4 ${
                  expanded ? "" : "top-2"
                } transition-all ${expandSubMenu ? "rotate-90" : "rotate-0"}`}
              >
                <ChevronRightIcon />
              </div>
            )}
            {!expanded && (
              <div
                className={`
                  text-primary-500 invisible absolute left-full ml-6 -translate-x-3
                  rounded-md bg-indigo-100 px-2
                  py-1 text-sm opacity-20 transition-all
                  group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
                `}
              >
                {!subMenu
                  ? text
                  : subMenu.map((item, index) => (
                      <HoveredSubMenuItem
                        key={index}
                        text={item.text}
                        icon={item.icon}
                        href={item.href}
                        active={pathname === item.href}
                      />
                    ))}
              </div>
            )}

            {!expanded && (
              <div
                className={`
                   text-primary-500 invisible absolute left-full ml-6 -translate-x-3
                   rounded-md bg-indigo-100 px-2
                   py-1 text-sm opacity-20 transition-all
                   group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
                 `}
              >
                {!subMenu
                  ? text
                  : subMenu.map((item, index) => (
                      <HoveredSubMenuItem
                        key={index}
                        text={item.text}
                        icon={item.icon}
                        href={item.href}
                        active={pathname === item.href}
                      />
                    ))}
              </div>
            )}
          </button>
        </Link>
      </li>
      <ul className="sub-menu pl-6" style={{ height: subMenuHeight }}>
        {expanded &&
          subMenu?.map((item, index) => (
            <SidebarItem
              key={index}
              {...item}
              expanded={expanded}
              active={pathname === item.href}
              pathname={pathname}
            />
          ))}
      </ul>
    </>
  );
}
