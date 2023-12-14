import React from "react";
import "./index.scss";
import { useState } from "react";
import { patchProject } from "@/utils/projectManager";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function EditProject({ project, onClose }) {
  const [name, setName] = useState(name);
  const [description, setDescription] = useState(description);
  const [icon, setIcon] = useState(icon);
  const [dueDate, setDueDate] = useState(dayjs(dueDate));

  const handleUpdate = (event) => {
    event.preventDefault();

    // Update existing project with modified data
    patchProject(project.id, name, description, icon, dueDate);

    // Close the edit modal
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="edit-project-container">
        <form className="edit-project-form">
          <input
            className="text-field name"
            type="text"
            placeholder="Nombre del proyecto"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <textarea
            rows={10}
            className="text-field desc"
            type="text"
            placeholder="Descripcion del proyecto"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <div className="date-picker-container">
            <p>fecha de finalizacion:</p>
            <DatePicker value={dueDate} onChange={(date) => setDueDate(date)}/>
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
            <button className="edit-project-save" onClick={handleUpdate}>
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




