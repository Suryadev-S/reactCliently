'use client'

import { useEffect } from "react";

interface GalleryContent {
    img?: string;
    text?: string;
}

const GalleryItem = ({ galleryContent }: { galleryContent: GalleryContent }) => {
    return (
        <li data-name="sx-gallery_item">
            <div data-name="sx-card" className="rounded overflow-hidden m-1 relative">
                {galleryContent.img && <img src={galleryContent.img} alt="gallery_imgage" className="w-full h-full object-contain" />}
                {galleryContent.text && <div className="absolute bottom-2 left-1.5 text-white text-xs">{galleryContent.text}</div>}
            </div>
        </li>
    )
}

const Gallery = ({ list }: { list: GalleryContent[] }) => {
    useEffect(() => {
        const applyMasonryLayout = () => {
            const galleryGroup = document.querySelector("[data-name='sx-gallery--group']");
            if (!galleryGroup) return;

            const computedStyle = window.getComputedStyle(galleryGroup);
            const columns = computedStyle.getPropertyValue("grid-template-columns").split(" ").length;

            const galleryItems = document.querySelectorAll("[data-name='sx-gallery_item']");
            galleryItems.forEach((item, i) => {
                const childItem = item.firstElementChild as HTMLElement | null;
                if (!childItem) return;

                const difference = item.getBoundingClientRect().bottom - childItem.getBoundingClientRect().bottom;
                if (difference > 0) {
                    const nextItemIndex = i + columns;
                    const nextItem = galleryItems[nextItemIndex] as HTMLElement | null;
                    
                    if (nextItem) {
                        const nextItemChild = nextItem.firstElementChild as HTMLElement | null;
                        if (nextItemChild) {
                            nextItemChild.style.marginTop = `-${difference}px`;
                        }
                    }
                }
            });
        };

        window.addEventListener('load', applyMasonryLayout);
        window.addEventListener('resize', applyMasonryLayout);
        
        return () => {
            window.removeEventListener('load', applyMasonryLayout);
            window.removeEventListener('resize', applyMasonryLayout);
        };
    }, [JSON.stringify(list)])
    return (
        <div data-name="sx-gallery">
            <ul data-name="sx-gallery--group"
                className="grid grid-cols-2 py-1 px-2 gap-y-1.5 
            md:grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] md:p-0">
                {list.length > 0 && list.map((item, i) => (
                    <GalleryItem galleryContent={item} key={i} />
                ))}
                {list.length === 0 && <li>No items present</li>}
            </ul>
        </div>
    )
}

export default Gallery;