# Despliegue en Cloudflare Pages

Este documento describe cómo desplegar el sitio web de Terapia de Pareja Medellín en Cloudflare Pages.

## Prerrequisitos

1. Cuenta de Cloudflare
2. Dominio configurado en Cloudflare
3. Node.js 18+ instalado
4. Git configurado

## Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Instalar Wrangler CLI

```bash
npm install -g wrangler
```

### 3. Autenticar con Cloudflare

```bash
wrangler login
```

## Configuración del Proyecto

### Variables de Entorno

1. Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

2. Configura las variables necesarias:
- `CLOUDFLARE_ACCOUNT_ID`: Tu Account ID de Cloudflare
- `CLOUDFLARE_API_TOKEN`: Token de API con permisos de Cloudflare Pages
- `NEXT_PUBLIC_SITE_URL`: URL del sitio (https://terapiadeparejamedellin.com)

### Archivos de Configuración

- `wrangler.toml`: Configuración principal de Cloudflare
- `public/_headers`: Headers HTTP de seguridad
- `public/_redirects`: Redirecciones y reglas de routing
- `next.config.mjs`: Configuración de Next.js para export estático

## Despliegue

### Opción 1: Despliegue Automático (Recomendado)

1. Conecta tu repositorio de GitHub a Cloudflare Pages:
   - Ve a Cloudflare Dashboard > Pages
   - Clic en "Create a project"
   - Conecta tu repositorio de GitHub
   - Configura:
     - **Build command**: `npm run pages:build`
     - **Build output directory**: `.vercel/output/static`
     - **Root directory**: `/`

2. Configura las variables de entorno en Cloudflare:
   - Ve a tu proyecto > Settings > Environment variables
   - Agrega las variables del archivo `.env.example`

### Opción 2: Despliegue Manual

```bash
# Build del proyecto
npm run pages:build

# Desplegar a Cloudflare Pages
npm run deploy
```

### Opción 3: Preview Local

```bash
# Preview local con Cloudflare Workers
npm run preview
```

## Configuración del Dominio

### 1. Configurar DNS

En Cloudflare DNS, asegúrate de tener:

```
A    @              192.0.2.1 (Proxied)
CNAME www          terapiadeparejamedellin.com (Proxied)
```

### 2. Configurar Custom Domain

1. Ve a tu proyecto en Cloudflare Pages
2. Clic en "Custom domains"
3. Agrega:
   - `terapiadeparejamedellin.com`
   - `www.terapiadeparejamedellin.com`

## Optimizaciones

### Headers de Seguridad

El archivo `_headers` incluye:
- Content Security Policy (CSP)
- HSTS
- X-Frame-Options
- Cache headers optimizados

### Redirecciones

El archivo `_redirects` maneja:
- Redirección www → non-www
- Trailing slashes
- SPA fallback

### Performance

- Imágenes optimizadas
- Assets con cache inmutable
- Compresión automática de Cloudflare
- CDN global

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Build específico para Cloudflare
npm run pages:build

# Preview local con Cloudflare
npm run preview

# Desplegar manualmente
npm run deploy

# Ver logs de despliegue
wrangler pages deployment list
```

## Monitoreo

### Analytics

- Cloudflare Analytics está habilitado automáticamente
- Web Vitals disponibles en el dashboard
- Real User Monitoring (RUM)

### Logs

```bash
# Ver logs en tiempo real
wrangler pages deployment tail
```

## Troubleshooting

### Errores Comunes

1. **Build falla**: Verificar que todas las dependencias estén instaladas
2. **404 en rutas**: Verificar configuración en `_redirects`
3. **Headers no aplicados**: Verificar sintaxis en `_headers`
4. **Dominio no funciona**: Verificar configuración DNS

### Soporte

- [Documentación de Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

## Migración desde Vercel

Si estás migrando desde Vercel:

1. Los archivos `vercel.json` no son necesarios
2. Las redirecciones se manejan en `_redirects`
3. Los headers se configuran en `_headers`
4. Las variables de entorno se configuran en Cloudflare Dashboard

## Backup y Rollback

```bash
# Ver deployments anteriores
wrangler pages deployment list

# Rollback a deployment anterior
wrangler pages deployment rollback [DEPLOYMENT_ID]
```