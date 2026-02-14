import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL || "";
function getRealUrl(url: string): string {
  if (url.startsWith("prisma+postgres://")) {
    try {
      const parsed = new URL(url);
      const apiKey = parsed.searchParams.get("api_key");
      if (apiKey) {
        const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString());
        if (decoded.databaseUrl) return decoded.databaseUrl;
      }
    } catch {}
  }
  return url;
}
const adapter = new PrismaPg({ connectionString: getRealUrl(dbUrl) });
const prisma = new PrismaClient({ adapter });

const instructorData: Record<string, { slug: string; bio: string; socials: string; gallery: string }> = {
  "Efehan Yıldız": {
    slug: "efehan-yildiz",
    bio: `10 yılı aşkın süredir dijital dünyada aktif olarak çalışan Efehan Yıldız, WordPress ve SEO alanlarında Türkiye'nin önde gelen uzmanlarından biridir.

Kariyerine freelance web geliştirici olarak başlayan Efehan, zamanla dijital pazarlama ve arama motoru optimizasyonu konularında derinlemesine uzmanlaştı. Bugüne kadar 200'den fazla web sitesi projesinde yer aldı ve onlarca markayı Google'da ilk sayfaya taşıdı.

Eğitim verme tutkusu sayesinde binlerce öğrenciye WordPress site kurulumu, tema geliştirme, SEO stratejileri ve içerik optimizasyonu konularında rehberlik etti. Pratik odaklı eğitim anlayışıyla, öğrencilerinin gerçek dünya projelerinde başarılı olmalarını hedefliyor.

Worgoo'nun kurucu ortağı olarak, dijital eğitim alanında yenilikçi çözümler üretmeye devam ediyor.`,
    socials: JSON.stringify({ website: "https://efehanyildiz.com", linkedin: "https://linkedin.com/in/efehanyildiz", twitter: "https://twitter.com/efehanyildiz" }),
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    ]),
  },
  "Hasan Tarık Emir": {
    slug: "hasan-tarik-emir",
    bio: `Dijital pazarlama dünyasında 8 yıllık deneyime sahip olan Hasan Tarık Emir, özellikle performans pazarlama ve büyüme stratejileri konusunda uzmanlaşmış bir profesyoneldir.

Google Ads, Meta Ads ve programatik reklamcılık alanlarında sertifikalı olan Hasan Tarık, küçük işletmelerden kurumsal markalara kadar geniş bir yelpazede dijital pazarlama kampanyaları yönetti. Toplam yönettiği reklam bütçesi 10 milyon TL'yi aşmaktadır.

Veri odaklı yaklaşımıyla, her kampanyada ölçülebilir sonuçlar elde etmeyi ve ROI'yi maksimize etmeyi hedefliyor. A/B testleri, dönüşüm optimizasyonu ve müşteri yolculuğu analizi konularında derin bilgi birikimine sahip.

Eğitimlerinde gerçek kampanya örnekleri ve case study'ler kullanarak, öğrencilerinin teorik bilgiyi pratiğe dönüştürmelerine yardımcı oluyor.`,
    socials: JSON.stringify({ linkedin: "https://linkedin.com/in/hasantarikemir", twitter: "https://twitter.com/htarikemir" }),
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    ]),
  },
  "Emir Karaman": {
    slug: "emir-karaman",
    bio: `Full-stack web geliştirme alanında 7 yıllık profesyonel deneyime sahip olan Emir Karaman, modern JavaScript ekosistemi ve React teknolojileri konusunda uzmanlaşmış bir yazılımcıdır.

React, Next.js, Node.js ve TypeScript ile kurumsal düzeyde web uygulamaları geliştiren Emir, aynı zamanda açık kaynak topluluğuna aktif katkıda bulunan bir geliştiricidir. GitHub'da 2000'den fazla takipçiye sahip ve birçok popüler açık kaynak projenin bakımını üstleniyor.

Yazılım mimarisi, temiz kod prensipleri ve test driven development konularında tutkulu olan Emir, eğitimlerinde sadece "nasıl" değil, "neden" sorusuna da cevap veriyor. Öğrencilerinin endüstri standartlarında kod yazmalarını ve modern geliştirme pratiklerini benimsemelerini sağlıyor.

Daha önce startup ekosisteminde CTO olarak görev yapan Emir, teknik liderlik ve takım yönetimi konularında da deneyim sahibidir.`,
    socials: JSON.stringify({ website: "https://emirkaraman.dev", linkedin: "https://linkedin.com/in/emirkaraman", twitter: "https://twitter.com/emirkaraman" }),
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    ]),
  },
  "Semih Bayındır": {
    slug: "semih-bayindir",
    bio: `UI/UX tasarım alanında 6 yıllık deneyime sahip olan Semih Bayındır, kullanıcı deneyimi odaklı tasarım çözümleri üreten yaratıcı bir profesyoneldir.

Figma, Adobe Creative Suite ve prototyping araçlarında uzman olan Semih, bugüne kadar 50'den fazla mobil uygulama ve web sitesi tasarımı gerçekleştirdi. Kullanıcı araştırması, wireframing, prototyping ve tasarım sistemi oluşturma konularında derin bilgi birikimine sahip.

İnsan-bilgisayar etkileşimi ve bilişsel psikoloji alanlarındaki akademik geçmişi, tasarım kararlarını bilimsel temellere dayandırmasını sağlıyor. Her projede kullanıcı testleri ve iteratif tasarım süreçleri uygulayarak, ölçülebilir kullanıcı deneyimi iyileştirmeleri elde ediyor.

Eğitimlerinde tasarım düşüncesi metodolojisini, güncel UI trendlerini ve erişilebilirlik standartlarını bir arada sunarak, öğrencilerinin hem estetik hem de fonksiyonel tasarımlar üretmelerini hedefliyor.`,
    socials: JSON.stringify({ website: "https://semihbayindir.com", linkedin: "https://linkedin.com/in/semihbayindir" }),
    gallery: JSON.stringify([
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    ]),
  },
};

