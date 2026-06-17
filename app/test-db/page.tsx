'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestDBPage() {
  const [types, setTypes] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMsg, setAuthMsg] = useState('')
  const supabase = createClient()

  async function checkConnection() {
    setError(null)
    const { data, error } = await supabase.from('incident_types').select('*')
    error ? setError(error.message) : setTypes(data ?? [])
  }

  async function signUpTestUser() {
    setAuthMsg('Creando usuario...')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) return setAuthMsg('Error: ' + error.message)
    setAuthMsg('Usuario creado y logueado.')
    checkConnection()
  }

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Test de conexión Supabase</h1>

      <section>
        <h2>1. Probar lectura (sin login)</h2>
        <button onClick={checkConnection}>Probar conexión</button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <p>Filas recibidas: {types.length}</p>
        <pre>{JSON.stringify(types, null, 2)}</pre>
      </section>

      <section>
        <h2>2. Crear usuario de prueba (login)</h2>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signUpTestUser}>Registrar y volver a probar</button>
        <p>{authMsg}</p>
      </section>
    </main>
  )
}