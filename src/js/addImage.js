import { Dropzone } from "dropzone";

const token = document
    .querySelector("meta[name='csrf-token'")
    .getAttribute("content");

Dropzone.options.image = {
    dictDefaultMessage: "Agrega tus imagenes aqui",
    acceptedFiles: ".png, .jpg, .jpeg",
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: "Borrar archivo",
    dictMaxFilesExceeded: "El limite es 1 archivo",
    headers: {
        "CSRF-Token": token,
    },
    paramName: "image",
    init: function () {
        const dropzone = this;
        const btnPublish = document.querySelector("#publish");

        btnPublish.addEventListener("click", function () {
            dropzone.processQueue();
        });

        dropzone.on("queuecomplete", function () {
            if (dropzone.getActiveFiles().length == 0) {
                window.location.href = "/myProperties";
            }
        });
    },
};
