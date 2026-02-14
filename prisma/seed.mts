import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Worgoo Akademi...");

  const pw = await bcrypt.hash("admin123", 12);

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: "efehan@worgoo.com" },
    update: { avatar: "https://www.worgoo.com/wp-content/uploads/2025/12/ey-pp.jpg.webp" },
    create: { email: "efehan@worgoo.com", password: pw, name: "Efehan Yıldız", role: "admin", title: "WordPress & SEO Uzmanı", bio: "Dijital dünyada markaların online varlığını güçlendiren stratejiler geliştiriyor.", avatar: "https://www.worgoo.com/wp-content/uploads/2025/12/ey-pp.jpg.webp" },
  });
  console.log("✅ Admin:", admin.email);

  // Instructors
  const instructors = [
    { email: "efehan@efehanyildiz.com", name: "Efehan Yıldız", title: "WordPress & SEO Uzmanı", bio: "Dijital dünyada markaların online varlığını güçlendiren stratejiler geliştiriyor.", avatar: "https://www.worgoo.com/wp-content/uploads/2025/12/ey-pp.jpg.webp" },
    { email: "hasan@worgoo.com", name: "Hasan Tarık Emir", title: "Dijital Pazarlama Uzmanı", bio: "Performans pazarlama ve büyüme stratejileri konusunda uzmanlaşmış profesyonel.", avatar: "https://www.worgoo.com/wp-content/uploads/2025/12/hte-pp.jpg.webp" },
    { email: "emir@worgoo.com", name: "Emir Karaman", title: "Web Geliştirme Uzmanı", bio: "Modern web teknolojileri ve full-stack geliştirme alanında deneyimli yazılımcı.", avatar: "https://www.worgoo.com/wp-content/uploads/2025/12/ek-pp.jpg.webp" },
    { email: "semih@worgoo.com", name: "Semih Bayındır", title: "Tasarım & UX Uzmanı", bio: "Kullanıcı deneyimi odaklı tasarım çözümleri üreten yaratıcı profesyonel.", avatar: "https://www.worgoo.com/wp-content/uploads/2025/12/sb-pp.jpg.webp" },
  ];

  const instructorIds: string[] = [];
  for (const inst of instructors) {
    const user = await prisma.user.upsert({
      where: { email: inst.email },
      update: { title: inst.title, bio: inst.bio, avatar: inst.avatar },
      create: { ...inst, password: pw, role: "instructor" },
    });
    instructorIds.push(user.id);
    console.log("✅ Instructor:", user.name);
  }

  // Categories
  const cats = [
    { name: "WordPress", slug: "wordpress", description: "WordPress ile web sitesi geliştirme", order: 1 },
    { name: "SEO", slug: "seo", description: "Arama motoru optimizasyonu", order: 2 },
    { name: "Dijital Pazarlama", slug: "dijital-pazarlama", description: "Online pazarlama stratejileri", order: 3 },
    { name: "Tasarım", slug: "tasarim", description: "Web ve grafik tasarım", order: 4 },
    { name: "Web Geliştirme", slug: "web-gelistirme", description: "Modern web teknolojileri", order: 5 },
  ];

  const catIds: Record<string, string> = {};
  for (const cat of cats) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    catIds[cat.slug] = c.id;
  }
  console.log("✅ Categories created");

  // Sample courses
  const courses = [
    { title: "WordPress ile E-Ticaret Sitesi Kurma", slug: "wordpress-e-ticaret", shortDesc: "Sıfırdan profesyonel bir e-ticaret sitesi oluşturmayı öğrenin.", price: 499, salePrice: 299, level: "beginner", instructorIdx: 0, catSlug: "wordpress", isFeatured: true, totalDuration: 480 },
    { title: "SEO Masterclass: Google'da 1. Sayfa", slug: "seo-masterclass", shortDesc: "SEO'nun A'dan Z'ye tüm detaylarını öğrenin.", price: 599, salePrice: 399, level: "intermediate", instructorIdx: 0, catSlug: "seo", isFeatured: true, totalDuration: 360 },
    { title: "Google Ads ile Performans Pazarlama", slug: "google-ads-performans", shortDesc: "Google Ads kampanyalarını profesyonelce yönetmeyi öğrenin.", price: 449, level: "intermediate", instructorIdx: 1, catSlug: "dijital-pazarlama", isFeatured: true, totalDuration: 300 },
    { title: "React ile Modern Web Uygulamaları", slug: "react-modern-web", shortDesc: "React.js ile full-stack web uygulamaları geliştirin.", price: 699, salePrice: 499, level: "advanced", instructorIdx: 2, catSlug: "web-gelistirme", isFeatured: true, totalDuration: 540 },
    { title: "UI/UX Tasarım Temelleri", slug: "ui-ux-tasarim", shortDesc: "Kullanıcı deneyimi odaklı tasarım prensiplerini öğrenin.", price: 349, level: "beginner", instructorIdx: 3, catSlug: "tasarim", isFeatured: false, totalDuration: 240 },
    { title: "WordPress Tema Geliştirme", slug: "wordpress-tema-gelistirme", shortDesc: "Özel WordPress temaları geliştirmeyi öğrenin.", price: 549, level: "advanced", instructorIdx: 0, catSlug: "wordpress", isFeatured: false, totalDuration: 420 },
  ];

  for (const c of courses) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        title: c.title, slug: c.slug, shortDesc: c.shortDesc, price: c.price,
        salePrice: c.salePrice || null, level: c.level, status: "published",
        isFeatured: c.isFeatured, totalDuration: c.totalDuration,
        instructorId: instructorIds[c.instructorIdx],
        categoryId: catIds[c.catSlug],
      },
    });

    // Add sample sections and lessons
    const sections = [
      { title: "Giriş", lessons: ["Kursa Hoş Geldiniz", "Gereksinimler ve Kurulum"] },
      { title: "Temel Kavramlar", lessons: ["Temel Bilgiler", "İlk Adımlar", "Pratik Uygulama"] },
      { title: "İleri Seviye", lessons: ["İleri Teknikler", "Gerçek Proje", "Sonuç ve Sertifika"] },
    ];

    for (let si = 0; si < sections.length; si++) {
      const existingSection = await prisma.section.findFirst({ where: { courseId: course.id, title: sections[si].title } });
      if (!existingSection) {
        const section = await prisma.section.create({ data: { title: sections[si].title, order: si, courseId: course.id } });
        for (let li = 0; li < sections[si].lessons.length; li++) {
          await prisma.lesson.create({
            data: { title: sections[si].lessons[li], order: li, duration: 15 + Math.floor(Math.random() * 30), isFree: si === 0 && li === 0, sectionId: section.id },
          });
        }
      }
    }
    console.log("✅ Course:", c.title);
  }

  console.log("🎉 Seed completed!");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
