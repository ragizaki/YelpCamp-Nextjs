import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import CampCard from "../components/CampCard";

import { Camp } from "@prisma/client";
import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const camps: Camp[] = await prisma.camp.findMany();
  return {
    props: {
      camps,
    },
  };
}

interface Props {
  camps: Camp[];
}

const Home: NextPage<Props> = ({ camps }: Props) => {
  return (
    <div>
      {camps.map((camp: Camp) => (
        <CampCard key={camp.id} camp={camp} />
      ))}
    </div>
  );
};

export default Home;
