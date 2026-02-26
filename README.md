<div align="center">

# ⚡ Fertor PF | Plataforma de Alto Rendimiento para Futbolistas

> *Aplicación web full-stack diseñada para la gestión integral de entrenamientos y rendimiento de futbolistas bajo la marca **Fertor PF** (@fertorpf).*

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/Vercel_Postgres-Database-4169E1?style=for-the-badge&logo=postgresql)

</div>

--- 

## 🚀 ¿Qué es Fertor PF?

**Fertor PF** es una solución digital completa orientada al mundo del fútbol, dividida en tres áreas principales de interacción:

- 🌍 **Sitio Web Público:** Una landing page orientada al marketing que incluye una sección "hero" de impacto, la metodología de trabajo y un feed integrado de la comunidad de Instagram.
- 🏃‍♂️ **Panel de Cliente (Jugadores):** Un dashboard privado donde los futbolistas registrados pueden visualizar sus estadísticas acumuladas, su radar de atributos (estilo videojuego) y su historial de partidos jugados.
- 📋 **Panel de Administración (Entrenador):** Un centro de mando donde el staff técnico gestiona los registros de los jugadores y añade los datos de los nuevos partidos para actualizar las gráficas automáticamente.

---

## 🛠️ Stack Tecnológico

El proyecto está construido con herramientas de vanguardia para garantizar velocidad, seguridad y un diseño impecable:

| Capa | Tecnología | Versión |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.1.3` |
| **UI Runtime** | React / React DOM | `19.2.3` |
| **Base de Datos** | Vercel Postgres (PostgreSQL) | `^0.10.0` |
| **Auth (Hashing)** | bcryptjs | `^3.0.3` |
| **Auth (JWT)** | jose | `^6.1.3` |
| **Gráficas** | recharts | `^3.7.0` |
| **Social Embed** | react-social-media-embed | `^2.5.18` |
| **Estilos** | Tailwind CSS (PostCSS) | `v4` |
| **Lenguaje** | TypeScript | `^5.0` |

---

## 🔐 Autenticación y Zonas de Usuario

La seguridad y el acceso a las páginas están controlados estrictamente por el archivo `middleware.ts`. La aplicación se divide en 3 zonas con permisos restrictivos:

- [x] **Zona Pública:** Accesible por cualquier usuario (`/`, `/contacto`, `/login`, `/registro`).
- [x] **Zona Cliente:** Rutas bajo `/cliente/*`. Exclusiva para jugadores con sesión activa.
- [x] **Zona Admin:** Rutas bajo `/admin/*`. Exclusiva para el entrenador/cuerpo técnico.

### 🛡️ Flujo de Seguridad
1. Las contraseñas se encriptan de forma segura utilizando `bcryptjs` en el servidor (`lib/auth.ts`).
2. Se utilizan **JSON Web Tokens (JWT)** generados mediante la librería `jose`.
3. El token firmado se almacena en una **cookie HTTP-only** (`session_token`), configurada con `secure`, `sameSite=strict` y `maxAge=7200` para prevenir vulnerabilidades.
4. En el frontend, se guardan datos públicos en `localStorage` (`usuario_activo` con `{ nombre, email, rol }`) para la reactividad de la UI (ej. el `Navbar`).

---

## 🗄️ Estructura de la Base de Datos

Toda la información se gestiona en PostgreSQL a través de 4 tablas principales fuertemente tipadas:

| Tabla | Propósito | Clave Foránea (FK) |
| :--- | :--- | :--- |
| `users` | Cuentas de usuario. Contiene el campo `rol` (`'admin'` o `'cliente'`). | - |
| `player_stats` | Estadísticas totales del jugador (equipo, posición, goles, minutos...). | `user_id → users.id` |
| `player_attributes` | Valoraciones de habilidades (velocidad, fuerza, táctica) para el Radar. | `user_id → users.id` |
| `partidos` | Registro individual de cada partido disputado. | `user_id → users.id` |

---

## 📁 Estructura del Proyecto

El repositorio sigue fielmente las convenciones del **App Router de Next.js**:

<details>
<summary><b>Haz clic para desplegar el árbol de directorios</b></summary>

```text
fertorpf/
├── app/
│   ├── layout.tsx              # RootLayout — Capa global, Navbar y Footer
│   ├── page.tsx                # Inicio (Página pública)
│   ├── contacto/page.tsx       # Formulario de contacto
│   ├── login/page.tsx          # Formulario de login
│   ├── registro/page.tsx       # Formulario de registro
│   ├── cliente/                # 🔒 ZONA PRIVADA JUGADORES
│   │   ├── layout.tsx          # ClientLayout — Navegación lateral
│   │   └── entrenamientos/     # Dashboard principal del jugador
│   ├── admin/                  # 🔒 ZONA PRIVADA ENTRENADOR
│   │   ├── dashboard/          # Panel principal — Tabla de gestión de jugadores
│   │   └── partido/            # Formulario de subida de partidos
│   ├── api/                    # ⚙️ RUTAS BACKEND (Auth, stats, partidos...)
│   ├── components/             # 🧩 Componentes UI (Navbar, WhatsAppButton, Modal...)
│   └── globals.css             # Archivo principal de Tailwind CSS
├── lib/
│   └── auth.ts                 # Funciones de encriptación y validación JWT
├── middleware.ts               # Guardián de rutas (Route protection)
├── tailwind.config.ts          # Configuración de diseño
├── next.config.ts              # Configuración de Next.js
└── package.json                # Dependencias y scripts
```

</details>

 ## 📚 Documentación Adicional
Para profundizar en el desarrollo y arquitectura del sistema, consulta los siguientes apartados en la Wiki del proyecto:

- 🚀 Getting Started: Instalación y ejecución del servidor de desarrollo con Turbopack.

- 🏗️ Architecture: Topología de componentes y límites de renderizado (Server vs Client Components).

- 🗃️ Database Schema: Definición completa de columnas SQL y relaciones.

- 🛡️ Authentication: Lógica detallada del Middleware y cookies.

- 🔌 API Reference: Shapes de Request/Response de todos los endpoints.

- 🎨 Styling: Flujo de trabajo con Tailwind CSS v4 y tipografías propias de la marca.

<p align="center">
<i>Diseñado para futbolistas que no se conforman con el promedio. Llevando el fútbol al siguiente nivel.</i>
</p>