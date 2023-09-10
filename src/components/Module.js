import { useState } from "react";
import { RiDeleteBin4Line, RiEditBoxLine, RiSaveFill } from "react-icons/ri";
import "animate.css";

const NotesArray = [];

const NoteDiv = (props) => {
  const [view, setView] = useState("");
  const [save, setSave] = useState({
    gtitle: "",
    gnotes: "",
  });

  const [txt, setTxt] = useState({
    gtitle: props.title,
    gnotes: props.notes,
  });

  const onchangeNotes = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setTxt({
      ...txt,
      [name]: value,
    });
    setSave({
      ...save,
      [name]: value,
    });
  };

  const saveNotesToarray = () => {
    NotesArray.filter((elem) => {
      if (elem.id == props.index) {
        elem.title = save.gtitle;
        elem.notes = save.gnotes;
      }
    });
  };

  const viewMode = () => {
    if (view == "") {
      setView("openView");
    } else {
      setView("");
    }
  };

  return (
    <div
      className={
        view +
        " animate__animated animate__" +
        (view === "openView" ? "zoomIn" : "fadeIn")
      }
    >
      <RiSaveFill
        className="saveNotes"
        style={{ display: view == "openView" ? "block" : "none" }}
        onClick={saveNotesToarray}
      />

      <input
        type="text"
        value={txt.gtitle}
        spellCheck="false"
        onChange={onchangeNotes}
        name="gtitle"
        placeholder="Title.."
        style={{ pointerEvents: view == "openView" ? "" : "none" }}
      />
      <textarea
        value={txt.gnotes}
        spellCheck="false"
        onChange={onchangeNotes}
        name="gnotes"
        placeholder="Notes.."
        style={{ pointerEvents: view == "openView" ? "" : "none" }}
      ></textarea>
      <span>
        <RiDeleteBin4Line
          onClick={props.deleteFunc}
          style={{ display: view == "openView" ? "none" : "block" }}
        />
        <RiEditBoxLine
          onClick={viewMode}
          className={view == "openView" ? "minimize" : ""}
        />
      </span>
    </div>
  );
};

export default NoteDiv;
export { NotesArray };
