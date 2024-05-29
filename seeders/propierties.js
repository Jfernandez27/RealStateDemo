import { Property } from "../models/index.js";

const headlines = [
    "Hermosa Casa Familiar",
    "Moderno Apartamento",
    "Amplia Casa de Campo",
    "Departamento en la Playa",
    "Casa con Vista al Mar",
    "Lujoso Ático",
    "Casa en el Centro",
    "Chalet en la Montaña",
    "Villa con Piscina",
    "Casa de Campo",
    "Penthouse Exclusivo",
    "Residencia Urbana",
    "Dúplex en el Centro",
    "Casa de Lujo",
    "Loft Moderno",
];
const descriptions = [
    "Una hermosa casa familiar en los suburbios.",
    "Un moderno apartamento en el centro de la ciudad.",
    "Una amplia casa de campo con jardín.",
    "Un departamento con vista a la playa.",
    "Casa con vistas espectaculares al mar.",
    "Un ático de lujo con todas las comodidades.",
    "Casa ubicada en el centro cerca de todo.",
    "Chalet acogedor en la montaña.",
    "Villa espaciosa con piscina privada.",
    "Encantadora casa de campo.",
    "Penthouse exclusivo en el corazón de la ciudad.",
    "Residencia urbana con diseño moderno.",
    "Dúplex amplio en el centro.",
    "Casa de lujo con acabados de alta calidad.",
    "Loft moderno con gran iluminación.",
];

// Coordenadas aproximadas de algunas ciudades en Chile
const cities = [
    { city: "Santiago", lat: -33.4489, lng: -70.6693 },
    { city: "Valparaíso", lat: -33.0458, lng: -71.6197 },
    { city: "Concepción", lat: -36.8201, lng: -73.0443 },
    { city: "La Serena", lat: -29.9027, lng: -71.2519 },
    { city: "Antofagasta", lat: -23.65, lng: -70.4 },
    { city: "Temuco", lat: -38.7359, lng: -72.5904 },
    { city: "Iquique", lat: -20.2141, lng: -70.1523 },
    { city: "Punta Arenas", lat: -53.1638, lng: -70.9171 },
];

const propertiesSeeder = {
    up: async () => {
        await Property.bulkCreate([
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },
            {
                headline:
                    headlines[
                        (Math.floor(Math.random() * 5) + 15) % headlines.length
                    ],
                description:
                    descriptions[
                        (Math.floor(Math.random() * 5) + 15) %
                            descriptions.length
                    ],
                bedrooms: Math.floor(Math.random() * 5) + 1, // 1 a 5 dormitorios
                bathrooms: Math.floor(Math.random() * 3) + 1, // 1 a 3 baños
                parkings: Math.floor(Math.random() * 3), // 0 a 2 estacionamientos
                street: `Calle ${Math.floor(Math.random() * 1000)}`,
                lat: `${
                    cities[Math.floor(Math.random() * cities.length)].lat +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                lng: `${
                    cities[Math.floor(Math.random() * cities.length)].lng +
                    (Math.random() - 0.5) * 0.1
                }`, // Variación aleatoria dentro de 0.1 grados
                image: "vv3r09npom81huuug5nu.jpg",
                published: Math.random() < 0.5, // Publicado o no
                categoryId: Math.floor(Math.random() * 5) + 1, // 1 a 5
                priceId: Math.floor(Math.random() * 7) + 1, // 1 a 7
                userId: Math.floor(Math.random() * 2) + 1, // 1 0 2
            },

            // { name: "Casa" },
            // { name: "Departamento" },
            // { name: "Bodega" },
            // { name: "Terreno" },
            // { name: "Cabaña" },
        ]);
    },
    down: async () => {
        await Property.destroy({ where: {}, truncate: true });
    },
};

export default propertiesSeeder;
