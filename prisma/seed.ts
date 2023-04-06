import prisma from "@lib/prisma";
import { type Prisma } from "@prisma/client";

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
          image: "/campsite.jpg",
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
          image: "/campsite.jpg",
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
          image: "/campsite.jpg",
        },
        {
          name: "Mississauga Camp",
          price: 300,
          description: "Nice little campsite",
          city: "Mississauga",
          country: "Canada",
          image: "/campsite.jpg",
        },
      ],
    },
  },
];

async function main() {
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
