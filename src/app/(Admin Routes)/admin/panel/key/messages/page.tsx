"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  created_at: string;
};

const page = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await res.json();
      console.log("Fetched data:", jsonData.contacts);
      setData(jsonData.contacts as Contact[]); // Set contacts array to data state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-[8%]">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        data.map((contact, index) => (
          <div className="mb-4" key={index}>
            <Card
              id={contact.id}
              firstName={contact.firstName}
              lastName={contact.lastName}
              phone={contact.phone}
              message={contact.message}
              created_at={contact.created_at}
              onDelete={() => getData()}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default page;
