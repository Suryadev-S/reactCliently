import { Apple, Bean, Boxes, Carrot } from "lucide-react";
import { JSX } from "react";


export interface SubNav{
    type: 'link' | 'button';
    href?: string;
    text: string
}

export interface INavLink {
    text: string;
    icon: JSX.Element;
    href?: string; // if href is not provided, it will be a button to open subnav
    subNav?: SubNav[]
}

const links: INavLink[] = [
    {
        href: "#",
        icon: <Apple />,
        text: 'home'
    },
    {
        href: "#",
        icon: <Bean />,
        text: "bean"
    },
    {
        href: "#",
        icon: <Boxes />,
        text: "boxes"
    },
    {
        icon: <Carrot />,
        text: 'Carrot',
        subNav: [
            {
                type: 'link',
                href: "#",
                text: "sub carrot 1"
            },
            {
                type: 'link',
                href: "#",
                text: "sub carrot 1"
            },
            {
                type: 'link',
                href: "#",
                text: "sub carrot 1"
            }
        ]
    }
]

export {
    links
};