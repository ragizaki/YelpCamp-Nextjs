import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Image from "next/image";
import { Camp } from "@prisma/client";
import prisma from "../../lib/prisma";

interface Props {
  camp: Camp;
}

const CampPage: React.FC<Props> = ({ camp }) => {
  return (
    <div>
      <p>Name: {camp.name}</p>
      <Image src={camp.image} width={300} height={300} alt={camp.name} />
      <p>Description: {camp.description}</p>
      <Link href="/">
        <a>View Camps</a>
      </Link>
    </div>
  );
};

export default CampPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const camp = await prisma.camp.findUnique({
    where: {
      id: Number(ctx.params?.id),
    },
  });

  return { props: { camp } };
};
