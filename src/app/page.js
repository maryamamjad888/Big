"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import ProjectList from "../app/components/Projects/ProjectList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <ProjectList searchQuery={searchQuery} />
    </>
  );
}
