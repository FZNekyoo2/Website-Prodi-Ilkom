// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL belum diset di .env.local");
}

// Berita Interface
export interface Berita {
  id: number;
  slug: string;
  judul: string;
  kategori: string;
  tanggal: string;
  deskripsi: string;
  thumbnailUrl: string | null;
}

// Fetch all Berita
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

// Fetch Berita by Slug
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

// Dosen Interface
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

// Alumni Interface
export interface Alumni {
  id: number;
  nama: string;
  slug: string;
  jabatan: string;
  perusahaan: string;
  tahun_lulus: number;
  tahun_masuk?: number;
  ringkasan: string;
  deskripsi_lengkap?: string;
  deskripsi_perusahaan?: string;
  pencapaian?: string;
  bidang: string;
  bidang_keahlian?: string;
  email?: string;
  linkedin?: string;
  website?: string;
  testimoni?: string;
  fotoUrl: string | null;
  fotoPerusahaanUrl: string | null;
}

// Fetch all Alumni
export async function fetchAlumni(): Promise<Alumni[]> {
  const res = await fetch(
    `${API_URL}/api/alumnis?populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("STRAPI ERROR:", res.status, err);
    throw new Error("Gagal mengambil data alumni");
  }

  const json = await res.json();
  const data: any[] = Array.isArray(json.data) ? json.data : [];

  return data.map((item) => {
    const a = item.attributes ?? item ?? {};

    return {
      id: item.id,
      nama: a.nama,
      slug: a.slug,
      jabatan: a.jabatan || '',
      perusahaan: a.perusahaan || '',
      tahun_lulus: a.tahun_lulus || 0,
      tahun_masuk: a.tahun_masuk || null,
      ringkasan: a.ringkasan || '',
      deskripsi_lengkap: a.deskripsi_lengkap || '',
      deskripsi_perusahaan: a.deskripsi_perusahaan || '', // TAMBAHAN
      pencapaian: a.pencapaian || '',
      bidang: a.bidang || '',
      bidang_keahlian: a.bidang_keahlian || '',
      email: a.email || '',
      linkedin: a.linkedin || '',
      website: a.website || '',
      testimoni: a.testimoni || '',
      fotoUrl: a.foto?.url ?? a.foto?.data?.attributes?.url ?? null,
      fotoPerusahaanUrl:
        a.foto_perusahaan?.url ??
        a.foto_perusahaan?.data?.attributes?.url ??
        null,
    };
  });
}

// Fetch Alumni by Slug
export async function fetchAlumniBySlug(slug: string): Promise<Alumni | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/alumnis?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("STRAPI ERROR:", res.status, err);
      throw new Error("Gagal mengambil data alumni detail");
    }

    const json = await res.json();
    const data: any[] = Array.isArray(json.data) ? json.data : [];

    if (data.length > 0) {
      const item = data[0];
      const a = item.attributes ?? item ?? {};

      return {
        id: item.id,
        nama: a.nama || '',
        slug: a.slug || '',
        jabatan: a.jabatan || '',
        perusahaan: a.perusahaan || '',
        tahun_lulus: a.tahun_lulus || 0,
        tahun_masuk: a.tahun_masuk || null,
        ringkasan: a.ringkasan || '',
        deskripsi_lengkap: a.deskripsi_lengkap || '',
        deskripsi_perusahaan: a.deskripsi_perusahaan || '', // TAMBAHAN
        pencapaian: a.pencapaian || '',
        bidang: a.bidang || '',
        bidang_keahlian: a.bidang_keahlian || '',
        email: a.email || '',
        linkedin: a.linkedin || '',
        website: a.website || '',
        testimoni: a.testimoni || '',
        fotoUrl: a.foto?.url ?? a.foto?.data?.attributes?.url ?? null,
        fotoPerusahaanUrl:
          a.foto_perusahaan?.url ??
          a.foto_perusahaan?.data?.attributes?.url ??
          null,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching alumni by slug:', error);
    return null;
  }
}

// Optional: Tambah fungsi untuk search/filter
export async function searchAlumni(query: string): Promise<Alumni[]> {
  const allAlumni = await fetchAlumni();
  const normalizedQuery = query.toLowerCase().trim();
  
  return allAlumni.filter(alumni => 
    alumni.nama.toLowerCase().includes(normalizedQuery) ||
    alumni.perusahaan.toLowerCase().includes(normalizedQuery) ||
    alumni.jabatan.toLowerCase().includes(normalizedQuery) ||
    alumni.bidang.toLowerCase().includes(normalizedQuery)
  );
}