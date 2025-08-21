# Configuración de Google Search Console

## Guía Paso a Paso para Configurar Google Search Console

### 1. Acceso a Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Agregar propiedad"

### 2. Agregar tu Sitio Web

1. Selecciona "Prefijo de URL"
2. Ingresa: `https://terapiadeparejamedellin.com`
3. Haz clic en "Continuar"

### 3. Verificación de Propiedad

Tienes 3 opciones de verificación:

#### Opción A: Archivo HTML (Recomendado)
1. Descarga el archivo HTML de verificación
2. Reemplaza el contenido de `/public/google-site-verification.html`
3. Asegúrate de que el archivo sea accesible en: `https://terapiadeparejamedellin.com/google-site-verification.html`
4. Haz clic en "Verificar"

#### Opción B: Meta Tag HTML
1. Copia el meta tag proporcionado
2. Agrégalo al `<head>` de tu página principal en `/app/layout.tsx`
3. Haz clic en "Verificar"

#### Opción C: Verificación DNS
1. Accede a tu proveedor de DNS
2. Agrega el registro TXT proporcionado
3. Espera la propagación DNS (puede tomar hasta 24 horas)
4. Haz clic en "Verificar"

### 4. Envío del Sitemap

1. Una vez verificado, ve a "Sitemaps" en el menú lateral
2. Agrega la URL del sitemap: `sitemap.xml`
3. Haz clic en "Enviar"

### 5. Solicitar Indexación Manual

1. Ve a "Inspección de URLs"
2. Ingresa cada URL importante y solicita indexación:
   - `https://terapiadeparejamedellin.com/`
   - `https://terapiadeparejamedellin.com/consultas-de-pareja`
   - `https://terapiadeparejamedellin.com/asesorias-de-pareja`
   - `https://terapiadeparejamedellin.com/talleres-de-pareja`
   - `https://terapiadeparejamedellin.com/sobre-mi`
   - `https://terapiadeparejamedellin.com/contacto`

### 6. Configuraciones Adicionales

#### Configurar Datos Demográficos
1. Ve a "Configuración" > "Configuración de la propiedad"
2. Establece el país de destino: Colombia
3. Configura el dominio preferido (con o sin www)

#### Configurar Velocidad de Rastreo
1. Ve a "Configuración" > "Velocidad de rastreo"
2. Mantén la configuración automática o ajusta según necesidades

### 7. Monitoreo y Mantenimiento

#### Revisar Regularmente:
- **Cobertura**: Páginas indexadas vs. excluidas
- **Rendimiento**: Clics, impresiones, CTR, posición promedio
- **Mejoras**: Problemas de usabilidad móvil
- **Seguridad**: Problemas de seguridad
- **Enlaces**: Enlaces internos y externos

#### Alertas Importantes:
- Configura notificaciones por email
- Revisa errores de rastreo semanalmente
- Monitorea cambios en el rendimiento

### 8. Herramientas Útiles en Search Console

- **Inspección de URLs**: Verificar indexación de páginas específicas
- **Rendimiento**: Analizar tráfico de búsqueda orgánica
- **Cobertura**: Identificar problemas de indexación
- **Sitemaps**: Monitorear estado del sitemap
- **Mejoras**: Revisar datos estructurados y usabilidad móvil

### 9. Solución de Problemas Comunes

#### Error: "No se pudo verificar la propiedad"
- Verifica que el archivo/meta tag esté correctamente implementado
- Asegúrate de que el sitio sea accesible públicamente
- Revisa que no haya redirecciones que interfieran

#### Error: "Sitemap no se puede leer"
- Verifica que `sitemap.xml` sea accesible
- Revisa la sintaxis XML del sitemap
- Asegúrate de que las URLs en el sitemap sean válidas

### 10. Próximos Pasos

Después de la configuración inicial:
1. Espera 24-48 horas para ver datos iniciales
2. Configura Google Analytics (si no está configurado)
3. Vincula Search Console con Google Analytics
4. Establece un cronograma de revisión semanal

---

## Archivos de Verificación Disponibles

- **Archivo HTML**: `/public/google-site-verification.html`
- **Meta Tag**: Se puede agregar en `/app/layout.tsx`
- **Sitemap**: Generado automáticamente en `/sitemap.xml`

## URLs Importantes

- **Search Console**: https://search.google.com/search-console/
- **Sitemap del sitio**: https://terapiadeparejamedellin.com/sitemap.xml
- **Archivo de verificación**: https://terapiadeparejamedellin.com/google-site-verification.html

---

*Última actualización: $(date)*
*Para soporte adicional, consulta la [documentación oficial de Google Search Console](https://support.google.com/webmasters/)*