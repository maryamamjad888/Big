'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProjectDetails = ({ project }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div 
      data-aos="fade-left" 
      data-aos-delay="500"   
      className="project-details-content"
    >
      {project.details.map((detail, index) => (
        <div key={index} className={`detail-item ${detail.type}`}>
          {detail.type === 'text' && <p>{detail.content}</p>}
          {detail.type === 'image' && <img src={detail.src} alt={`Detail ${index}`} draggable='false' />}
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;
