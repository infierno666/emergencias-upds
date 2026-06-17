'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function crearIncidente(formData: FormData) {
    const supabase = await createClient();

    // Obtenemos el usuario autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Debes iniciar sesión para reportar');

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const type_id = parseInt(formData.get('type_id') as string);

    const { error } = await supabase.from('incidents').insert([
        {
            title,
            description,
            location,
            type_id,
            created_by: user.id
        }
    ]);

    if (error) {
        console.error('Error DB:', error.message);
        throw new Error('Error al registrar en la base de datos');
    }

    revalidatePath('/');
    return { success: true };
}