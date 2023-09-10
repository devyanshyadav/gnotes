import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import NoteDiv from "./components/Module";
import { NotesArray } from "./components/Module";
import { v4 as uuidv4 } from "uuid";
import "animate.css";

const App = () => {
  const [txtSize, settxtSize] = useState(30);
  const [inputHide, setInputHide] = useState("none");
  const [inputData, setInputData] = useState({
    gtitle: "",
    gnotes: "",
  });
  const [inputArray, setinputArray] = useState([...NotesArray]);
  const setTxtHeight = (event) => {
    if (event.key === "Enter") {
      settxtSize(txtSize + 10);
    }
  };

  const inputTxt = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInputData({
      ...inputData,
      [name]: value,
    });

    setInputHide("none");

    setInputHide("block");
  };

  const addNotes = () => {
    if (inputData.gtitle == "") {
      alert("Enter the title");
    } else {
      const newNote = {
        id: uuidv4(),
        title: inputData.gtitle,
        notes: inputData.gnotes,
      };

      setinputArray([...inputArray, newNote]);
      NotesArray.push(newNote);
    }
    setInputHide("none");

    inputData.gtitle = "";
    inputData.gnotes = "";
  };

  const DeleteDiv = (index) => {
    const deletedNote = inputArray[index];
    const filteredArray = inputArray.filter((elem, i) => elem.id != index);

    setinputArray(filteredArray);
    const filteredNotesArray = NotesArray.filter(
      (note) => note !== deletedNote
    );
    NotesArray.splice(0, NotesArray.length, ...filteredNotesArray);
  };

  const inputMapDiv = inputArray.map((elem, id) => (
    <NoteDiv
      title={elem.title}
      notes={elem.notes}
      index={elem.id}
      key={elem.id}
      deleteFunc={() => DeleteDiv(elem.id)}
      saveNotes={() => setTxtHeight}
    />
  ));

  return (
    <>
      <header>
        <span>
          {" "}
          <img
            className="Logo"
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-keep-icon.png"
          />{" "}
          Keep
        </span>

        <div>
          <img src="https://assets-v2.lottiefiles.com/a/b3202668-1151-11ee-939e-cf25d6aad422/k1qbZAOrp7.gif" />
        </div>
      </header>
      <section className="inputSection">
        <input
          type="text"
          placeholder="Title"
          style={{ display: inputHide }}
          name="gtitle"
          onChange={inputTxt}
          value={inputData.gtitle}
          className="animate__animated animate__flash"
        />
        <textarea
          onKeyPress={setTxtHeight}
          onChange={inputTxt}
          style={{ height: `${txtSize}px` }}
          name="gnotes"
          value={inputData.gnotes}
          placeholder="Take a note..."
        ></textarea>

        <RiAddLine onClick={addNotes} className="my-icon" />
      </section>
      <section className="noteSection">{inputMapDiv}</section>
    </>
  );
};

export default App;
