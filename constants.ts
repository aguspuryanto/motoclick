
import { Motor, MotorType, MembershipTier } from './types';

export const BRANDS = ['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Vespa', 'BMW', 'KTM'];

export const MOTORS: Motor[] = [
  {
    id: 'h1',
    name: 'Vario 160',
    brand: 'Honda',
    type: MotorType.MATIC,
    price: 27350000,
    engine: '160cc eSP+',
    colors: ['Grand Matte White', 'Active Matte Blue', 'Grande Matte Black'],
    imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800',
    description: 'Skutik premium dengan performa bertenaga dan desain futuristik.',
    isPopular: true
  },
  {
    id: 'y1',
    name: 'NMAX Turbo',
    brand: 'Yamaha',
    type: MotorType.MATIC,
    price: 32700000,
    engine: '155cc VVA',
    colors: ['Elixir Dark Silver', 'Magma Black'],
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
    description: 'Generasi terbaru NMAX dengan teknologi YECVT untuk akselerasi instan.',
    isPopular: true
  },
  {
    id: 'k1',
    name: 'Ninja ZX-25R',
    brand: 'Kawasaki',
    type: MotorType.SPORT,
    price: 110500000,
    engine: '250cc 4-Cylinder',
    colors: ['Lime Green', 'Metallic Matte Graphenesteel Grey'],
    imageUrl: 'https://images.unsplash.com/photo-1562907550-096d3bf9b25c?auto=format&fit=crop&q=80&w=800',
    description: 'Satu-satunya motor 250cc dengan mesin 4 silinder segaris di kelasnya.',
    isPopular: true
  },
  {
    id: 'v1',
    name: 'Primavera S 150',
    brand: 'Vespa',
    type: MotorType.MATIC,
    price: 54100000,
    engine: '150cc i-get ABS',
    colors: ['Beige Avvolgente', 'Blue Estroverso', 'Green Tenace'],
    imageUrl: 'https://images.unsplash.com/photo-1591544465494-013143c7b8c7?auto=format&fit=crop&q=80&w=800',
    description: 'Ikon gaya Italia yang elegan dengan teknologi modern.',
    isPopular: true
  },
  {
    id: 's1',
    name: 'GSX-R150',
    brand: 'Suzuki',
    type: MotorType.SPORT,
    price: 35000000,
    engine: '150cc DOHC',
    colors: ['Solarize Silver', 'Triton Blue'],
    imageUrl: 'https://images.unsplash.com/photo-1449495169669-7b118f960237?auto=format&fit=crop&q=80&w=800',
    description: 'Motor sport ringan dengan performa mesin yang responsif.',
  },
  {
    id: 'b1',
    name: 'G 310 R',
    brand: 'BMW',
    type: MotorType.SPORT,
    price: 116000000,
    engine: '313cc Single Cylinder',
    colors: ['Polar White', 'Cosmic Black', 'Style Passion'],
    imageUrl: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80&w=800',
    description: 'Roadster lincah untuk pengalaman berkendara harian yang premium.',
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
