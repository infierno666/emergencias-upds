# Sistema Web de Gestión de Emergencias Universitarias


### Universidad Privada Domingo Savio (UPDS)

Sistema para la gestión, seguimiento y monitoreo de incidentes en tiempo real dentro del campus universitario.


![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge\&logo=supabase\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)


---

## Descripción

Este proyecto corresponde al Producto Mínimo Viable (MVP) desarrollado para la actividad **A5. Hackatón: Desarrollo y Debugging** de la Universidad Privada Domingo Savio.

La plataforma centraliza el registro y seguimiento de incidentes dentro del campus universitario, permitiendo una gestión eficiente de emergencias mediante una interfaz web moderna y actualizaciones en tiempo real.

---

## Características

### Autenticación

* Registro de usuarios
* Inicio de sesión seguro
* Gestión de sesiones mediante Supabase Auth

### Gestión de Incidentes

* Registro de incidentes
* Clasificación por tipo
* Registro de ubicación
* Descripción detallada del evento

### Dashboard en Tiempo Real

* Visualización inmediata de incidentes
* Actualización automática mediante Supabase Realtime
* Seguimiento del estado de atención

### Gestión Operativa

Estados disponibles:

| Estado     |
| ---------- |
| Pendiente  |
| En Proceso |
| Resuelto   |

### Roles del Sistema

| Rol         | Funcionalidades                   |
| ----------- | --------------------------------- |
| Operador    | Registrar y visualizar incidentes |
| Coordinador | Supervisar y actualizar estados   |

---

## Tecnologías Utilizadas

| Tecnología         | Función                 |
| ------------------ | ----------------------- |
| Next.js App Router | Frontend y Backend      |
| TypeScript         | Desarrollo tipado       |
| Supabase           | Backend as a Service    |
| PostgreSQL         | Base de datos           |
| Supabase Realtime  | Actualizaciones en vivo |
| Tailwind CSS       | Diseño de interfaz      |
| Vercel             | Despliegue              |

---

## Arquitectura del Proyecto

```bash
emergencias-upds/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   └── incidentes/
│
├── actions/
│   ├── auth.ts
│   └── incidentes.ts
│
├── lib/
│   └── supabase/
│
├── types/
│   └── index.ts
│
├── .env.local
│
└── tailwind.config.ts
```

---

## Instalación

### Clonar repositorio

```bash
git clone https://github.com/infierno666/emergencias-upds.git

cd emergencias-upds
```

### Instalar dependencias

```bash
npm install
```


### Ejecutar proyecto

```bash
npm run dev
```

### Acceder al sistema

```text
http://localhost:3000
```

---

## Seguridad

* Supabase Authentication
* Row Level Security (RLS)
* Control de acceso basado en roles
* Variables de entorno protegidas

---

## Estado del Proyecto

| Módulo                 | Estado    |
| ---------------------- | --------- |
| Autenticación          | Completo  |
| Registro de Incidentes | Completo  |
| Dashboard              | Completo  |
| Gestión de Estados     | Completo  |
| Integración Supabase   | Completo  |
| Notificaciones         | Pendiente |
| Reportes               | Pendiente |
| Geolocalización        | Pendiente |

---

## Equipo de Desarrollo

| Integrante                | Responsabilidad                   |
| ------------------------- | --------------------------------- |
| Daniel Maldonado Cespedes | Frontend y Diseño UI/UX           |
| Alisson Huayraña Caero    | QA e Integración de Autenticación |
| Nicolas Barrancos Arze    | Backend e Integración             |
| Isaias Recini Flores      | Base de Datos y Seguridad         |

---

## Contexto Académico

**Universidad Privada Domingo Savio**

Carrera de Ingeniería de Sistemas

Gestión 2026

Hackatón: Desarrollo y Debugging

---


Sistema Web de Gestión de Emergencias Universitarias

UPDS · 2026



