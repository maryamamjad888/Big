"use client";
import React, { useState, useEffect, useRef } from "react";
import projects from "../../data/projects";
import ProjectDetails from "./ProjectDetails";

const ProjectList = ({ searchQuery = "" }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isScaled, setIsScaled] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Parse the URL on the initial load to set the selected project
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const match = path.match(/\/projects\/(.+)-(\d+)/);

      if (match) {
        const projectId = parseInt(match[2], 10);
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          setSelectedProjectId(project.id);
        }
      }
    }
  }, []);

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

  useEffect(() => {
    if (selectedProjectId !== null && typeof window !== "undefined") {
      const selectedProject = projects.find((p) => p.id === selectedProjectId);
      if (selectedProject) {
        const url = `/projects/${selectedProject.name
          .replace(/\s+/g, "-")
          .toLowerCase()}-${selectedProjectId}`;
        window.history.pushState(null, "", url);
      }
    }
  }, [selectedProjectId]);

  const handleProjectClick = (id) => {
    setSelectedProjectId(id === selectedProjectId ? null : id);
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
          >
            <div
              className="main-image"
              onClick={() => handleProjectClick(project.id)}
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
<<<<<<<<< Temporary merge branch 1
                <img
                  src={project.icon}
                  alt={`${project.name} icon`}
                  draggable="false"
                />
=========
                <img src={project.icon} alt={`${project.name} icon`} draggable="false" />
>>>>>>>>> Temporary merge branch 2
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.location}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
<<<<<<<<< Temporary merge branch 1
        <p>No projects found for "{searchQuery}"</p>
=========
        <p>No projects found for {searchQuery}</p>
>>>>>>>>> Temporary merge branch 2
      )}
    </div>
  );
};

export default ProjectList;
