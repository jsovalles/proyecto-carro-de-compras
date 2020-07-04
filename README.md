# proyecto-carro-de-compras

Proyecto JavaScript de un carro de compras

## Descripción del proyecto

Se realizo un simulador de una plataforma de venta de cursos informáticos con un template de Bootstrap; en este template se manejo una lista de los cursos que el usuario fue seleccionando y cada vez que el usuario seleccione un curso este es agregado al carrito de compras que esta en la parte superior derecha de la pantalla.

Un usuario solamente puede comprar un curso en específico, cuando el usuario selecciona un curso el botón queda desactivado; el usuario puede ver que cursos ha seleccionado con su total correspondiente de la compra si le da click al icono del carrito; la persona puede eliminar curso por curso o se puede eliminar en su totalidad toda la tabla.

![enter image description here](https://i.ibb.co/5KhfR9b/proyecto-carrito-de-compras.png)

Finalmente, para hacerlo un poco mas dinámico todos los datos de los cursos fueron guardados en el localStorage, haciendo que los datos de los cursos seleccionados puedan persistir incluso si el usuario cierra sesión en el navegador o si llega a abrir la página unos días después, se tuvo que trabajar con un formato JSON para que guardara los cursos en el local storage y se tuvo que hacer conversiones a string y a JSON cuando el usuario guarda o eliminara un curso.

El resultado final del curso se puede observar en este [link](https://jsovalles.github.io/proyecto-carro-de-compras/).

# Desarrollado en

* [Visual Studio Code](https://code.visualstudio.com/)
* JavaScript, CSS, HTML5

