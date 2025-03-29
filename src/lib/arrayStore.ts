export const imagesArray = Array.from({ length: 25 }, (_, i) => ({
    img: `https://picsum.photos/200/${Math.floor(Math.random() * 600) + 100}`,
    text: `Random text ${i + 1}`
}));