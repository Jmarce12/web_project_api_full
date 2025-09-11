# Tripleten web_project_api_full

El objetivo principal de este proyecto es consolidar los conocimientos adquiridos sobre la creación y autorización de usuarios en un servidor. La funcionalidad del proyecto se centra en conectar el lado del cliente con el servidor de la aplicación, implementando autenticación y manejo de usuarios.

Para el lado de servidor, se crean los modelos de los usuarios añadiendo la información de correo y contraseña. Se le hace hash a la contraseña usando el módulo bcrypt con un salt de 10 caracteres.

Para las rutas se utiliza celebrate y joi para la comprobación de las entradas.

Se utiliza el módulo jwt para la creación y lectura de tokens, para que el usuario pueda mantener abierta la sesión por 7 días o hasta que cierre sesión.

Se usan las variables de estado para ejecutar el proyecto en producción.

Se crearon también registros de solicitudes y errores.

Se creó una máquina virtual con Google Cloud, se utiliza la autenticación por medio de ssh para poder conectar localmente con la VM.

Por medio de PM2 se gestionan los procesos del backend.

Se creó un subdominio para el backend, y con NGINX se configuran los puertos a los que se redirigirán las solicitudes del frontend.

Con Certbot se generan los certificados SSL.

Además, el proyecto abarca aspectos como el manejo de errores centralizado y el uso de CORS y solicitudes preflight.


www.wpaf.chickenkiller.com