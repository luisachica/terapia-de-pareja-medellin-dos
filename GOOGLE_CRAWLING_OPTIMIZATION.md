# Guía para Acelerar el Rastreo de Google

## 🚀 Optimizaciones Implementadas

### 1. Robots.txt Optimizado
- ✅ Directivas específicas para crawlers
- ✅ Crawl-delay optimizado (1 segundo)
- ✅ Páginas prioritarias marcadas explícitamente
- ✅ Bloqueo de archivos innecesarios (_next/, api/, etc.)
- ✅ Permitir solo imágenes importantes para SEO

### 2. Sitemap.xml Mejorado
- ✅ Prioridades optimizadas (0.95 para servicios principales)
- ✅ Frecuencia de cambio actualizada (weekly para páginas importantes)
- ✅ Fechas de modificación actualizadas

### 3. Datos Estructurados JSON-LD
- ✅ Schema.org para Organization
- ✅ Schema.org para WebSite
- ✅ Schemas para servicios individuales
- ✅ Breadcrumbs estructurados

## 📋 Pasos Inmediatos para Acelerar el Indexado

### 1. Google Search Console (PRIORITARIO)
```bash
# 1. Registra tu sitio en Google Search Console
# URL: https://search.google.com/search-console/

# 2. Verifica la propiedad del sitio
# - Descarga el archivo de verificación HTML
# - Reemplaza el contenido de /public/google-site-verification.html
# - O usa verificación por DNS/meta tag

# 3. Envía el sitemap manualmente
# URL del sitemap: https://terapiadeparejamedellin.com/sitemap.xml
```

### 2. Solicitar Indexación Manual
```bash
# En Google Search Console:
# 1. Ve a "Inspección de URLs"
# 2. Ingresa cada URL importante:
#    - https://terapiadeparejamedellin.com/
#    - https://terapiadeparejamedellin.com/consultas-de-pareja
#    - https://terapiadeparejamedellin.com/asesorias-de-pareja
#    - https://terapiadeparejamedellin.com/talleres-de-pareja
#    - https://terapiadeparejamedellin.com/sobre-mi
#    - https://terapiadeparejamedellin.com/contacto
# 3. Haz clic en "Solicitar indexación" para cada una
```

### 3. Herramientas Adicionales de Indexación

#### Bing Webmaster Tools
```bash
# URL: https://www.bing.com/webmasters
# - Registra el sitio también en Bing
# - Envía el sitemap
# - Solicita indexación manual
```

#### IndexNow (Indexación Instantánea)
```bash
# Implementar IndexNow para notificación automática:
# 1. Genera una clave API en https://www.indexnow.org/
# 2. Crea /public/[api-key].txt con la clave
# 3. Implementa notificaciones automáticas en el deploy
```

### 4. Estrategias de Enlaces Externos

#### Directorios Locales
- Google My Business (ESENCIAL)
- Páginas Amarillas Colombia
- Directorios de salud mental en Medellín
- Cámaras de comercio locales

#### Redes Sociales
- Perfil completo en LinkedIn con enlace al sitio
- Facebook Business con enlace
- Instagram con enlace en bio
- YouTube (si tienes contenido de video)

### 5. Contenido Fresco para Acelerar Crawling

#### Blog/Artículos (Recomendado)
```bash
# Crear sección de blog con artículos como:
# - "5 señales de que necesitas terapia de pareja"
# - "Cómo prepararse para la primera sesión"
# - "Diferencias entre terapia y asesoría de pareja"
# - "Talleres vs sesiones individuales: ¿qué elegir?"
```

#### Actualizaciones Regulares
- Testimonios nuevos cada mes
- Casos de éxito (anónimos)
- Horarios y disponibilidad actualizados

## 🔧 Comandos Técnicos para Verificar

### Verificar Robots.txt
```bash
# Verifica que robots.txt sea accesible:
curl https://terapiadeparejamedellin.com/robots.txt

# Usa Google Search Console > Herramientas > Probador de robots.txt
```

### Verificar Sitemap
```bash
# Verifica que sitemap.xml sea accesible:
curl https://terapiadeparejamedellin.com/sitemap.xml

# Valida el sitemap:
# https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

### Verificar Datos Estructurados
```bash
# Usa la herramienta de prueba de datos estructurados de Google:
# https://search.google.com/test/rich-results

# Verifica cada página importante
```

## ⚡ Resultados Esperados

### Cronograma de Indexación
- **24-48 horas**: Páginas principales indexadas (con solicitud manual)
- **1 semana**: Todas las páginas indexadas
- **2-4 semanas**: Mejora en rankings para palabras clave objetivo

### Métricas a Monitorear
- Páginas indexadas en Google Search Console
- Impresiones y clics en búsquedas
- Posición promedio para palabras clave objetivo
- Tiempo de carga de páginas (Core Web Vitals)

## 🎯 Palabras Clave Objetivo

### Principales
- "terapia de pareja medellín"
- "psicólogo de pareja medellín"
- "asesoría de pareja medellín"
- "talleres de pareja medellín"

### Secundarias
- "terapia de pareja antioquia"
- "consulta psicológica pareja"
- "problemas de pareja medellín"
- "yolanda carmona psicóloga"

## 📞 Contacto para Soporte

Si necesitas ayuda con alguno de estos pasos, puedes:
1. Consultar la documentación de Google Search Console
2. Usar las herramientas de validación mencionadas
3. Monitorear los resultados semanalmente

---

**Nota**: La indexación rápida depende de múltiples factores. Estos pasos optimizan las posibilidades, pero Google determina la velocidad final de crawling basado en la autoridad del dominio, calidad del contenido y otros factores algorítmicos.