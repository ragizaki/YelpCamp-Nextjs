import { Prisma } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";

interface Props {
  saveCamp: (camp: Prisma.CampCreateInput) => Promise<void>;
}

export default function CampForm({ saveCamp }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0,
    city: "",
    state: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Post a Campsite</h1>
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          await saveCamp(formData);
        }}
      >
        <input
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="price"
          value={formData.price}
          min={0}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
