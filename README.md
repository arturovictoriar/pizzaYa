# PizzaYa

## Description

Soy el dueño de una pizzería, y necesito saber el tracking de las pizzas que estoy vendiendo diariamente.

Cada pizza está compuesta por la masa con un costo base de 10.000 pesos y un precio adicional por los ingredientes que se usen, debe haber mínimo 15 ingredientes para seleccionar con un costo de 3.000 cada uno , excepto el pollo que tiene un costo de 5.000 y el peperoni que tiene un costo 4.500.

Debe haber una sección en donde se cree la pizza, se puedan añadir y quitar ingredientes y me calcule el precio de cada pizza. Adicional cada pizza debe tener un nombre tener un nombre.

Cuando tenga la pizza lista deseo, agregar información de a quien se le vendió la pizza, la información que necesito que sea guardad es ( Nombre , teléfono, nombre de la pizza, el precio y fecha ).

Como deseo ver el tracking de las pizzas debo tener un dashboard en donde pueda consultar las pizzas que he vendido a lo largo del tiempo, y donde pueda ver el detalle de cada una de las pizzas.

## Requerimientos

Nota: Solo la masa cuesta 10.000 pesos y los ingredientes adicionales cuestan 3.000 pesos, excepto el pollo que cuesta 5.000 pesos y el peperonni que cuesta 4.500 pesos. La pizzeria cuenta con mas de 15 ingredientes disponibles para adicionarle a la pizza.

- Desarrollar una vista para crear una pizza, aqui se puede añadir y quitar ingredientes. La pizza debe tener un nombre. Debe calcular el valor de la pizza.

- Desarrollar una vista para hacer el checkout de las pizzas. Aqui se debe pedir la informacion del cliente: Nombre, telefono, nombre de la piza, precio y fecha.

- Desarrollar una vista para que muestre el traking diario de las pizzas. Aqui se tiene que ver el detalle de las pizzas: Ingredientes, numero de pizzas, nombre de la pizza, precio de la pizza y la fecha en que se vendio; y de los clientes: Nombre y telefono.

## Solucion

Para el desarrollo de este projecto, se utilizaron las librerias react, react-dom y react-scrips.

La plataforma diseñada cuenta con 3 vistas: en la principal se puede construir la pizza y ver el total del pedido, en la segunda se puede confirmar el pedido ingresando los datos del cliente y en la tercera se puede ver el tracking que la pizeria ha tenido en el dia.

Nota 1: Para la lista de "opciones de aderezo", la lista de "aderezo selecionado" y la lista de "tracking" se planteo una ventana sin BarScroll visible pero con la funcionalidad de scrolling.

Nota 2: Para salir de la vista "confirmar el pedido" se debe obligatoriamente ingresar el nombre y el telefono de la cliente para la pizza seleccionada.

## Instalacion

Instala Node.js

## Uso

Entra a la carpeta app_pizzaya
- cd app_pizzaya

Instala todos los componentes necesarios para trabajar con react
- npm install

Una vez instalado todo, ejecuta el modo development para ver el projecto en tu browser
- yarn start

## Estatus del projecto

La plataforma PizzaYa se le debe mejorar el css en las vistas de tracking y confirm order, pero esta funcionando deacuerdo a los requerimientos. Se debe hacer un split del codigo en components para que quede mas organizado.

## Problemas

Formato CSS con tablas en React

Puede aparecerte un error de vulnerabilidad cuando instales todas las dependencias en win o mac. Solo son advertencias asi que no hay mucho problema con ello.

## Licencia

free use license

## Author

[Arturo Victoria Rincon](https://github.com/arvicrin)