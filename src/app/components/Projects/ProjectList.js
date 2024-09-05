"use client";
import React, { useState, useEffect, useRef } from "react";
import projects from "../../data/projects";
import ProjectDetails from "./ProjectDetails";
import { useRouter, usePathname } from "next/navigation";

const ProjectList = ({ searchQuery = "" }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isScaled, setIsScaled] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const matchedProject = projects.find((project) =>
      pathname.includes(
        `${project.name.toLowerCase().replace(/\s+/g, "-")}-${project.id}`
      )
    );
    if (matchedProject) {
      setSelectedProjectId(matchedProject.id);
    }
  }, [pathname]);
  // const navigateToPost = (postId) => {
  //   router.push(`/projects/${postId}`);
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScaled(true);
      clearTimeout(window.scaleTimeout);
      window.scaleTimeout = setTimeout(() => setIsScaled(false), 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(window.scaleTimeout);
    };
  }, []);

  const handleProjectClick = (id, name) => {
    setSelectedProjectId(id === selectedProjectId ? null : id);
    if (id !== selectedProjectId) {
      let formattedName = name.toLowerCase().replace(/\s+/g, "-");
      router.push(`/projects/${formattedName}-${id}`);
    }
  };

  const handleMouseDown = (e) => {
    const selectedDiv = e.target.closest(".project-item.selected");
    if (selectedDiv) {
      isDragging.current = true;
      startX.current = e.pageX - selectedDiv.offsetLeft;
      scrollLeft.current = selectedDiv.scrollLeft;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const selectedDiv = e.target.closest(".project-item.selected");
    if (selectedDiv) {
      const x = e.pageX - selectedDiv.offsetLeft;
      const walk = (x - startX.current) * 2;
      selectedDiv.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase().trim();
    return (
      project.location.toLowerCase().includes(searchLower) ||
      (project.keywords && project.keywords.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div
      className={`project-list ${isScaled ? "scaled" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`project-item ${
              selectedProjectId === project.id ? "selected" : ""
            }`}
            // onClick={() => handleProjectClick(project.id, project.name)}
          >
            <div
              className="main-image"
              onClick={() => handleProjectClick(project.id, project.name)}
            >
              <img src={project.image} alt={project.name} draggable="false" />
            </div>
            {selectedProjectId === project.id && (
              <div className="project-details-wrapper">
                <ProjectDetails project={project} />
              </div>
            )}
            <div className="side-details">
              <div className="project-icon">
                <img
                  src={project.icon}
                  alt={`${project.name} icon`}
                  draggable="false"
                />
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.location}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found for {searchQuery}</p>
      )}
    </div>
  );
};

export default ProjectList;
