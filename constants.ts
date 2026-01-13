
import { Motor, MotorType, MembershipTier } from './types';

export const BRANDS = ['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Vespa', 'BMW', 'KTM'];

export const LOCATIONS = ['Jakarta', 'Tangerang', 'Bekasi', 'Depok', 'Bogor'];

export const MOTORS: Motor[] = [
  {
    id: 'h1',
    name: 'Vario 160',
    brand: 'Honda',
    type: MotorType.MATIC,
    condition: 'New',
    price: 27350000,
    engine: '160cc eSP+',
    colors: ['Grand Matte White', 'Active Matte Blue', 'Grande Matte Black'],
    imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800',
    description: 'Skutik premium dengan performa bertenaga dan desain futuristik.',
    year: 2024,
    location: 'Jakarta',
    isPopular: true,
    isReady: true,
    promoExpiry: '31 Dec 2024',
    bonus: ['Helm Exclusive', 'Gratis Oli 1 Thn']
  },
  {
    id: 'y1',
    name: 'NMAX Turbo',
    brand: 'Yamaha',
    type: MotorType.MATIC,
    condition: 'New',
    price: 32700000,
    engine: '155cc VVA',
    colors: ['Elixir Dark Silver', 'Magma Black'],
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
    description: 'Generasi terbaru NMAX dengan teknologi YECVT untuk akselerasi instan.',
    year: 2024,
    location: 'Tangerang',
    isPopular: true,
    isReady: true,
    promoExpiry: '15 Jan 2025',
    bonus: ['Jaket Parka Yamaha', 'Voucher BBM']
  },
  {
    id: 'u1',
    name: 'BeAT Deluxe (Used)',
    brand: 'Honda',
    type: MotorType.MATIC,
    condition: 'Used',
    price: 14500000,
    marketPrice: 15200000, // Harga pasaran lebih tinggi
    engine: '110cc eSP',
    colors: ['Matte Blue', 'Matte Black'],
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
    description: 'Motor bekas berkualitas, mesin halus, surat lengkap dan pajak hidup.',
    year: 2021,
    location: 'Bekasi',
    isReady: true,
    bonus: ['Gratis Balik Nama', 'Servis Ringan']
  },
  {
    id: 'k1',
    name: 'Ninja ZX-25R',
    brand: 'Kawasaki',
    type: MotorType.SPORT,
    condition: 'New',
    price: 110500000,
    engine: '250cc 4-Cylinder',
    colors: ['Lime Green', 'Ebony Black'],
    imageUrl: 'https://images.unsplash.com/photo-1562907550-096d3bf9b25c?auto=format&fit=crop&q=80&w=800',
    description: 'Satu-satunya motor 250cc dengan mesin 4 silinder segaris di kelasnya.',
    year: 2024,
    location: 'Jakarta',
    isPopular: true,
    isReady: false, // Indent
    bonus: ['Knalpot Akrapovic Promo', 'Paddock Stand']
  },
  {
    id: 'u2',
    name: 'Scoopy Prestige (Used)',
    brand: 'Honda',
    type: MotorType.MATIC,
    condition: 'Used',
    price: 17800000,
    marketPrice: 18500000,
    engine: '110cc eSP',
    colors: ['White', 'Brown'],
    imageUrl: 'https://images.unsplash.com/photo-1591544465494-013143c7b8c7?auto=format&fit=crop&q=80&w=800',
    description: 'Body mulus 95%, ban tebal, KM rendah. Unit simpanan.',
    year: 2022,
    location: 'Depok',
    isReady: true,
  }
];

export const PROMOS = [
  {
    id: 1,
    title: "Ramadan Sale!",
    subtitle: "Potongan DP Hingga 5 Juta",
    color: "from-emerald-600 to-teal-700",
    image: "https://images.unsplash.com/photo-1575844029762-28e3f8ec16c1?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "New Year Promo",
    subtitle: "Gratis Aksesoris Original",
    color: "from-blue-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600"
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    name: 'Silver',
    color: 'bg-slate-300',
    minPurchase: 0,
    benefits: ['Gratis Service 1x', 'Diskon Sparepart 5%', 'Poin Belanja']
  },
  {
    name: 'Gold',
    color: 'bg-amber-400',
    minPurchase: 50000000,
    benefits: ['Gratis Service 3x', 'Diskon Sparepart 10%', 'Home Service Gratis', 'Prioritas Antrian']
  },
  {
    name: 'Platinum',
    color: 'bg-indigo-400',
    minPurchase: 150000000,
    benefits: ['Gratis Service Setahun', 'Diskon Sparepart 20%', 'Layanan Pick-up & Drop-off', 'Voucher Aksesoris Eksklusif']
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Wirausaha",
    rating: 5,
    comment: "Proses cepat banget, pagi klik sore motor sampai rumah! Pelayanan adminnya juga sangat responsif membantu pengurusan STNK.",
    avatar: "https://i.pravatar.cc/150?u=budi"
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Pegawai Swasta",
    rating: 5,
    comment: "Simulasi kreditnya akurat, nggak ada biaya tersembunyi. DP yang saya bayarkan sesuai dengan apa yang ditampilkan di aplikasi.",
    avatar: "https://i.pravatar.cc/150?u=siti"
  },
  {
    id: 3,
    name: "Rian Hidayat",
    role: "Content Creator",
    rating: 4,
    comment: "Unitnya sampai dalam kondisi mulus. Fitur membership-nya sangat menguntungkan buat dapet diskon service kedepannya.",
    avatar: "https://i.pravatar.cc/150?u=rian"
  }
];
