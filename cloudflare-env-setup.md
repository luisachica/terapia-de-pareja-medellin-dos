# Configuración de Variables de Entorno en Cloudflare Pages

## Problema Identificado
Los posts del blog aparecen localmente pero no en Cloudflare porque las variables de entorno de WordPress API no están configuradas en producción.

## Variables Requeridas en Cloudflare Pages

### 1. Variables de WordPress API (CRÍTICAS)
```
WORDPRESS_API_URL=https://cms.terapiadeparejamedellin.com/wp-json/wp/v2
WORDPRESS_SITE_URL=https://cms.terapiadeparejamedellin.com
```

### 2. Variables del Sitio
```
NEXT_PUBLIC_SITE_URL=https://terapiadeparejamedellin.com
NEXT_PUBLIC_SITE_NAME=Terapia de Pareja Medellín
NODE_ENV=production
```

### 3. Variables de WhatsApp (Opcionales)
```
NEXT_PUBLIC_WHATSAPP_NUMBER=573137415861
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola, me interesa información sobre terapia de pareja
```

## Pasos para Configurar en Cloudflare Pages

### Opción 1: Dashboard de Cloudflare
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecciona tu cuenta
3. Ve a **Pages** en el menú lateral
4. Selecciona tu proyecto: `terapia-pareja-medellin-dos`
5. Ve a **Settings** > **Environment variables**
6. Haz clic en **Add variable** para cada variable
7. Agrega las variables una por una:
   - Name: `WORDPRESS_API_URL`
   - Value: `https://cms.terapiadeparejamedellin.com/wp-json/wp/v2`
   - Environment: `Production` (y `Preview` si quieres)
8. Repite para todas las variables listadas arriba
9. Haz clic en **Save**

### Opción 2: Wrangler CLI
```bash
# Configurar variables de WordPress API
wrangler pages secret put WORDPRESS_API_URL --project-name=terapia-pareja-medellin-dos
# Cuando te pida el valor, ingresa: https://cms.terapiadeparejamedellin.com/wp-json/wp/v2

wrangler pages secret put WORDPRESS_SITE_URL --project-name=terapia-pareja-medellin-dos
# Cuando te pida el valor, ingresa: https://cms.terapiadeparejamedellin.com

# Configurar variables públicas
wrangler pages secret put NEXT_PUBLIC_SITE_URL --project-name=terapia-pareja-medellin-dos
# Valor: https://terapiadeparejamedellin.com

wrangler pages secret put NEXT_PUBLIC_SITE_NAME --project-name=terapia-pareja-medellin-dos
# Valor: Terapia de Pareja Medellín

wrangler pages secret put NODE_ENV --project-name=terapia-pareja-medellin-dos
# Valor: production
```

## Después de Configurar las Variables

### 1. Redeploy del Proyecto
Después de agregar las variables, necesitas hacer un nuevo deploy:

```bash
# Opción 1: Trigger desde el dashboard
# Ve a Deployments y haz clic en "Retry deployment" en el último deploy

# Opción 2: Push un nuevo commit
git commit --allow-empty -m "Trigger redeploy after env vars setup"
git push origin main

# Opción 3: Deploy manual con Wrangler
npm run pages:build
wrangler pages deploy .vercel/output/static --project-name=terapia-pareja-medellin-dos
```

### 2. Verificar el Deploy
1. Espera a que termine el deploy (2-3 minutos)
2. Ve a tu sitio: https://terapiadeparejamedellin.com/blog
3. Verifica que los posts aparezcan correctamente

## Verificación de Variables
Puedes verificar que las variables estén configuradas creando una página de debug temporal:

```javascript
// pages/api/debug-env.js (SOLO PARA TESTING - ELIMINAR DESPUÉS)
export default function handler(req, res) {
  res.status(200).json({
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'NOT SET',
    WORDPRESS_SITE_URL: process.env.WORDPRESS_SITE_URL || 'NOT SET',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET'
  });
}
```

Luego visita: `https://terapiadeparejamedellin.com/api/debug-env`

## Notas Importantes
- Las variables que empiezan con `NEXT_PUBLIC_` son visibles en el cliente
- Las variables sin este prefijo solo están disponibles en el servidor
- Después de cambiar variables de entorno, SIEMPRE necesitas hacer redeploy
- El cache de Cloudflare puede tardar unos minutos en actualizarse