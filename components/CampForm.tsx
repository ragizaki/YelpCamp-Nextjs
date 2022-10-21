import React, { ChangeEvent, useState } from "react";

export default function CampForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0,
    city: "",
    state: "",
    description: "",
  });

  const saveCamp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/camps.ts", {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Post a Campsite</h1>
      <form onSubmit={saveCamp}>
        <input
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="price"
          value={formData.price}
          min={0}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="city"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          name="state"
          placeholder="state"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
