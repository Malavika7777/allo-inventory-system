import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  // Products
  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 15",
      price: 70000,
    },
  });

  const samsung = await prisma.product.create({
    data: {
      name: "Samsung S24",
      price: 65000,
    },
  });

  // Warehouses
  const chennai = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
      location: "Chennai",
    },
  });

  const bangalore = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
      location: "Bangalore",
    },
  });

  // Inventory
  await prisma.inventory.createMany({
    data: [
      {
        productId: iphone.id,
        warehouseId: chennai.id,
        totalStock: 10,
        reservedStock: 0,
      },
      {
        productId: samsung.id,
        warehouseId: bangalore.id,
        totalStock: 5,
        reservedStock: 0,
      },
    ],
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });