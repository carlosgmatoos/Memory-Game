
export const getImages = (size) => {
    const images = [
        "/joly.JPG",
        "/juanlui.png",
        "/tapia.png",
        "/ciprian2.jpg",
        "/ciprian.png",
        "/gaby.png",
        "/guelo.png",
        "/jolyenferma.jpg",
        "/juane.jpg",
        "/laila.JPG"
    ];

    const newImages = images.slice(0, size);

    return newImages.flatMap(item => [`1|${item}`, `2|${item}`]).sort(() => Math.random() - 0.5);


}

