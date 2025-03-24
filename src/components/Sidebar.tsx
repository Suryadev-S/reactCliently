'use client'
import { cn } from "@/utility/cn";
import { ChevronRight, Flame, Link2, PanelLeft, } from "lucide-react";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";


const SubNav = ({ isSidebarHidden, setSidebarHide }: { isSidebarHidden: boolean, setSidebarHide: Dispatch<SetStateAction<boolean>> }) => {
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
                    <Flame />
                </div>
                <div data-name="sx-nav_link--text"
                    className="w-[calc(100%-var(--nav-link-icon-width)-var(--sidebar-left-space))] flex items-center">
                    <span>sub nav</span>
                    <span data-name="sx-sub_nav--indicator" className="ml-auto">
                        <ChevronRight className={cn({ "rotate-90 transition-[rotate] duration-[400ms] ease-out-quint": open })} />
                    </span>
                </div>
            </div>
            <nav data-name="sx-sub_nav"
                className="overflow-hidden">
                <ul data-name="sx-sub_nav--group">
                    <li data-name="sx-sub_nav_item">
                        <Link href={'#'} data-name="sx-nav_link--text"
                            className="ml-[calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2)] 
                            w-[calc(100%-calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2))]
                            block border border-transparent hover:border-purple-500 transition-[border-color] duration-[400ms] ease-out-quint py-1 px-2">
                            link
                        </Link>
                    </li>
                    <li data-name="sx-sub_nav_item">
                        <Link href={'#'} data-name="sx-nav_link--text"
                            className="ml-[calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2)] 
                            w-[calc(100%-calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2))]
                            block border border-transparent hover:border-purple-500 transition-[border-color] duration-[400ms] ease-out-quint py-1 px-2">
                            link
                        </Link>
                    </li>
                    <li data-name="sx-sub_nav_item">
                        <Link href={'#'} data-name="sx-nav_link--text"
                            className="ml-[calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2)] 
                            w-[calc(100%-calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2))]
                            block border border-transparent hover:border-purple-500 transition-[border-color] duration-[400ms] ease-out-quint py-1 px-2">
                            link
                        </Link>
                    </li>
                    <li data-name="sx-sub_nav_item">
                        <Link href={'#'} data-name="sx-nav_link--text"
                            className="ml-[calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2)] 
                            w-[calc(100%-calc(var(--nav-link-icon-width)+var(--sidebar-left-space)*2))]
                            block border border-transparent hover:border-purple-500 transition-[border-color] duration-[400ms] ease-out-quint py-1 px-2">
                            link
                        </Link>
                    </li>
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
                            <li data-name="sx-nav_item"
                                className="flex items-stretch hover:bg-purple-950 py-1 transition-[background-color] duration-[400ms] ease-out-quint">
                                <Link href={'#'} data-name="sx-nav_link--icon"
                                    className="w-(--nav-link-icon-width) h-(--nav-link-icon-height) mx-(--sidebar-left-space) flex items-center justify-center">
                                    <Link2 />
                                </Link>
                                <Link href={'#'} data-name="sx-nav_link--text"
                                    className="w-[calc(100%-var(--nav-link-icon-width)-var(--sidebar-left-space))] flex items-center">
                                    <span>link babay</span>
                                </Link>
                            </li>
                            <li data-name="sx-nav_item"
                                className="flex items-stretch hover:bg-purple-950 py-1 transition-[background-color] duration-[400ms] ease-out-quint">
                                <Link href={'#'} data-name="sx-nav_link--icon"
                                    className="w-(--nav-link-icon-width) h-(--nav-link-icon-height) mx-(--sidebar-left-space) flex items-center justify-center">
                                    <Link2 />
                                </Link>
                                <Link href={'#'} data-name="sx-nav_link--text"
                                    className="w-[calc(100%-var(--nav-link-icon-width)-var(--sidebar-left-space))] flex items-center">
                                    <span>link babay</span>
                                </Link>
                            </li>
                            {/* <li data-name="sx-nav_item"
                                className="flex items-stretch hover:bg-purple-950">
                                <SubNav />
                            </li> */}
                            <SubNav isSidebarHidden={hide} setSidebarHide={setHide} />
                            <SubNav isSidebarHidden={hide} setSidebarHide={setHide} />
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
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde ipsa nihil amet ipsam hic blanditiis praesentium illo deserunt laboriosam, minus obcaecati rerum qui quo nostrum ea? Aut necessitatibus optio cupiditate minus sint dolor. Cupiditate possimus neque cumque, facere aspernatur voluptates nihil velit dolorem quo hic ducimus autem quas saepe veritatis impedit tenetur eos natus omnis! Exercitationem mollitia ut doloribus aliquid odit dolores, aspernatur ipsa modi ducimus accusantium ea ipsam eum, quod expedita impedit deserunt voluptates quasi amet, tempora veniam aperiam quia excepturi vero?
                    Commodi, hic asperiores quidem animi reiciendis dignissimos facilis a iste ipsum pariatur minus eius eos id non esse repudiandae sit quo? Architecto sapiente eius quis accusantium odio nesciunt voluptate distinctio minus odit corporis rem minima magni inventore ipsam molestiae libero laudantium vitae ea sunt, accusamus nemo animi corrupti. At nemo quas nulla eligendi obcaecati id velit soluta dolor, vero modi sequi explicabo quis distinctio officiis libero quia magni sit blanditiis, dicta voluptatum consequatur recusandae necessitatibus quod. Impedit accusantium laudantium voluptatem? Ut commodi quos nostrum similique optio vero, distinctio corporis a iste. Libero optio accusantium necessitatibus officia, ipsam dolore, soluta minus aliquam quas, facere odit temporibus laudantium. Id expedita, similique tempora animi maxime ad, sit iste quam molestiae quaerat deserunt fugiat quas beatae sapiente. Cumque, dolores deleniti. Veniam sequi itaque quibusdam nulla nobis
                    perferendis deserunt sed esse amet. Nemo saepe
                    necessitatibus unde facilis dolore reiciendis corrupti doloremque inventore architecto consequuntur, ducimus aliquam sunt ipsa nesciunt. Exercitationem officiis eveniet veniam illo molestias magnam est! Eligendi quo sapiente perferendis veritatis perspiciatis! Accusantium voluptatum architecto sequi.
                </p>
            </main>
        </div>
    );
};

export default Sidebar;