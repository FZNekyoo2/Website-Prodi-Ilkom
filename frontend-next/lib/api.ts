// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL belum diset di .env.local");
}

export interface Berita {
  id: number;
  slug: string;
  judul: string;
  kategori: string;
  tanggal: string;
  deskripsi: string;
  thumbnailUrl: string | null;
}

export async function fetchBerita(): Promise<Berita[]> {
  const res = await fetch(
    `${API_URL}/api/beritas?populate=thumbnail&sort=createdAt:desc`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil data berita");
  }

  const json = await res.json();

  const data: any[] = Array.isArray(json.data) ? json.data : [];

  return data.map((item) => {
    const attrs = item.attributes ?? item ?? {};
    const thumb =
      attrs.thumbnail?.data?.attributes?.url ??
      attrs.thumbnail?.url ??
      null;

    return {
      id: item.id ?? attrs.id ?? 0,
      slug: attrs.slug ?? "",
      judul: attrs.judul ?? "",
      kategori: attrs.kategori ?? "",
      tanggal: attrs.tanggal ?? "",
      deskripsi: attrs.deskripsi ?? "",
      thumbnailUrl: thumb,
    };
  });
}

export async function fetchBeritaBySlug(slug: string): Promise<Berita | null> {
  const res = await fetch(
    `${API_URL}/api/beritas?filters[slug][$eq]=${slug}&populate=thumbnail`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil detail berita");
  }

  const json = await res.json();
  const item = (json.data && json.data[0]) || null;
  if (!item) return null;

  const attrs = item.attributes ?? item ?? {};
  const thumb =
    attrs.thumbnail?.data?.attributes?.url ??
    attrs.thumbnail?.url ??
    null;

  return {
    id: item.id ?? attrs.id ?? 0,
    slug: attrs.slug ?? "",
    judul: attrs.judul ?? "",
    kategori: attrs.kategori ?? "",
    tanggal: attrs.tanggal ?? "",
    deskripsi: attrs.deskripsi ?? "",
    thumbnailUrl: thumb,
  };
}

export interface Dosen {
  id: number;
  nama: string;
  jabatan: string;
  keahlian: string;
  fotoUrl: string | null;
}

export async function fetchDosen(): Promise<Dosen[]> {
  const res = await fetch(
    `${API_URL}/api/dosens?populate=foto&sort=nama:asc`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil data dosen");
  }

  const json = await res.json();
  const data: any[] = Array.isArray(json.data) ? json.data : [];

  return data.map((item) => {
    const attrs = item.attributes ?? item ?? {};
    const foto =
      attrs.foto?.data?.attributes?.url ??
      attrs.foto?.url ??
      null;

    return {
      id: item.id ?? attrs.id ?? 0,
      nama: attrs.nama ?? "",
      jabatan: attrs.jabatan ?? "",
      keahlian: attrs.keahlian ?? "",
      fotoUrl: foto,
    };
  });
}
