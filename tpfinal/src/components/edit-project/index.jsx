import React, { useState, useEffect } from "react";
import "./index.scss";
import { getProjectById, updateProject } from "@/utils/projectManager";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function EditProject({ projectId, onClose, onUpdate }) {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    icon: "",
    dueDate: dayjs(Date.now()),
  });

  useEffect(() => {
    (async () => {
      const project = await getProjectById(projectId);
      setProjectData({
        ...projectData,
        ...project,
        dueDate: dayjs(project.dueDate),
      });
    })();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateProject(projectId, {
      name: projectData.name,
      description: projectData.description,
      icon: projectData.icon,
      dueDate: projectData.dueDate.valueOf(),
    });
    onUpdate(projectData);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="edit-project-container">
        <form className="edit-project-form">
          <input
            className="text-field name"
            type="text"
            value={projectData.name}
            onChange={handleChange}
            placeholder="Nombre del proyecto"
          />
          <textarea
            rows={10}
            className="text-field desc"
            type="text"
            value={projectData.description}
            onChange={handleChange}
            placeholder="Descripcion del proyecto"
          />
          <div className="date-picker-container">
            <p>fecha de finalizacion:</p>
            <DatePicker
              value={projectData.dueDate}
              onChange={(date) => setProjectData({ ...projectData, dueDate: date })}
            />
          </div>
          <div className="icon-selector">
            <p>selecciona un icono!</p>
            <button
              className="icon"
              type="Button"
              onClick={() => setIcon("🚀")}
            >
              🚀
            </button>
            <button
              className="icon"
              type="Button"
              onClick={() => setIcon("🔍")}
            >
              🔍
            </button>
            <button
              className="icon"
              type="Button"
              onClick={() => setIcon("📈")}
            >
              📈
            </button>
            <button
              className="icon"
              type="Button"
              onClick={() => setIcon("📝")}
            >
              📝
            </button>
            <button
              className="icon"
              type="Button"
              onClick={() => setIcon("🎯")}
            >
              🎯
            </button>
          </div>
          <div className="modal-buttons">
            <button className="create-project-submit" onClick={handleUpdate}>
              Update
            </button>
            <button className="close-modal" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default EditProject;

