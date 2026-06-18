'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function updateIncident(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const status = formData.get('status') as string
  const assigned_to = formData.get('assigned_to') as string

  const assignee = assigned_to === '' ? null : assigned_to

  const { error } = await supabase
    .from('incidents')
    .update({
      status: status,
      assigned_to: assignee
    })
    .eq('id', id)

  if (error) {
    console.error('Error al actualizar:', error)
    redirect(`/dashboard/incidente/${id}?error=No se pudo actualizar el incidente`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}