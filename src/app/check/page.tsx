import React from "react";

const getData = async () => {
  const res = await fetch("https://some-new-shamama-bin-shakil.vercel.app/api/request");
  const result = await res.json();
  return result;
};

const Check = async () => {
  const data = await getData();
  return (
    <>
      <h1>Check Section</h1>
      {data && data.data.map((item: any) => (
        <li key={item._id}>{item.color_name}</li>
      ))}
    </>
  );
};

export default Check;
