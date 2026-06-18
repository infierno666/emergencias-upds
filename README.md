This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
---
bash 
```
emergencias-upds/
├── app/                      # 🌐 RUTAS Y PÁGINAS (Frontend principal)
│   ├── dashboard/            # Panel principal
│   │   └── page.tsx          # Tablero de incidentes (Operador/Coordinador)
│   ├── globals.css           # Estilos base (Escala de grises)
│   ├── layout.tsx            # Estructura maestra de la web
│   └── page.tsx              # Landing inicial o redirección
│
├── components/               # 🧩 COMPONENTES VISUALES (Client/Server Components)
│   ├── ui/                   # Componentes genéricos (Botones, Inputs, Modales)
│   └── incidentes/           # Componentes del dominio (Formulario, Tarjeta de emergencia)
│
├── actions/                  # ⚙️ LÓGICA DE SERVIDOR (Next.js Server Actions)
│   └── incidentes.ts         # Funciones backend para insertar/actualizar en Supabase
│
├── lib/                      # 🛠️ CONFIGURACIONES Y UTILIDADES
│   ├── supabase.ts           # El cliente de conexión que acabamos de crear
│   └── utils.ts              # Funciones de ayuda (ej. formatear fechas)
│
├── types/                    # 🏷️ TIPADOS DE TYPESCRIPT
│   └── index.ts              # Interfaces (ej. la estructura de la tabla 'incidentes')
│
├── .env.local                # 🔒 VARIABLES DE ENTORNO (Credenciales)
├── tailwind.config.ts        # Configuración visual
└── postcss.config.mjs
```
---