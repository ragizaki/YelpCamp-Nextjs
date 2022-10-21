import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CampForm from "../components/CampForm";

import { PrismaClient, Camp } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const camps: Camp[] = await prisma.camp.findMany();
  return {
    props: { camps },
  };
}

interface Props {
  camps: Camp[];
}

const Home: NextPage<Props> = ({ camps }: Props) => {
  return (
    <div>
      <CampForm />
      {camps.map((camp: Camp) => (
        <div key={camp.id}>
          <Image
            width={100}
            height={100}
            src={camp.image}
            alt={`Camp ${camp.name}`}
          />
          <p>
            {camp.city}, {camp.state}
          </p>
          <p>{camp.price}</p>
          <p>{camp.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
