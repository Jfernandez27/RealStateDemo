(function () {
    const lat = -33.4379202401447;
    const lng = -70.65038985314246;
    const map = L.map("map").setView([lat, lng], 12);
    let markers = new L.FeatureGroup().addTo(map);
    let properties = [];

    //Filters
    const filters = {
        category: "",
        price: "",
    };

    const categorySelected = document.querySelector("#categories");
    const priceSelected = document.querySelector("#prices");

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    categorySelected.addEventListener("change", (e) => {
        filters.category = +e.target.value;
        filterProperties();
    });
    priceSelected.addEventListener("change", (e) => {
        filters.price = +e.target.value;
        filterProperties();
    });

    const getProperties = async () => {
        try {
            const url = "/api/properties";
            const response = await fetch(url);
            properties = await response.json();

            showProperties(properties);
        } catch (error) {
            console.log(error);
        }
    };

    const showProperties = (properties) => {
        //Clean Pins
        markers.clearLayers();

        properties.forEach((property) => {
            //Add Pin
            const marker = new L.marker([property?.lat, property?.lng], {
                autoPan: true,
            })
                .addTo(map)
                .bindPopup(
                    `
                    <p class="text-indigo-600 font-bold">${property?.category.name}</p>
                    <h1 class="text-xl font-extrabold uppercase my-3">${property?.headline}</h1>
                    <img src="/uploads/${property?.image}" alt="Imagen de la propiedad ${property?.headline}">
                    <p class="text-gray-600 font-bold">${property?.price.name}</p>
                    <a href="/property/${property.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase ">Ver Propiedad</a>
                    
                    `
                );

            markers.addLayer(marker);
        });
    };

    const filterProperties = () => {
        const result = properties.filter(filterCategory).filter(filterPrice);
        showProperties(result);
    };

    const filterCategory = (property) => {
        return filters.category
            ? property.categoryId === filters.category
            : property;
    };
    const filterPrice = (property) => {
        return filters.price ? property.priceId === filters.price : property;
    };

    getProperties();
})();
