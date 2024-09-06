"use client";
import React, { useState, useEffect, useRef } from "react";
import projects from "../../data/projects";
import ProjectDetails from "./ProjectDetails";
import { usePathname } from "next/navigation";

const ProjectList = ({ searchQuery = "" }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isScaled, setIsScaled] = useState(false);
  const isDragging = useRef(false);
  const projectRef = useRef(null)
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const pathname = usePathname();
  const [parentFilter, setParentFilter] = useState("");
  const [subMenuFilter, setSubMenuFilter] = useState("");

  useEffect(() => {
    const [parent, subMenu] = searchQuery.split(",");
    setParentFilter(parent || "");
    setSubMenuFilter(subMenu || "");
  }, [searchQuery]);

  useEffect(() => {
    const matchedProject = projects.find((project) =>
      pathname.includes(
        `${project.name.toLowerCase().replace(/\s+/g, "-")}-${project.id}`
      )
    );
    if (matchedProject) {
      setSelectedProjectId(matchedProject.id);

      setTimeout(() => {
        if (projectRef.current) {
            projectRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }, [pathname])

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
      const formattedName = name.toLowerCase().replace(/\s+/g, "-");
      const newUrl = `/projects/${formattedName}-${id}`;

      window.history.replaceState(null, "", newUrl);
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
    const searchLower = (parentFilter || "").toLowerCase().trim();
    const subMenuLower = (subMenuFilter || "").toLowerCase().trim();
    const keywordsLower = project.keywords.toLowerCase();

    return (
      keywordsLower.includes(searchLower) &&
      (!subMenuLower || keywordsLower.includes(subMenuLower))
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
            ref={selectedProjectId === project.id ? projectRef : null}
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
