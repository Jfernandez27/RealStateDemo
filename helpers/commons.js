const isSeller = (userId, propertyUserId) => {
    return userId === propertyUserId;
};

const dateFormat = (dateToFormat) => {
    const newDate = new Date(dateToFormat).toISOString().slice(0, 10);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return new Date(newDate).toLocaleDateString("es-ES", options);
};

export { isSeller, dateFormat };
