# ToDoList

Aplicación web de lista de tareas construida con **Angular 21** (standalone, sin Zone.js en el flujo principal), **Tailwind CSS 4** y **DaisyUI 5**. Incluye routing, página de inicio y selector de tema claro/oscuro persistente.

## Requisitos

| Herramienta | Versión indicativa |
|-------------|-------------------|
| Node.js     | 20+ (recomendado) |
| npm         | 10+               |

## Inicio rápido

```bash
npm install
npm start
```

Abre [http://localhost:4200](http://localhost:4200). El servidor recarga al guardar cambios.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo (`ng serve`) |
| `npm run build` | Build de producción → `dist/` |
| `npm run watch` | Build en modo desarrollo con watch |
| `npm test` | Tests (Vitest) una pasada + cobertura; umbrales mínimos **85%** |
| `npm run test:watch` | Tests en watch (útil en local) |

Informes de cobertura HTML/LCOV en `coverage/` (suele estar en `.gitignore`).

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Angular 21 |
| Estilos | Tailwind 4 (`@tailwindcss/postcss`), DaisyUI 5 |
| Sass | Tokens y mixins globales (`src/styles/`) |
| Tests | Vitest + `@vitest/coverage-v8` vía `ng test` |

## Estructura relevante

```
src/
├── app/
│   ├── core/theme.service.ts   # Tema + localStorage
│   ├── home/                   # Ruta raíz
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.html                # Shell + navbar (toggle tema)
├── styles.css                  # Tailwind + plugin DaisyUI
└── styles.scss                 # @use de variables / base
```

## Tema claro / oscuro

El usuario elige **solo claro u oscuro** (no hay modo sistema). En la navbar: toggle DaisyUI con iconos sol/luna.

- Detalle de implementación: [`docs/tema.md`](docs/tema.md)
- Historial de cambios del feature: [`CHANGELOG.md`](CHANGELOG.md)

## Estilos y componentes

- **Globales**: `styles.css` importa Tailwind; `styles.scss` aplica base y tokens.
- **Parciales**: `_variables.scss`, `_mixins.scss`, `_index.scss` en `src/styles/`.
- En **componentes** `.scss`, preferí rutas relativas, por ejemplo:

```scss
@use '../styles/variables' as *;
@use '../styles/mixins' as *;
```

## Generar código (Angular CLI)

```bash
ng generate component nombre-componente
ng generate --help
```

## Referencias

- [Angular](https://angular.dev/) · [CLI](https://angular.dev/tools/cli)
- [Tailwind CSS v4](https://tailwindcss.com/docs) · [DaisyUI](https://daisyui.com/)
- [Vitest](https://vitest.dev/)

---

_Generado inicialmente con Angular CLI 21._
