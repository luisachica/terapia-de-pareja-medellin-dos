// Script para verificar variables de entorno
const fs = require('fs');
const path = require('path');

// Cargar variables de .env.local manualmente
try {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#') && trimmedLine.includes('=')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        process.env[key.trim()] = value.trim();
      }
    });
    console.log('📁 Variables cargadas desde .env.local');
  }
} catch (error) {
  console.log('⚠️ No se pudo cargar .env.local:', error.message);
}

console.log('🔍 Verificando variables de entorno...\n');

const requiredVars = [
  'WORDPRESS_API_URL',
  'WORDPRESS_SITE_URL',
  'NEXT_PUBLIC_SITE_URL'
];

const optionalVars = [
  'NODE_ENV',
  'NEXT_PUBLIC_SITE_NAME',
  'NEXT_PUBLIC_WHATSAPP_NUMBER'
];

console.log('📋 Variables requeridas:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '❌';
  console.log(`   ${status} ${varName}: ${value || 'NO CONFIGURADA'}`);
});

console.log('\n📋 Variables opcionales:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '⚠️';
  console.log(`   ${status} ${varName}: ${value || 'No configurada'}`);
});

console.log('\n🌍 Entorno actual:', process.env.NODE_ENV || 'development');

// Verificar si todas las variables requeridas están configuradas
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('\n❌ Variables faltantes:', missingVars.join(', '));
  console.log('\n💡 Para configurar en Cloudflare Pages:');
  console.log('   1. Ve a tu proyecto en Cloudflare Dashboard');
  console.log('   2. Settings > Environment variables');
  console.log('   3. Agrega las variables faltantes');
  console.log('   4. Redeploy el proyecto');
  process.exit(1);
} else {
  console.log('\n✅ Todas las variables requeridas están configuradas');
}