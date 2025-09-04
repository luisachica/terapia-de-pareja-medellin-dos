'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageCircle, Send, User, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getComments, createComment, WordPressComment } from '@/lib/wordpress'

interface CommentsProps {
  postId: string
  postTitle: string
}

export default function Comments({ postId, postTitle }: CommentsProps) {
  const [comments, setComments] = useState<WordPressComment[]>([])
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Cargar comentarios de WordPress al montar el componente
  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true)
        const { comments: fetchedComments } = await getComments(parseInt(postId), {
          status: 'approved',
          per_page: 50,
          order: 'asc'
        })
        setComments(fetchedComments)
      } catch (error) {
        console.error('Error al cargar comentarios:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadComments()
  }, [postId])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!newComment.author_name.trim()) {
      newErrors.author_name = 'El nombre es requerido'
    }

    if (!newComment.author_email.trim()) {
      newErrors.author_email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newComment.author_email)) {
      newErrors.author_email = 'El email no es válido'
    }

    if (!newComment.content.trim()) {
      newErrors.content = 'El comentario es requerido'
    } else if (newComment.content.trim().length < 10) {
      newErrors.content = 'El comentario debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      await createComment({
        post: parseInt(postId),
        author_name: newComment.author_name.trim(),
        author_email: newComment.author_email.trim(),
        content: newComment.content.trim()
      })

      setNewComment({ author_name: '', author_email: '', content: '' })
      setErrors({})
      setSubmitSuccess(true)
      
      // Mostrar mensaje de éxito por 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error: any) {
      console.error('Error al enviar comentario:', error)
      
      let errorMessage = 'Error al enviar el comentario. Inténtalo de nuevo.'
      
      if (error.message && error.message.includes('plugin de comentarios anónimos')) {
        errorMessage = 'El sistema de comentarios requiere configuración adicional en WordPress. Por favor, contacta al administrador del sitio.'
      } else if (error.response?.status === 401) {
        errorMessage = 'No tienes permisos para enviar comentarios. El sistema requiere configuración adicional.'
      } else if (error.response?.status === 403) {
        errorMessage = 'Los comentarios están deshabilitados para este artículo.'
      } else if (error.response?.status >= 500) {
        errorMessage = 'Error del servidor. Por favor, inténtalo más tarde.'
      }
      
      setErrors({ submit: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Obtener iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className="mt-12 space-y-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Comentarios</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Cargando comentarios...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold">
          Comentarios ({comments.length})
        </h3>
      </div>

      {/* Formulario para nuevo comentario */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deja tu comentario</CardTitle>
        </CardHeader>
        <CardContent>
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">
                ¡Comentario enviado exitosamente! Será revisado antes de publicarse.
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author_name">Nombre *</Label>
                <Input
                  id="author_name"
                  type="text"
                  value={newComment.author_name}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                  placeholder="Tu nombre"
                  className={errors.author_name ? 'border-red-500' : ''}
                />
                {errors.author_name && (
                  <p className="text-sm text-red-500">{errors.author_name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="author_email">Email *</Label>
                <Input
                  id="author_email"
                  type="email"
                  value={newComment.author_email}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_email: e.target.value }))}
                  placeholder="tu@email.com"
                  className={errors.author_email ? 'border-red-500' : ''}
                />
                {errors.author_email && (
                  <p className="text-sm text-red-500">{errors.author_email}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Comentario *</Label>
              <Textarea
                id="content"
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Escribe tu comentario aquí..."
                rows={4}
                className={errors.content ? 'border-red-500' : ''}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content}</p>
              )}
            </div>
            {errors.submit && (
              <p className="text-sm text-red-500">{errors.submit}</p>
            )}
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar comentario
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Aún no hay comentarios. ¡Sé el primero en comentar!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{comment.author_name}</h4>
                      <time className="text-sm text-muted-foreground">
                        {format(new Date(comment.date), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                      </time>
                    </div>
                    <div 
                      className="text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}