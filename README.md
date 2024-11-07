# Proyecto de Gestión de Productos y Carritos con Node.js, Express y MongoDB

## Descripción

Este proyecto consiste en un sistema de gestión de productos y carritos de compras, implementado con **Node.js**, **Express**, **MongoDB**, **Mongoose** y **Handlebars**. Además, utiliza **Multer** para la carga de archivos y **Socket.io** para la actualización en tiempo real de la lista de productos.

## Funcionalidades

**CRUD de productos:** Crear, leer, actualizar y eliminar productos en el sistema.
**CRUD de carritos:** Crear, leer, actualizar y eliminar carritos.
**Paginación y filtros:** El endpoint GET de productos soporta paginación (por limit y page), filtrado por consultas y ordenamiento por precio.
**Vista en tiempo real:** Utiliza Socket.io para mostrar la lista de productos actualizada en tiempo real en la interfaz de usuario.
**Carga de archivos:** Soporta la carga de imágenes de productos a través de Multer.
**Carrito dinámico:** Los productos pueden ser agregados o eliminados de un carrito, y la cantidad de unidades de un producto en el carrito puede ser actualizada.

## Tecnologías

**Node.js:** Para la ejecución del servidor.
**Express:** Para la creación de APIs RESTful.
**MongoDB:** Para la persistencia de datos.
**Mongoose:** Para interactuar con MongoDB desde el servidor.
**Handlebars:** Para renderizar vistas dinámicas del lado del cliente.
**Multer:** Middleware para manejar la carga de archivos.
**Socket.io:** Para la comunicación en tiempo real entre cliente y servidor.

## Instalación

Para ejecutar esta aplicación en tu entorno local, sigue los siguientes pasos:

1. **Clona el repositorio:**

`git clone https://github.com/pablojanb/entregaFinalJankowski.git`

2. **Navega a la carpeta del proyecto:**

`cd entregaFinalJankowski`

3. **Instala las dependencias:**

`npm install`

4. **Crea tu base de datos y modifica la URL de conexión a MongoDB:**

`mongodb://localhost:27017/my_db?retryWrites=true&w=majority`

5. **Inicia el servidor de desarrollo:**

`npm run dev`