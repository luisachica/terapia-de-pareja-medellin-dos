'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: "Terapia de pareja general",
    question: "¿Qué es la terapia de pareja y cómo puede ayudarme?",
    answer: "La terapia de pareja es un proceso psicológico especializado que ayuda a las parejas a mejorar su comunicación, resolver conflictos y fortalecer su relación. En Medellín, ofrezco un enfoque personalizado que aborda problemas como crisis de pareja, infidelidad, problemas de comunicación y dificultades en la intimidad. La terapia proporciona herramientas prácticas para construir una relación más sólida y satisfactoria."
  },
  {
    category: "Terapia de pareja general",
    question: "¿Cuánto tiempo dura un proceso de terapia de pareja?",
    answer: "La duración del proceso terapéutico varía según las necesidades específicas de cada pareja. Generalmente, los procesos van desde 8 hasta 20 sesiones. Algunas parejas ven mejoras significativas en las primeras sesiones, mientras que otras requieren un trabajo más profundo. Durante la evaluación inicial, establecemos objetivos claros y un plan de tratamiento personalizado."
  },
  {
    category: "Consultas de pareja",
    question: "¿Qué incluye una consulta de pareja?",
    answer: "Las consultas de pareja incluyen una evaluación completa de la relación, identificación de patrones problemáticos, establecimiento de objetivos terapéuticos y desarrollo de estrategias específicas para mejorar la comunicación y resolver conflictos. Cada sesión dura aproximadamente 60 minutos y se realiza en un ambiente confidencial y profesional en Medellín."
  },
  {
    category: "Consultas de pareja",
    question: "¿Cuándo es el momento adecuado para buscar ayuda profesional?",
    answer: "Es recomendable buscar ayuda profesional cuando la pareja experimenta comunicación deficiente, conflictos frecuentes, crisis de confianza, problemas de intimidad, o cuando sienten que no pueden resolver sus diferencias por sí solos. No es necesario esperar a que los problemas se agraven; la terapia preventiva también es muy efectiva."
  },
  {
    category: "Asesorías de pareja",
    question: "¿Cuál es la diferencia entre asesoría y terapia de pareja?",
    answer: "La asesoría de pareja se enfoca en brindar orientación y herramientas específicas para situaciones puntuales, mientras que la terapia de pareja es un proceso más profundo que aborda patrones relacionales y aspectos emocionales más complejos. Las asesorías son ideales para parejas que buscan mejorar aspectos específicos de su relación o prevenir problemas futuros."
  },
  {
    category: "Asesorías de pareja",
    question: "¿Las asesorías de pareja son efectivas para relaciones nuevas?",
    answer: "Absolutamente. Las asesorías de pareja son muy beneficiosas para relaciones nuevas, ya que ayudan a establecer bases sólidas de comunicación, definir expectativas claras y desarrollar habilidades para manejar conflictos de manera constructiva. Es una inversión preventiva en la salud de la relación."
  },
  {
    category: "Talleres de pareja",
    question: "¿Qué se aprende en los talleres de pareja?",
    answer: "Los talleres de pareja en Medellín incluyen técnicas de comunicación efectiva, manejo de conflictos, fortalecimiento de la intimidad emocional y física, construcción de confianza y desarrollo de habilidades para mantener una relación saludable a largo plazo. Se realizan en grupos pequeños con ejercicios prácticos y dinámicas interactivas."
  },
  {
    category: "Talleres de pareja",
    question: "¿Los talleres son grupales o individuales?",
    answer: "Los talleres de pareja se realizan en formato grupal con un máximo de 6 parejas por sesión. Esto permite crear un ambiente de aprendizaje colaborativo donde las parejas pueden compartir experiencias y aprender unas de otras, siempre manteniendo la confidencialidad y el respeto mutuo."
  },
  {
    category: "Proceso terapéutico",
    question: "¿Qué pasa si solo uno de los miembros de la pareja quiere asistir?",
    answer: "Aunque es ideal que ambos miembros participen, es posible iniciar el proceso con una sola persona. El trabajo individual puede generar cambios positivos en la dinámica de pareja y, frecuentemente, motiva al otro miembro a unirse al proceso. Ofrezco estrategias específicas para estas situaciones."
  },
  {
    category: "Proceso terapéutico",
    question: "¿La terapia de pareja es confidencial?",
    answer: "Sí, la terapia de pareja está protegida por el secreto profesional. Toda la información compartida durante las sesiones es estrictamente confidencial. Como psicóloga clínica en Medellín, me rijo por el código de ética profesional que garantiza la privacidad y confidencialidad de todos mis pacientes."
  },
  {
    category: "Modalidades y costos",
    question: "¿Ofrecen terapia de pareja virtual o solo presencial?",
    answer: "Ofrezco tanto terapia presencial en mi consultorio en Medellín como sesiones virtuales para mayor comodidad y accesibilidad. Las sesiones virtuales mantienen la misma calidad y efectividad que las presenciales, utilizando plataformas seguras que garantizan la confidencialidad."
  },
  {
    category: "Modalidades y costos",
    question: "¿Cuáles son los costos de la terapia de pareja?",
    answer: "Los costos varían según el tipo de servicio: consultas individuales, asesorías especializadas o talleres grupales. Ofrezco diferentes opciones de pago y planes de tratamiento adaptados a las necesidades y posibilidades económicas de cada pareja. Contáctame para información detallada sobre tarifas actuales."
  }
]

const categories = Array.from(new Set(faqData.map(item => item.category)))

export default function FaqClient() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = selectedCategory === 'Todas' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  // Generar datos estructurados para Schema.org FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Preguntas frecuentes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas a las preguntas más comunes sobre terapia de pareja, 
              consultas, asesorías y talleres en Medellín. Si no encuentras lo que buscas, 
              no dudes en contactarme.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'Todas' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Todas')}
                className="mb-2"
              >
                Todas las preguntas
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => {
              const globalIndex = faqData.indexOf(item)
              const isOpen = openItems.includes(globalIndex)
              
              return (
                <Card key={globalIndex} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => toggleItem(globalIndex)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="text-sm text-blue-600 font-medium mb-1">
                          {item.category}
                        </div>
                        <CardTitle className="text-lg md:text-xl text-gray-900 leading-tight">
                          {item.question}
                        </CardTitle>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {isOpen && (
                    <CardContent className="pt-0">
                      <Separator className="mb-4" />
                      <div className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-[#EE5E96] text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  ¿No encontraste la respuesta que buscabas?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Estoy aquí para ayudarte. Contáctame directamente para resolver 
                  cualquier duda específica sobre terapia de pareja en Medellín.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-primary text-gray-900"
                    onClick={() => window.open('https://wa.me/573137415861?text=Hola, tengo una pregunta sobre terapia de pareja', '_blank')}
                  >
                    Contactar por WhatsApp
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-gray-900 hover:bg-white hover:text-primary"
                    onClick={() => window.location.href = '/contacto'}
                  >
                    Página de Contacto
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}