# Raftel Shop

Raftel Shop es una plataforma de comercio electrónico para la compra de zapatillas. Este proyecto muestra una tienda en línea completa con varias funcionalidades para mejorar la experiencia de compra.

## Requisitos

Node.js
React
React Router
React Toastify

## Instalación

Clonar el repositorio.

## Instalar las dependencias necesarias usando npm:

```sh
npm install
```

## Iniciar el servidor de desarrollo:

```sh
npm start
```

## Acceder a la aplicación en el navegador:

```sh
http://localhost:5173/
```

## Estructura del Proyecto

```plaintext
.
├── src
│   ├── assets
│   │   ├── logo_df.png
│   │   ├── react.svg
│   │   └── wordk in progress.jpg
│   ├── components
│   │   ├── CartContext.js
│   │   ├── CartBrief.js
│   │   ├── CheckoutProvider.js
│   │   ├── Footer.js
│   │   ├── NavBar.js
│   │   ├── ProductCard.js
│   │   ├── ToastContainer.js
│   │   └── ...
│   ├── App.css
│   ├── App.js
│   ├── index.js
└─── README.md
```

## Rutas Disponibles

### Páginas

-Página Principal: Muestra el catálogo de productos debajo de un banner de bienvenida.
-Catálogo de Productos: Lista de todos los productos disponibles con filtros.
-Página de Detalle de Producto: Muestra información detallada sobre un producto seleccionado.
-Carrito: Ver los artículos seleccionados, con opciones para actualizar la cantidad o eliminar artículos.
-Checkout: Revisar detalles de la compra, elegir opciones de envío y seleccionar métodos de pago.
-Resultado del Pago: Muestra el resultado del proceso de pago.
-Contacto: Información de contacto y formulario.
-Proximamente: Productos próximos.

## Rutas de Navegación

```plaintext
<Route path="/" element={<ItemListContainer greeting={customGreeting} />} />
<Route path="/catalogo" element={<Catalogo sideBar={true} />} />
<Route path="/categorias/:categoryId" element={<Catalogo sideBar={true} />} />
<Route path="/producto/:id" element={<DetalleProducto />} />
<Route path="/contacto" element={<Contacto />} />
<Route path="/proximamente" element={<Proximamente />} />
<Route path="/Cart" element={<Cart />} />
<Route path="/carrito" element={<CartBrief />} />
<Route path="/Checkout" element={<Pago />} />
<Route path="/resultadopago" element={<ResultadoPago />} />
```

## Tecnologías Utilizadas

React: Librería de front-end para construir interfaces de usuario.
React Router: Librería para manejar enrutamiento en aplicaciones React.
React Toastify: Librería para mostrar notificaciones.
CSS: Estilización.
JavaScript: Lenguaje de programación para desarrollo web.

## Utilización

Catálogo de Productos
La página principal muestra el catálogo de productos, con opciones de filtrado en el lado izquierdo para categorías como:

Deportivas
Urbanas
Hombre
Mujer
Unisex
Detalle de Producto
Al seleccionar un producto, se muestra una página de detalle donde se puede:

Elegir la cantidad de productos a agregar al carrito.
Utilizar el botón "Agregar al Carrito".
Utilizar el botón "Comprar Ahora" para una compra directa.
Carrito y Checkout
El carrito permite revisar los artículos seleccionados, actualizar cantidades, eliminar artículos y proceder al checkout. En la página de checkout, se pueden elegir opciones de envío (retiro en tienda o entrega a domicilio) y métodos de pago (transferencia, débito o crédito).

