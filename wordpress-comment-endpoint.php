<?php
/**
 * Plugin personalizado para permitir comentarios anónimos vía REST API
 * 
 * Instrucciones de instalación:
 * 1. Sube este archivo al directorio wp-content/plugins/ de tu WordPress
 * 2. Activa el plugin desde el panel de administración
 * 3. O alternativamente, agrega el código (sin las etiquetas <?php) al archivo functions.php de tu tema
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Plugin Name: REST API Anonymous Comments
 * Description: Permite crear comentarios anónimos vía REST API sin autenticación
 * Version: 1.0.0
 * Author: Terapia de Pareja Medellín
 */

class RestApiAnonymousComments {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
        add_filter('rest_allow_anonymous_comments', '__return_true');
    }
    
    /**
     * Registrar rutas personalizadas para comentarios
     */
    public function register_routes() {
        register_rest_route('custom/v1', '/comments', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_comment'),
            'permission_callback' => '__return_true', // Permitir acceso anónimo
            'args' => array(
                'post' => array(
                    'required' => true,
                    'type' => 'integer',
                    'description' => 'ID del post'
                ),
                'author_name' => array(
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Nombre del autor del comentario'
                ),
                'author_email' => array(
                    'required' => true,
                    'type' => 'string',
                    'format' => 'email',
                    'description' => 'Email del autor del comentario'
                ),
                'content' => array(
                    'required' => true,
                    'type' => 'string',
                    'description' => 'Contenido del comentario'
                ),
                'parent' => array(
                    'required' => false,
                    'type' => 'integer',
                    'default' => 0,
                    'description' => 'ID del comentario padre (para respuestas)'
                )
            )
        ));
    }
    
    /**
     * Crear un nuevo comentario
     */
    public function create_comment($request) {
        $post_id = $request->get_param('post');
        $author_name = sanitize_text_field($request->get_param('author_name'));
        $author_email = sanitize_email($request->get_param('author_email'));
        $content = sanitize_textarea_field($request->get_param('content'));
        $parent = $request->get_param('parent') ?: 0;
        
        // Validar que el post existe
        $post = get_post($post_id);
        if (!$post) {
            return new WP_Error(
                'invalid_post',
                'El post especificado no existe',
                array('status' => 404)
            );
        }
        
        // Verificar que los comentarios están habilitados para este post
        if (!comments_open($post_id)) {
            return new WP_Error(
                'comments_closed',
                'Los comentarios están cerrados para este post',
                array('status' => 403)
            );
        }
        
        // Validar email
        if (!is_email($author_email)) {
            return new WP_Error(
                'invalid_email',
                'El email proporcionado no es válido',
                array('status' => 400)
            );
        }
        
        // Validar contenido
        if (empty(trim($content))) {
            return new WP_Error(
                'empty_content',
                'El contenido del comentario no puede estar vacío',
                array('status' => 400)
            );
        }
        
        // Preparar datos del comentario
        $comment_data = array(
            'comment_post_ID' => $post_id,
            'comment_author' => $author_name,
            'comment_author_email' => $author_email,
            'comment_content' => $content,
            'comment_parent' => $parent,
            'comment_author_IP' => $_SERVER['REMOTE_ADDR'] ?? '',
            'comment_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'comment_date' => current_time('mysql'),
            'comment_approved' => 0, // Pendiente de moderación por defecto
        );
        
        // Insertar comentario
        $comment_id = wp_insert_comment($comment_data);
        
        if (is_wp_error($comment_id)) {
            return new WP_Error(
                'comment_creation_failed',
                'Error al crear el comentario: ' . $comment_id->get_error_message(),
                array('status' => 500)
            );
        }
        
        // Obtener el comentario creado
        $comment = get_comment($comment_id);
        
        // Respuesta exitosa
        return new WP_REST_Response(array(
            'id' => $comment_id,
            'status' => $comment->comment_approved ? 'approved' : 'pending',
            'message' => 'Comentario creado exitosamente. ' . 
                        ($comment->comment_approved ? 'Publicado inmediatamente.' : 'Pendiente de moderación.'),
            'comment' => array(
                'id' => $comment_id,
                'author_name' => $comment->comment_author,
                'content' => $comment->comment_content,
                'date' => $comment->comment_date,
                'status' => $comment->comment_approved ? 'approved' : 'pending'
            )
        ), 201);
    }
}

// Inicializar el plugin
new RestApiAnonymousComments();

/**
 * Función adicional para habilitar comentarios anónimos en el endpoint estándar
 * (opcional, como respaldo)
 */
function enable_anonymous_comments() {
    return true;
}
add_filter('rest_allow_anonymous_comments', 'enable_anonymous_comments');

/**
 * Agregar headers CORS si es necesario
 */
function add_cors_http_header() {
    // Solo para desarrollo - en producción configurar CORS apropiadamente
    if (defined('WP_DEBUG') && WP_DEBUG) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}
add_action('init', 'add_cors_http_header');

?>