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
      const post = response.data[0];
      console.log('📄 Primer post:', {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        date: post.date
      });

      // Buscar listas en el contenido del post
      console.log('\n3. Buscando listas en el contenido del post...');
      const content = post.content.rendered;
      const lists = content.match(/<(ul|ol)[\s\S]*?<\/\1>/gi);
      if (lists) {
        console.log('✅ Se encontraron listas:');
        lists.forEach((list, index) => {
          console.log(`\n--- Lista ${index + 1} ---\n`);
          console.log(list);
        });
      } else {
        console.log('❌ No se encontraron listas en el contenido del post.');
      }
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
