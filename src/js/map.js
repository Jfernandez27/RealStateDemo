(function () {
    const lat = document.querySelector("#lat").value || -33.4379202401447;
    const lng = document.querySelector("#lng").value || -70.65038985314246;
    const map = L.map("map").setView([lat, lng], 12);
    let marker;

    //Use Provider $ Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //PIN
    marker = new L.marker([lat, lng], {
        draggable: true,
        autopan: true,
    }).addTo(map);

    //Get address
    marker.on("moveend", function (e) {
        marker = e.target;

        const position = marker.getLatLng();
        map.panTo(new L.LatLng(position.lat, position.lng));

        geocodeService
            .reverse()
            .latlng(position, 12)
            .run(function (error, res) {
                if (error) {
                    console.log("Error: " + error);
                }
                marker.bindPopup(res.address.LongLabel);

                document.querySelector(".street").textContent =
                    res?.address?.Address ?? "";
                document.querySelector("#street").value =
                    res?.address?.Address ?? "";
                document.querySelector("#lat").value = res?.latlng?.lat ?? "";
                document.querySelector("#lng").value = res?.latlng?.lng ?? "";
            });
    });
})();
