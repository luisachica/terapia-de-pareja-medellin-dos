const axios = require('axios');

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://cms.terapiadeparejamedellin.com/wp-json/wp/v2';

async function testWordPressAPI() {
  console.log('🔍 Probando conexión a WordPress API...');
  console.log('📍 URL:', WORDPRESS_API_URL);
  
  try {
    // Probar conexión básica
    console.log('\n1. Probando conexión básica...');
    const response = await axios.get(`${WORDPRESS_API_URL}/posts?per_page=1`);
    console.log('✅ Conexión exitosa');
    console.log('📊 Status:', response.status);
    console.log('📝 Posts encontrados:', response.headers['x-wp-total'] || 'No disponible');
    
    if (response.data && response.data.length > 0) {
      console.log('📄 Primer post:', {
        id: response.data[0].id,
        title: response.data[0].title.rendered,
        slug: response.data[0].slug,
        date: response.data[0].date
      });
    }
    
    // Probar obtener todos los posts
    console.log('\n2. Probando obtener todos los posts...');
    const allPostsResponse = await axios.get(`${WORDPRESS_API_URL}/posts?per_page=100`);
    console.log('📊 Total de posts:', allPostsResponse.headers['x-wp-total'] || 'No disponible');
    console.log('📄 Posts obtenidos:', allPostsResponse.data.length);
    
    if (allPostsResponse.data.length > 0) {
      console.log('\n📋 Lista de posts:');
      allPostsResponse.data.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title.rendered} (${post.slug})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error al conectar con WordPress API:');
    console.error('🔗 URL intentada:', WORDPRESS_API_URL);
    
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📝 Status Text:', error.response.statusText);
      console.error('🔍 Headers:', error.response.headers);
      console.error('📄 Data:', error.response.data);
    } else if (error.request) {
      console.error('📡 No se recibió respuesta del servidor');
      console.error('🔍 Request:', error.request);
    } else {
      console.error('⚙️ Error de configuración:', error.message);
    }
  }
}

testWordPressAPI();