#  AdminBot: Gestión de Asistencia y Pagos con IA

AdminBot es una aplicación web integral diseñada para centros educativos. Permite el registro de asistencia y el control de pagos de estudiantes, automatizando la comunicación con los padres de familia mediante alertas de WhatsApp en tiempo real.

Este proyecto destaca por el uso estratégico de **Inteligencia Artificial** (ChatGPT, GitHub Copilot, Codeium) para optimizar el ciclo de desarrollo.

##  Características Principales

- **Registro de Asistencia:** Control diario de ingresos y faltas.
- **Gestión de Pagos:** Monitoreo de mensualidades y saldos pendientes.
- **Alertas Automáticas:** Envío de mensajes vía WhatsApp ante inasistencias o deudas.
- **Dashboard Interactivo:** Interfaz moderna para la administración de datos.
- **Arquitectura Robusta:** API REST propia conectada a base de datos SQL.

##  Stack Tecnológico

| Componente        | Tecnologías                                      |
| :---------------- | :----------------------------------------------- |
| **Frontend**      | HTML5, CSS3, JavaScript, Vite (Diseño asistido por IA) |
| **Backend**       | Node.js, Express.js, MySQL2, JWT, bcrypt         |
| **Base de Datos** | SQL (MySQL)                                      |
| **Integraciones** | API de WhatsApp (UltraMsg / WATI)                |
| **IA Tools**      | ChatGPT, GitHub Copilot, Codeium                 |
| **Despliegue**    | Git, GitHub Pages / Replit                       |

##  Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- MySQL (o SQL Server)
- Una cuenta en un servicio de WhatsApp API (UltraMsg o WATI)

### Backend
1. Navega al directorio `backEnd`:
   ```
   cd backEnd
   ```
2. Instala las dependencias:
   ```
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env` (copia de `.env.example` si existe):
   - Configura la conexión a la base de datos (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
   - Configura JWT_SECRET
   - Configura las credenciales de WhatsApp API

### Frontend
1. Navega al directorio `frontEnd`:
   ```
   cd frontEnd
   ```
2. Instala las dependencias:
   ```
   npm install
   ```

##  Ejecución

### Desarrollo
1. **Backend:** En el directorio `backEnd`, ejecuta:
   ```
   npm run dev
   ```
   El servidor se ejecutará en `http://localhost:3000` (o el puerto configurado).

2. **Frontend:** En el directorio `frontEnd`, ejecuta:
   ```
   npm run dev
   ```
   La aplicación se ejecutará en `http://localhost:5173` (puerto por defecto de Vite).

### Producción
1. **Frontend:** Construye la aplicación:
   ```
   npm run build
   ```
   Los archivos se generarán en el directorio `dist`.

2. **Despliegue:** Sube el contenido de `frontEnd/dist` a un servidor web y configura el backend en un servidor Node.js.

##  Estructura del Proyecto

```
adminBot Increible/
├── readme.md
├── assets/
│   ├── icons/
│   ├── images/
│   └── logos/
├── backEnd/
│   ├── app.js
│   ├── package.json
│   ├── config/
│   │   ├── auth.middleware.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── attendance.controller.js
│   │   ├── auth.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── guardian.controller.js
│   │   ├── notification.controller.js
│   │   ├── payment.controller.js
│   │   ├── student.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── accounts_receivable.model.js
│   │   ├── attendance.model.js
│   │   ├── auth.model.js
│   │   ├── charge_types.model.js
│   │   ├── dashboard.model.js
│   │   ├── guardians.model.js
│   │   ├── payments.model.js
│   │   ├── student_guardians.model.js
│   │   ├── students.model.js
│   │   ├── users.model.js
│   │   └── whatsapp_notifications.model.js
│   ├── modules/
│   │   └── whatsapp/
│   │       ├── whatsapp.controller.js
│   │       ├── whatsapp.routes.js
│   │       └── whatsapp.services.js
│   └── routes/
│       ├── attendance.route.js
│       ├── auth.route.js
│       ├── dashboard.route.js
│       ├── guardians.route.js
│       ├── payments.route.js
│       ├── students.route.js
│       ├── users.route.js
│       └── whatsapp_notifications.route.js
└── frontEnd/
    ├── index.html
    ├── package.json
    ├── public/
    ├── src/
    │   ├── main.js
    │   ├── assets/
    │   │   ├── css/
    │   │   └── js/
    │   ├── pages/
    │   │   ├── alerts/
    │   │   ├── attendance/
    │   │   ├── auth/
    │   │   ├── dashboard/
    │   │   ├── notfound/
    │   │   ├── payments/
    │   │   ├── settings/
    │   │   ├── students/
    │   │   └── users/
    │   └── shared/
    │       ├── components/
    │       │   ├── card.js
    │       │   ├── modal.js
    │       │   ├── navbar.js
    │       │   ├── sidebar.js
    │       │   └── table.js
    │       └── css/
    │           ├── global.css
    │           ├── layout.css
    │           ├── main.css
    │           ├── reset.css
    │           └── variables.css
    └── shared/
        └── js/
            ├── api.js
            ├── robotScene.js
            ├── router.js
            ├── storage.js
            └── utils.js
```

##  Avances del Proyecto

Hasta la fecha, el proyecto ha alcanzado los siguientes hitos:

- **Backend Completo:** API REST implementada con autenticación JWT, modelos de datos para estudiantes, pagos, asistencia, usuarios y tutores. Integración con WhatsApp para notificaciones automáticas.
- **Frontend Interactivo:** Interfaz de usuario moderna con páginas dedicadas para dashboard, gestión de estudiantes, pagos, asistencia, usuarios y configuraciones. Componentes reutilizables como navbar, sidebar y modales.
- **Integración WhatsApp:** Módulo dedicado para envío de alertas vía API de WhatsApp.
- **Base de Datos:** Modelos y esquemas definidos para MySQL, incluyendo relaciones entre estudiantes, tutores y pagos.
- **Autenticación y Seguridad:** Middleware de autenticación implementado con bcrypt para hashing de contraseñas.
- **Desarrollo Asistido por IA:** Uso extensivo de herramientas de IA para acelerar el desarrollo de código, diseño y resolución de problemas.

Próximos pasos incluyen pruebas exhaustivas, optimización de rendimiento y despliegue en producción.

##  Contribución

Si deseas contribuir al proyecto:
1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

##  Licencia

Este proyecto está bajo la Licencia ISC.