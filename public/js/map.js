/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\n    const lat = -33.4379202401447;\n    const lng = -70.65038985314246;\n    const map = L.map(\"map\").setView([lat, lng], 12);\n    let marker;\n\n    //Use Provider $ Geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n\n    L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n        attribution:\n            '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n    }).addTo(map);\n\n    //PIN\n    marker = new L.marker([lat, lng], {\n        draggable: true,\n        autopan: true,\n    }).addTo(map);\n\n    //Get address\n    marker.on(\"moveend\", function (e) {\n        marker = e.target;\n\n        const position = marker.getLatLng();\n        map.panTo(new L.LatLng(position.lat, position.lng));\n\n        geocodeService\n            .reverse()\n            .latlng(position, 12)\n            .run(function (error, res) {\n                // console.log(res);\n                if (error) {\n                    console.log(\"Error: \" + error);\n                }\n                marker.bindPopup(res.address.LongLabel);\n\n                document.querySelector(\".street\").textContent =\n                    res?.address?.Address ?? \"\";\n                document.querySelector(\"#street\").value =\n                    res?.address?.Address ?? \"\";\n                document.querySelector(\"#lat\").value = res?.latlng?.lat ?? \"\";\n                document.querySelector(\"#lng\").value = res?.latlng?.lng ?? \"\";\n            });\n    });\n})();\n\n\n//# sourceURL=webpack://realstate_demo/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;