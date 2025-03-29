import Gallery from "@/components/Gallery";
import { imagesArray } from "@/lib/arrayStore";
import Image from "next/image";

export default function Home() {
  return (
    <>
      content
      <Gallery list={imagesArray} />
    </>
  );
}
