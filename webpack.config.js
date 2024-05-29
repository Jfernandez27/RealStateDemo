import path from "path";
export default {
    mode: "development",
    entry: {
        map: "./src/js/map.js",
        mapView: "./src/js/mapView.js",
        mapHome: "./src/js/mapHome.js",
        addImage: "./src/js/addImage.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public/js"),
    },
};
