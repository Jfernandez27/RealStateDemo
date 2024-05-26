const admin = (req, res) => {
    res.render("properties/admin", {
        title: "Mis propiedades",
        header: true,
    });
};

const create = (req, res) => {
    res.render("properties/create", {
        title: "Crear Propiedad",
        csrfToken: req.csrfToken(),
        header: true,
    });
};

export { admin, create };
