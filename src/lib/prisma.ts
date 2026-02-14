import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL || "";
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

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

if (!globalForPrisma.prisma) {
  const adapter = new PrismaPg({ connectionString: getDatabaseUrl() });
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma;
