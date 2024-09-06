"use client";

import React, { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import ProjectList from "../../components/Projects/ProjectList";
import Footer from "@/app/components/Footer/Footer";

const ProjectPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <ProjectList searchQuery={searchQuery} />
      <Footer />
    </>
  );
};

export default ProjectPage;
