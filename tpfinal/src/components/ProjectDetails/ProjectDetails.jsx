// src/components/ProjectComponents/ProjectDetails.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import './ProjectDetails.scss';
import EditProject from "../edit-project";
import { Modal } from '@mui/material';


const ProjectDetails = ({ projects }) => {
  const { projectId } = useParams();
  const project = projects.find((p) => String(p.id) === projectId);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!project) {
    return <p>Proyecto no encontrado</p>;
  }

  return (
    <div>
      <h2>{project.name} - Detalles del Proyecto</h2>
      <p className="project-detail-description">{project.description}</p>
      <div>
      <button onClick={handleOpen}>Editar</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <EditProject onClose={handleClose} />
                </div>
            </Modal>
      </div>
      <h3>Epics:</h3>
      <div>
        {project.epics ? (
          project.epics.map((epic, index) => (
            <div key={index}>
              <Link to={`/my-projects/${projectId}/epics/${epic.id}`}>
                {epic.name}
              </Link>
            </div>
          ))
        ) : (
          <li>No hay Epics definidas para este proyecto.</li>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
