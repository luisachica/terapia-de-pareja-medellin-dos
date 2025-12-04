import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET() {
  // Solo permitir en desarrollo o con una clave especial
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!isDev) {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const envVars = {
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'NOT SET',
    WORDPRESS_SITE_URL: process.env.WORDPRESS_SITE_URL || 'NOT SET',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'NOT SET',
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'NOT SET',
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'NOT SET',
  };

  // Test WordPress API connection
  let apiTest = 'NOT TESTED';
  try {
    const apiUrl = process.env.WORDPRESS_API_URL || 'https://cms.terapiadeparejamedellin.com/wp-json/wp/v2';
    const response = await fetch(`${apiUrl}/posts?per_page=1`);
    if (response.ok) {
      const posts = await response.json();
      apiTest = `✅ API OK - ${posts.length} posts found`;
    } else {
      apiTest = `❌ API Error - Status: ${response.status}`;
    }
  } catch (error) {
    apiTest = `❌ API Error - ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  return NextResponse.json({
    environment_variables: envVars,
    wordpress_api_test: apiTest,
    timestamp: new Date().toISOString(),
  });
}
