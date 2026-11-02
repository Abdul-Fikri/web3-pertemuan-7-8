"use client"; // 🌟 Wajib karena kita memakai useState, onChange, dan onClick!

import { useEffect, useState } from "react";

export default function EtalaseBukuInteraktif({ daftarBukuAwal }) {
  const [kataKunci, setKataKunci] = useState("");
  const [bukuDipinjam, setBukuDipinjam] = useState([]);
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua");

  // Menyaring buku secara instan di browser berdasarkan ketikan pengguna
  const bukuTersaring = daftarBukuAwal.filter((buku) => {
    const judulSesuai = buku.judul
      .toLowerCase()
      .includes(kataKunci.toLowerCase());

    const kategoriSesuai =
      kategoriDipilih === "Semua" || buku.kategori === kategoriDipilih;

    return judulSesuai && kategoriSesuai;
  });

  const [sudahMemuatStorage, setSudahMemuatStorage] = useState(false);

  useEffect(() => {
    try {
      const dataTersimpan = localStorage.getItem("data-perpustakaan");

      if (dataTersimpan) {
        const data = JSON.parse(dataTersimpan);
        setKataKunci(data.kataKunci ?? "");
        setBukuDipinjam(data.bukuDipinjam ?? []);
        setKategoriDipilih(data.kategoriDipilih ?? "Semua");
      }
    } catch {
      console.error("Data localStorage tidak dapat dibaca.");
    } finally {
      setSudahMemuatStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!sudahMemuatStorage) return;

    localStorage.setItem(
      "data-perpustakaan",
      JSON.stringify({
        kataKunci,
        bukuDipinjam,
        kategoriDipilih,
      }),
    );
  }, [kataKunci, bukuDipinjam, kategoriDipilih, sudahMemuatStorage]);

  function togglePinjam(judulBuku) {
    if (bukuDipinjam.includes(judulBuku)) {
      setBukuDipinjam(bukuDipinjam.filter((j) => j !== judulBuku));
    } else {
      setBukuDipinjam([...bukuDipinjam, judulBuku]);
    }
  }

  return (
    <div>
      {/* Bar Pencarian & Info Kantong Peminjaman */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          background: "#eff6ff",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Cari judul buku di sini..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: "6px",
            border: "1px solid #93c5fd",
          }}
        />
        <select
          value={kategoriDipilih}
          onChange={(e) => setKategoriDipilih(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #93c5fd",
          }}
        >
          <option value="Semua">Semua Kategori</option>
          <option value="Rekayasa Perangkat Lunak">
            Rekayasa Perangkat Lunak
          </option>
          <option value="Arsitektur Cloud & API">Arsitektur Cloud & API</option>
        </select>
        <div style={{ fontWeight: "bold", color: "#1e3a8a" }}>
          📚 Buku Dipilih: {bukuDipinjam.length} Judul
        </div>
      </div>

      {/* Daftar Kartu Buku */}
      <div style={{ display: "grid", gap: "12px" }}>
        {bukuTersaring.map((buku) => {
          const sudahDipilih = bukuDipinjam.includes(buku.judul);
          return (
            <div
              key={buku.id}
              style={{
                border: "1px solid #cbd5e1",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: sudahDipilih ? "#f0fdf4" : "white",
              }}
            >
              <div>
                <strong style={{ fontSize: "16px" }}>{buku.judul}</strong>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  Kategori: {buku.kategori} • Rak: {buku.rak}
                </p>
              </div>
              <button
                onClick={() => togglePinjam(buku.judul)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: sudahDipilih ? "#dc2626" : "#2563eb",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {sudahDipilih ? "❌ Batal Pinjam" : "➕ Pinjam Buku"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
