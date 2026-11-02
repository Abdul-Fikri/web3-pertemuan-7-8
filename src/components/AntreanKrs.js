"use client"
import { useEffect, useState } from "react"

export default function AntreanKrs()
{
    const [antreanKrs, setAntreanKrs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const waktuRakit = new Date().toLocaleTimeString('id-ID');
    useEffect(async () => {
        setIsLoading(true);

        const respon = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
            cache: 'no-store',
        });
        const daftarDosen = await respon.json();
        setAntreanKrs(daftarDosen);
        setIsLoading(false);
    }, [])

        return (
<>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
        MODE: CSR (Client-Side Rendering)
      </span>
      <h1>⚡ Pantauan Antrean Server KRS (Real-Time)</h1>
      <p>
        <strong>Jam Server Memasak Halaman:</strong> {waktuRakit} <br />
        <em>(Setiap kali kamu menekan tombol Refresh browser, detik jam di atas PASTI langsung berubah!)</em>
      </p>
            
      <ul>
        {!isLoading ? (
        antreanKrs.map((tugas) => (
          <li key={tugas.id}>
            Tiket #{tugas.id}: {tugas.title} —{' '}
            <strong>{tugas.completed ? '✅ Selesai' : '⏳ Mengantre'}</strong>
          </li>
        ))
    ) : 'Sedang Loading .....'}
      </ul>
      </>
        )
    }