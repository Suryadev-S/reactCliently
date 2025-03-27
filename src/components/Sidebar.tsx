'use client'
import { INavLink, links } from "@/lib/sidebar/Navlinks";
import { cn } from "@/utility/cn";
import { ChevronRight, PanelLeft, } from "lucide-react";
import Link from "next/link";
import { Dispatch, Key, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";


const SubNav = ({ isSidebarHidden, setSidebarHide, nav }: { isSidebarHidden: boolean, setSidebarHide: Dispatch<SetStateAction<boolean>>, nav: INavLink }) => {
    const [open, setOpen] = useState(false);
    const handleToggleSubNav = () => {
        if (!isSidebarHidden) {
            setOpen(!open);
        } else {
            setSidebarHide(false);
            setOpen(true);
        }
    }

    useEffect(() => {
        if (isSidebarHidden && open) {
            setOpen(false);
        }
    }, [isSidebarHidden])
    return (
        <li data-name="sx-nav_item"
            className={cn("grid transition-[grid-template-rows,_background-color] duration-[400ms] ease-out-quint hover:bg-purple-950 py-1 ",
                open ? 'grid-rows-[var(--nav-link-icon-height)_1fr]' : 'grid-rows-[var(--nav-link-icon-height)_0fr]'
            )}>
            <div data-name="sx-sub_nav--trigger"
                onClick={handleToggleSubNav}
                className="flex items-stretch">
                <div data-name="sx-nav_link--icon"
                    className="w-(--nav-link-icon-width) h-(--nav-link-icon-height) mx-(--sidebar-left-space) flex items-center justify-center">
                    {nav.icon}
                </div>
                <div data-name="sx-nav_link--text"
                    className="w-[calc(100%-var(--nav-link-icon-width)-var(--sidebar-left-space))] flex items-center">
                    <span>{nav.text}</span>
                    <span data-name="sx-sub_nav--indicator" className="ml-auto">
                        <ChevronRight className={cn({ "rotate-90 transition-[rotate] duration-[400ms] ease-out-quint": open })} />
                    </span>
                </div>
            </div>
            <nav data-name="sx-sub_nav"
                className="overflow-hidden">
                <ul data-name="sx-sub_nav--group">
                    {nav.subNav?.map((sub, i) => (
                        <li data-name="sx-sub_nav_item" key={i}>
                            <Link href={sub.href || '#'} data-name="sx-nav_link--text"
                                className="ml-[calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2)] 
                            w-[calc(100%-calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2))]
                            block border border-transparent hover:border-purple-500 transition-[border-color] duration-[400ms] ease-out-quint py-1 px-2">
                                {sub.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </li>
    )
}

const Sidebar = ({ children }: { children: ReactNode }) => {
    const navRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false); //for mobile devices
    const [hide, setHide] = useState(false); //for desktop
    const handleToggleSidebar = () => {
        setOpen(!open);
        setHide(!hide);
    }

    useEffect(() => {
        const mouseDownListener = (e: MouseEvent) => {
            if (navRef && navRef.current) {
                if (open && !navRef.current.contains(e.target as Node)) {
                    setOpen(!open);
                }
            }
        }
        document.addEventListener('mousedown', mouseDownListener)

        return () => {
            document.removeEventListener('mousedown', mouseDownListener);
        }
    }, [open])
    return (
        <div data-name="sx-container"
            className={cn('grid md:grid-cols-[var(--sidebar-width)_1fr] md:transition-[grid-template-columns] md:duration-400 md:ease-out-quint', {
                'md:grid-cols-[calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2)_1fr]': hide
            }
            )}>
            <div data-name="sx-sidebar_curtain"
                className={cn('md:fixed md:top-0 md:overflow-hidden md:transition-[width] md:duration-400 md:ease-out-quint',
                    hide ? 'md:w-[calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2)]' : 'md:w-(--sidebar-width)'
                )}>
                <aside data-name="sx-sidebar"
                    className="grid grid-flow-col justify-between
                md:grid-flow-row md:grid-rows-[auto_1fr_auto] md:h-screen bg-zinc-900 text-white">
                    <header
                        className="flex items-center md:h-(--sidebar-header-height) bg-cover">
                        <button
                            data-name="sx-sidebar_button--toggle"
                            onClick={handleToggleSidebar}
                            className="mx-(--sidebar-left-space) w-(--nav-link-icon-width) h-(--nav-link-icon-height)">
                            <PanelLeft className="m-auto" />
                        </button>
                        <h1 className="flex-grow">
                            Header
                        </h1>
                    </header>
                    <nav
                        ref={navRef}
                        className={cn('fixed top-0 w-(--sidebar-width) h-screen bg-zinc-900 transition-[left] duration-[400ms] ease-out-quint',
                            open ? 'left-0' : '-left-(--sidebar-width)', "md:left-0 md:relative md:h-auto"
                        )}>
                        <ul data-name="sx-nav--group">
                            {links.map((link, i) => {
                                if (link.subNav) {
                                    return <SubNav isSidebarHidden={hide} setSidebarHide={setHide} nav={link} key={i} />
                                }
                                return (
                                    <li data-name="sx-nav_item"
                                        key={i}
                                        className="flex items-stretch hover:bg-purple-950 py-1 transition-[background-color] duration-[400ms] ease-out-quint">
                                        <Link href={link.href || '#'} data-name="sx-nav_link--icon"
                                            className="w-(--nav-link-icon-width) h-(--nav-link-icon-height) mx-(--sidebar-left-space) flex items-center justify-center">
                                            {link.icon}
                                        </Link>
                                        <Link href={link.href || '#'} data-name="sx-nav_link--text"
                                            className="w-[calc(100%-var(--nav-link-icon-width)-var(--sidebar-left-space))] flex items-center">
                                            <span>{link.text}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                    <footer>
                        <div data-name="sx-avatar"
                            className="h-(--avatar-space) w-(--avatar-space) border border-purple-500 rounded-full
                        flex justify-center items-center text-lg font-[600] overflow-hidden uppercase cursor-pointer md:ml-[calc(var(--sidebar-left-space)+7px)] md:mb-3">
                            <span>s</span>
                        </div>
                    </footer>
                </aside>
            </div>
            <main
                className="md:col-start-2">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;