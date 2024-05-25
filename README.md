# RealStateDemo

RealStateDemo es una aplicación demo desarrollada para practicar Node.js. Utiliza una arquitectura MVC y está construida con un stack moderno que incluye Node, MySQL, Express, Tailwind CSS, Pug y Sequelize.

## Descripción

Esta aplicación de demostración permite gestionar información relacionada con bienes raíces, incluyendo la creación, visualización y administración de propiedades. Fue desarrollada con el propósito de practicar y demostrar el uso de Node.js y sus tecnologías complementarias en una estructura MVC.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de desarrollo de backend basada en JavaScript.
- **Express**: Framework minimalista para Node.js que facilita la construcción de aplicaciones web y APIs.
- **MySQL**: Sistema de gestión de bases de datos relacional.
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js que facilita las interacciones con la base de datos.
- **Pug**: Motor de plantillas para Node.js que permite generar HTML de forma dinámica.
- **Tailwind CSS**: Framework de CSS utilitario que facilita el diseño de interfaces web.

## Arquitectura

La aplicación sigue el patrón de diseño MVC (Model-View-Controller), que separa la lógica de la aplicación en tres componentes principales:

- **Modelos (Models)**: Representan la estructura de datos y la lógica de la base de datos utilizando Sequelize.
- **Vistas (Views)**: Las plantillas Pug que renderizan el contenido HTML.
- **Controladores (Controllers)**: Gestionan la lógica de negocio y la interacción entre los modelos y las vistas.

## Estructura del Proyecto

RealStateDemo/
├── controllers/
│   └── ...
├── models/
│   └── ...
├── views/
│   └── ...
├── public/
│   └── ...
├── routes/
│   └── ...
├── config/
│   └── ...
├── app.js
├── package.json
└── README.md



## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Jfernandez27/RealStateDemo.git
   cd RealStateDemo

2. **Instalar las dependencias:**

    ```bash
    npm install

3. **Configuración de la base de datos:**
Crea una base de datos MySQL y actualiza las credenciales de conexión en el archivo config/config.json.

4. **Migrar y sembrar la base de datos:**

    ```bash
    npx sequelize db:migrate
    npx sequelize db:seed:all


5. **Iniciar la aplicacion:**

    ```bash
    npm start

## Uso

Accede a la aplicación en tu navegador web en la dirección `http://localhost:3000`.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, crea un fork del proyecto, realiza tus cambios y envía un pull request.

## Licencia
Este proyecto está licenciado bajo la MIT License.

---

¡Gracias por utilizar RealStateDemo! Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.