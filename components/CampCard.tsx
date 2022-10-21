import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camp } from "@prisma/client";

interface Props {
  camp: Camp;
}
const CampCard: React.FC<Props> = ({ camp }) => {
  return (
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
      <Link href={`/camps/${camp.id}`}>
        <a>View Camp</a>
      </Link>
    </div>
  );
};

export default CampCard;
