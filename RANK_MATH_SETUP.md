# Configuración de Rank Math para Integración Headless

Este documento explica cómo configurar el plugin Rank Math en WordPress para que funcione con el sitio headless Next.js.

## Estado Actual

❌ **Rank Math no está configurado** - El endpoint REST API no está disponible
✅ **Código de integración implementado** - El sitio está preparado para usar Rank Math

## Pasos para Configurar Rank Math

### 1. Instalar Rank Math en WordPress

1. Accede al panel de administración de WordPress: `https://cms.terapiadeparejamedellin.com/wp-admin`
2. Ve a **Plugins > Añadir nuevo**
3. Busca "Rank Math SEO"
4. Instala y activa el plugin

### 2. Configurar Rank Math para Headless CMS

1. Ve a **Rank Math > General Settings**
2. Navega a la pestaña **Others**
3. Busca la opción **"REST API"** o **"Headless CMS Support"**
4. **Habilita la opción** para exponer metadatos vía REST API
5. Guarda los cambios

### 3. Verificar la Configuración

Una vez configurado, el endpoint debería estar disponible en:
```
https://cms.terapiadeparejamedellin.com/wp-json/rankmath/v1/getHead
```

### 4. Configurar SEO para Posts

1. Edita cualquier post en WordPress
2. Verás una sección de **Rank Math SEO** en el editor
3. Configura:
   - **Title**: Título SEO personalizado
   - **Description**: Meta descripción
   - **Focus Keyword**: Palabra clave principal
   - **Open Graph**: Configuración para redes sociales
   - **Twitter Cards**: Configuración para Twitter

## Funcionalidad Implementada

El sitio Next.js ya está preparado para:

✅ **Obtener metadatos de Rank Math automáticamente**
✅ **Usar metadatos en las páginas del blog**
✅ **Fallback a campos ACF si Rank Math no está disponible**
✅ **Generar metadata para SEO, Open Graph y Twitter Cards**

## Metadatos Soportados

- **Title**: Título SEO
- **Description**: Meta descripción
- **Keywords**: Palabras clave
- **Canonical URL**: URL canónica
- **Open Graph**: og:title, og:description, og:image
- **Twitter Cards**: twitter:title, twitter:description, twitter:image

## Beneficios de la Configuración

- **SEO Mejorado**: Metadatos optimizados automáticamente
- **Redes Sociales**: Open Graph y Twitter Cards configurados
- **Gestión Centralizada**: Todo el SEO se maneja desde WordPress
- **Flexibilidad**: Fallback a campos ACF existentes

## Notas Importantes

- El sitio funciona correctamente sin Rank Math (usa campos ACF como fallback)
- Una vez configurado Rank Math, los metadatos se priorizarán automáticamente
- No se requieren cambios adicionales en el código del sitio
- Los logs de advertencia se reducirán una vez configurado

## Contacto

Si necesitas ayuda con la configuración, contacta al desarrollador del sitio.