# Solución: Posts del Blog No Aparecen en Cloudflare

## 🔍 Problema Identificado

Los posts del blog aparecen correctamente en el entorno local pero **NO aparecen en Cloudflare Pages** debido a que las **variables de entorno de WordPress API no están configuradas** en el entorno de producción.

## 📋 Diagnóstico Realizado

### ✅ Verificaciones Completadas:

1. **Página Principal**: Confirmado que no hay sección de blog en la página principal (`app/page.tsx`)
2. **API de WordPress**: Funciona correctamente - 3 posts disponibles
3. **Configuración Local**: Variables de entorno configuradas en `.env.local`
4. **Endpoint de Debug**: Creado y probado - confirma que la API funciona localmente
5. **Servidor Local**: Blog funciona perfectamente en `http://localhost:3001/blog`

### ❌ Problema Root Cause:
Las variables de entorno **NO están configuradas en Cloudflare Pages**, por lo que la aplicación no puede conectarse a la API de WordPress en producción.

## 🛠️ Solución Implementada

### 1. Scripts de Diagnóstico Creados:
- `check-env-vars.js` - Verifica variables de entorno
- `test-wordpress-api.js` - Prueba conexión a WordPress API
- `app/api/debug-env/route.ts` - Endpoint para debug en desarrollo

### 2. Documentación Creada:
- `cloudflare-env-setup.md` - Instrucciones detalladas para configurar Cloudflare
- `.env.example` - Actualizado con variables de WordPress

### 3. Variables de Entorno Identificadas:

#### Variables CRÍTICAS (requeridas):
```bash
WORDPRESS_API_URL=https://cms.terapiadeparejamedellin.com/wp-json/wp/v2
WORDPRESS_SITE_URL=https://cms.terapiadeparejamedellin.com
NEXT_PUBLIC_SITE_URL=https://terapiadeparejamedellin.com
```

#### Variables Adicionales:
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_NAME=Terapia de Pareja Medellín
NEXT_PUBLIC_WHATSAPP_NUMBER=573137415861
```

## 🚀 Pasos para Resolver en Cloudflare

### Opción 1: Dashboard de Cloudflare (Recomendado)
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecciona tu proyecto: `terapia-pareja-medellin-dos`
3. Ve a **Settings** > **Environment variables**
4. Agrega cada variable:
   - Name: `WORDPRESS_API_URL`
   - Value: `https://cms.terapiadeparejamedellin.com/wp-json/wp/v2`
   - Environment: `Production`
5. Repite para todas las variables
6. **Redeploy** el proyecto

### Opción 2: Wrangler CLI
```bash
wrangler pages secret put WORDPRESS_API_URL --project-name=terapia-pareja-medellin-dos
wrangler pages secret put WORDPRESS_SITE_URL --project-name=terapia-pareja-medellin-dos
wrangler pages secret put NEXT_PUBLIC_SITE_URL --project-name=terapia-pareja-medellin-dos
```

## ✅ Verificación Post-Solución

Después de configurar las variables:

1. **Redeploy** el proyecto en Cloudflare
2. Espera 2-3 minutos para que se complete
3. Visita: `https://terapiadeparejamedellin.com/blog`
4. Verifica que los posts aparezcan correctamente

## 📊 Estado Actual

- ✅ **Local**: Funciona perfectamente
- ❌ **Cloudflare**: Requiere configuración de variables de entorno
- ✅ **WordPress API**: Funcionando correctamente
- ✅ **Scripts de Debug**: Implementados y funcionando

## 🔧 Archivos Modificados/Creados

1. `check-env-vars.js` - Script de verificación
2. `test-wordpress-api.js` - Test de API
3. `app/api/debug-env/route.ts` - Endpoint de debug
4. `cloudflare-env-setup.md` - Guía de configuración
5. `.env.example` - Actualizado con variables WordPress
6. `BLOG_POSTS_ISSUE_SOLUTION.md` - Este resumen

## 💡 Notas Importantes

- Las variables con `NEXT_PUBLIC_` son visibles en el cliente
- Después de cambiar variables de entorno, **SIEMPRE** redeploy
- El cache de Cloudflare puede tardar unos minutos en actualizarse
- Los valores por defecto en `lib/wordpress.ts` funcionan, pero es mejor configurar las variables explícitamente

## 🎯 Próximos Pasos

1. **URGENTE**: Configurar variables de entorno en Cloudflare Pages
2. Redeploy el proyecto
3. Verificar que los posts aparezcan en producción
4. Opcional: Eliminar el endpoint de debug después de verificar