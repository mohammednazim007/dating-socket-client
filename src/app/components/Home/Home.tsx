"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import React from "react";

const Home = () => {
  const user = useAppSelector((state: RootState) => state.auth);

  console.log(user);
  return <div>Home page</div>;
};

export default Home;