async function main() {
  for (const [name, data] of Object.entries(instructorData)) {
    const user = await prisma.user.findFirst({ where: { name, role: "instructor" } });
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          slug: data.slug,
          bio: data.bio,
          socials: data.socials,
          gallery: data.gallery,
        },
      });
      console.log(`✅ Updated: ${name} → /egitmen/${data.slug}`);
    } else {
      console.log(`⚠️ Not found: ${name}`);
    }
  }

  // Create test students if none exist
  const studentNames = [
    { name: "Ahmet Yılmaz", email: "ahmet@test.com" },
    { name: "Zeynep Kaya", email: "zeynep@test.com" },
    { name: "Mehmet Demir", email: "mehmet@test.com" },
    { name: "Elif Çelik", email: "elif@test.com" },
    { name: "Can Özkan", email: "can@test.com" },
    { name: "Selin Arslan", email: "selin@test.com" },
  ];

  for (const s of studentNames) {
    const exists = await prisma.user.findUnique({ where: { email: s.email } });
    if (!exists) {
      await prisma.user.create({
        data: { email: s.email, password: "$2b$12$ngFOnaipGEcWUpAlbNPVz.AeaT9TcSnBgRZj/vXbsir3qte2RQBYi", name: s.name, role: "student" },
      });
      console.log(`✅ Student created: ${s.name}`);
    }
  }

  const students = await prisma.user.findMany({ where: { role: "student" }, select: { id: true, name: true } });
  const courses = await prisma.course.findMany({ where: { status: "published" }, select: { id: true, title: true } });

  const reviewComments = [
    { rating: 5, comment: "Harika bir kurs! Eğitmenin anlatımı çok akıcı ve örnekler gerçek hayattan. Kesinlikle tavsiye ederim." },
    { rating: 4, comment: "Çok faydalı bir eğitim oldu. Özellikle pratik kısımlar çok iyi hazırlanmış. Tek eksik biraz daha ileri seviye içerik olabilirdi." },
    { rating: 5, comment: "Bu kursu aldıktan sonra iş hayatımda ciddi bir fark yarattı. Eğitmen her soruya çok hızlı dönüş yapıyor." },
    { rating: 5, comment: "Sıfırdan başlayıp profesyonel seviyeye geldim. Adım adım ilerleyen müfredat çok başarılı." },
    { rating: 4, comment: "Genel olarak memnun kaldım. İçerik kalitesi yüksek, video ve ses kalitesi de gayet iyi." },
    { rating: 5, comment: "Piyasadaki en iyi Türkçe eğitim. Eğitmenin sektör deneyimi eğitime çok şey katıyor." },
    { rating: 5, comment: "Çok kapsamlı ve detaylı bir kurs. Her modül bir öncekinin üzerine güzel inşa edilmiş." },
    { rating: 4, comment: "Eğitmenin tecrübesi anlatımına yansıyor. Gerçek proje örnekleri çok değerli." },
    { rating: 5, comment: "Türkiye'deki en kaliteli online eğitim platformlarından biri. Bu kursu herkese öneriyorum." },
    { rating: 5, comment: "Kurs içeriği sürekli güncelleniyor, bu çok önemli. Eğitmen gerçekten işini biliyor." },
  ];

  let reviewIdx = 0;
  for (const course of courses) {
    // Each course gets 2 reviews from different students
    for (let j = 0; j < 2 && j < students.length; j++) {
      const studentId = students[(reviewIdx + j) % students.length].id;
      const exists = await prisma.review.findUnique({
        where: { userId_courseId: { userId: studentId, courseId: course.id } },
      });
      if (!exists) {
        const enrollment = await prisma.enrollment.findUnique({
          where: { userId_courseId: { userId: studentId, courseId: course.id } },
        });
        if (!enrollment) {
          await prisma.enrollment.create({ data: { userId: studentId, courseId: course.id, status: "active" } });
        }
        const rd = reviewComments[reviewIdx % reviewComments.length];
        await prisma.review.create({
          data: { userId: studentId, courseId: course.id, rating: rd.rating, comment: rd.comment, isVisible: true },
        });
        console.log(`✅ Review: "${rd.comment.substring(0, 40)}..." → ${course.title}`);
      }
      reviewIdx++;
    }
  }

  console.log("\n🎉 Seed complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
