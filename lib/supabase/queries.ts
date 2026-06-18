import { createClient } from '@/lib/supabase/server';

export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) console.error('Error obteniendo perfil:', error);
  return profile;
}

export async function getIncidentTypes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('incident_types')
    .select('id, name')
    .order('id');

  if (error) throw new Error('Error al cargar tipos de incidentes');
  return data;
}

export async function getIncidents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('incidents')
    .select(`
            id,
            title,
            status,
            location,
            created_at,
            type:incident_types(name),
            creator:profiles!incidents_created_by_fkey(full_name),
            assignee:profiles!incidents_assigned_to_fkey(full_name)
        `)
    .order('created_at', { ascending: false });

  if (error) throw new Error('Error al cargar los incidentes');
  return data;
}

export async function getIncidentById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('incidents')
    .select(`
            *,
            type:incident_types(name),
            creator:profiles!incidents_created_by_fkey(full_name),
            assignee:profiles!incidents_assigned_to_fkey(full_name)
        `)
    .eq('id', id)
    .single();

  if (error) throw new Error('Error al cargar el incidente');
  return data;
}