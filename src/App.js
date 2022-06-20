import { useState } from 'react';
import './App.css';
import background from './assets/PHEMORE.jpg'


function App() {
  const [useLogicEngine, isUseLogicEngine] = useState(false);
  const [fileSlot, setFileSlot] = useState(1);
  const [difficulty, setDifficulty] = useState("basic")
  const [log, setLog] = useState("");


  let onEnterSettingsData = () =>{
    
    setLog(
      "Settings:\n"
      + "Use Logic Engine = " + useLogicEngine + "\n"
      + "Fileslot = " + fileSlot + "\n"
      + "Difficulty = " + difficulty + "\n");
  }

  let generateRandoFile = () =>{
    //Will do the work to create the file and download it on client machine.
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Messenger Randomizer Seed Generator</h1>
        <h1>SEED ME PHEMORE</h1>
        <img src={background}/>
      </header>
      <form>
        <div className='settings'>
          <div className='logic-checkbox-section'>
            <label>
            <input type="checkbox" onClick={(selection) => {isUseLogicEngine(selection.target.checked)}}/>
            Use Logic Engine
            </label>
          </div>
          <div className='file-slot-section'>
            <h3 className='section-title'>File Slot</h3>
            <div className='file-slot-selection'>
              <input type="radio" className='file-slot-setting' name='file-slot' value='1' onClick={(selection) => {setFileSlot(selection.target.value)}} defaultChecked/>
              <label>1</label>
              <br/><input type="radio" className='file-slot-setting' name='file-slot' value='2' onClick={(selection) => {setFileSlot(selection.target.value)}}/>
              <label>2</label>
              <br/><input type="radio" className='file-slot-setting' name='file-slot' value='3' onClick={(selection) => {setFileSlot(selection.target.value)}}/>
              <label>3</label>
            </div>
          </div>
          <div className='difficulty-section'>
            <h3 className='section-title'>Difficulty</h3>
            <input type="radio" className='difficulty-setting' name='difficulty' value="basic" onClick={(selection) => {setDifficulty(selection.target.value)}} defaultChecked/>
            <label>Basic Settings</label><br/>
            <input type="radio" className='difficulty-setting' name='difficulty' value="advanced" onClick={(selection) => {setDifficulty(selection.target.value)}}/>
            <label>Advanced Settings</label>
          </div>
        </div>
        <div>
          <button type='button' onClick={onEnterSettingsData}>Generate</button>
        </div>
        <div>
          <textarea disabled value={log}/>
        </div>
      </form>
    </div>
  );
}


export default App;
