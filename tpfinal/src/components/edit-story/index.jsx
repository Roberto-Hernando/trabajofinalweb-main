import React, { useState, useEffect } from "react";
import "./index.scss";
import { getStoryById, updateStory } from "@/utils/storyManager";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function EditStory({ storyId, onClose, onUpdate }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [storyData, setStoryData] = useState({
    name: "",
    description: "",
    icon: "",
    epicId: 0,
    ownerId: 0,
    state: "todo",
    points: 5,
    assignedTo: 0,
    dueDate: dayjs(Date.now()),
  });

  useEffect(() => {
    (async () => {
      const story = await getStoryById(storyId);
      setStoryData({
        ...storyData,
        ...story,
        dueDate: dayjs(story.dueDate),
      });
      setIsDataLoaded(true);
    })();
  }, []);

  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="edit-story-container">
      <form className="story-form">
          <input
            className="text-field name"
            type="text"
            placeholder="Nombre de la historia"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <textarea
            rows={10}
            className="text-field desc"
            type="text"
            placeholder="Descripcion de la historia"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <div className="date-picker-container">
            <DatePicker label="fecha de entrega" value={dueDate} onChange={(date) => setDueDate(date)}/>
            <div className="points-container">
              <label>Story Points</label>
              <input
                type="number"
                min="1" max="10"
                placeholder="entre 1 y 10"
                onChange={(event) => setPoints(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="select-container">
            <label className="select-label">Selecciona un estado</label>
            <select
              name="state"
              id="state"
              className="state"
              onChange={(event) => setState(event.target.value)}
            >
              <option value="todo">todo</option>
              <option value="running">running</option>
              <option value="done">done</option>
            </select>
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

          <button 
            className="edit-story-submit"
            onClick={(event) => updateStory(event)}
          >Update</button>
        </form>
      </div>
    </LocalizationProvider>
  );
}

export default EditStory;