'use client';

import { useRef } from 'react';
import { crearIncidente } from '../actions/incidentes';

export default function FormularioIncidente() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        try {
            await crearIncidente(formData);
            alert('¡Incidente registrado con éxito!');
            formRef.current?.reset();
        } catch (error: any) {
            alert(error.message || 'Ocurrió un error al registrar.');
        }
    };

    return (
        <form ref={formRef} action={handleSubmit} className="max-w-md w-full bg-white border border-black p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-black pb-2 text-black">Registrar Emergencia</h2>

            <div className="mb-3">
                <label className="block text-sm font-bold text-black mb-1">Título</label>
                <input type="text" name="title" required minLength={3} maxLength={120} className="w-full border border-neutral-400 p-2 text-black focus:border-black outline-none" />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-bold text-black mb-1">Ubicación</label>
                <input type="text" name="location" required minLength={2} className="w-full border border-neutral-400 p-2 text-black focus:border-black outline-none" placeholder="Ej: Laboratorio 4" />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-bold text-black mb-1">Tipo de Incidente</label>
                <select name="type_id" required className="w-full border border-neutral-400 p-2 text-black focus:border-black outline-none">
                    <option value="1">Incendio</option>
                    <option value="2">Corte de energía</option>
                    <option value="3">Accidente</option>
                    <option value="4">Inundación</option>
                    <option value="5">Seguridad</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold text-black mb-1">Descripción</label>
                <textarea name="description" required minLength={3} rows={2} className="w-full border border-neutral-400 p-2 text-black focus:border-black outline-none resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-black text-white font-bold py-2 hover:bg-neutral-800 transition-colors">
                ENVIAR REPORTE
            </button>
        </form>
    );
}