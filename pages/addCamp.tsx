import { Prisma } from "@prisma/client";
import { NextPage } from "next";
import CampForm from "../components/CampForm";
import axios from "axios";
import { useRouter } from "next/router";

const AddCamp: NextPage = () => {
  const router = useRouter();

  const saveCamp = async (camp: Prisma.CampCreateInput) => {
    await axios.post("/api/camps", camp);
    router.push("/");
  };

  return <CampForm saveCamp={saveCamp} />;
};

export default AddCamp;
