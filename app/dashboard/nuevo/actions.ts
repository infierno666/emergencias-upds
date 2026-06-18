'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createIncident(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No estás autorizado')

  const title = formData.get('title') as string
  const type_id = parseInt(formData.get('type_id') as string)
  const location = formData.get('location') as string
  const description = formData.get('description') as string

  const { error } = await supabase.from('incidents').insert({
    title,
    type_id,
    location,
    description,
    created_by: user.id
  })

  if (error) {
    console.error('Error al insertar:', error)
    redirect('/dashboard/nuevo?error=No se pudo registrar el incidente')
  }

  redirect('/dashboard')
}