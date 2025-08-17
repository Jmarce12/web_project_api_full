# Tripleten web_project_around_express

Este proyecto muestra la creación de un servidor con Node.js y Express.js.
Se crea la API que recibe las solicitudes del usuario y devuelve, ya sea:

- La lista de usuarios
- Información de un usuario en específico
- Creación de un usuario
- Actualización del usuario actual
- Actualización de la foto de perfil del usuario actual
- La lista de cartas
- Creación de una carta
- Eliminación de una carta
- Like o dislike de una carta por medio del ID de la carta y el usuario
- Mensaje de error en caso de una solicitud incorrecta

Para este proyecto se importan y exportan módulos de Node.js, se utiliza el módulo "fs" para la lectura de los archivos .JSON, rutas de archivos, enrutamiento dinámico y enrutamiento modular.
Adicional a esto se implementó la creación de la base de datos aroundb, la cuál almacena la información de los usuarios y
las tarjetas, y que también permite modificar dicha información.
