import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          name: "Mississauga Camp",
          price: 300,
          description: "Nice little campsite",
          city: "Mississauga",
          country: "Canada",
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    posts: {
      create: [
        {
          name: "Mississauga Camp",
          price: 300,
          description: "Nice little campsite",
          city: "Mississauga",
          country: "Canada",
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    posts: {
      create: [
        {
          name: "Mississauga Camp",
          price: 300,
          description: "Nice little campsite",
          city: "Mississauga",
          country: "Canada",
        },
        {
          name: "Mississauga Camp",
          price: 300,
          description: "Nice little campsite",
          city: "Mississauga",
          country: "Canada",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
