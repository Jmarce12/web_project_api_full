# Tripleten web_project_around_auth

En este proyecto se trabajó el registro y la autorización en el front end.
Tomando como base el proyecto de React "Alrededor de los EE.UU.", se realizaron las siguientes mejoras:

- Se creó la ruta principal "/" para usuarios autorizados.
- Se crearon dos nuevas rutas: /signup y /signin. Estas rutas son para usuarios no autorizados.
- Se crearon los componentes Login (autorización de usuarios), Register (registro de usuarios), ProtectedRoute (para proteger la ruta principal de usuarios no autorizados), e InfoTooltip (una ventana modal para informar si el registro fue exitoso o no).
- Se trabajó con la API de Tripleten para realizar los registros y autorizaciones.
- Se creó el módulo "auth" con los métodos necesarios para crear usuarios, iniciar sesión y obtener la información del usuario conectado.
- Se implementó el almacenamiento local con la propiedad localStorage para almacenar y leer tokens.
- Se implementó una medida para prevenir los ataques XSS.
- Se creó la parte móbil de la aplicación para funcionar en celulares.

Adicional a esto se puso en práctica los conocimientos sobre enrutamiento, contextos, hooks y demás herramientas de React.
