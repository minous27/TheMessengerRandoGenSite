import { useState } from 'react';
import './App.css';
import background from './assets/PHEMORE.jpg'
import * as utilMethods from './SeedGenerator'
import {LocationRO} from './RO/LocationRO';
import * as constantMethods from './config/rando-config'


function App() {
  const [useLogicEngine, isUseLogicEngine] = useState(false);
  const [fileSlot, setFileSlot] = useState(1);
  const [difficulty, setDifficulty] = useState("Basic")
  const [seed, setSeed] = useState({seedNum: 0, isLogicalSeed: false, difficulty:""});
  const [mappingsStr, setMappingsStr] = useState();
  const [log, setLog] = useState("");

  let onEnterSettingsData = () =>{
    
    //prep locations string for logging purposes.
    let locationsStr = "";
    let mappingStr = "|";

    let seedNumInput = document.getElementById("seedNum").value;
    
    constantMethods.basicLocations.forEach((currentValue, index, arr) => {
      let locationStr =  currentValue.ToString();
      locationsStr = locationsStr + locationStr + "\n";
    });

    //set seed info
    if(seedNumInput === '')
    {
      seed.seedNum = utilMethods.GenerateSeed();
    }
    else
    {
      seed.seedNum = seedNumInput;
    }
    
    seed.isLogicalSeed = useLogicEngine;
    seed.difficulty = difficulty;
    try
    {
      //generate seed mappings
      let mappings = utilMethods.GenerateRandomizedMappings(seed);
      prepareMappingString(mappings);

      
      

      for (const[location, item] of mappings){
        mappingStr = mappingStr + "Item: '" + item + "' ~ Location: '" + location.prettyLocationName + "'|\n"; 
      }
  
  
      //log
      setLog(
        "Settings:\n"
        + "Use Logic Engine = " + useLogicEngine + "\n"
        + "Fileslot = " + fileSlot + "\n"
        + "Difficulty = " + difficulty + "\n"
        + "Seed info = " + "Seed num:'" + seed.seedNum + "' Is Logical: '" + seed.isLogicalSeed + "' Difficulty: '" + seed.difficulty + "'" + "\n"
        + "Location = " + locationsStr + "\n"
        + "Mappings = " + mappingStr + "\n");
    }
    catch(err)
    {
      //We would expect this if the mappings attempted were not logically completable.
      setLog(`Seed generation failed. Reason: ${err.message}`);
      mappingStr = null;
    }
  }

  const prepareMappingString = (mappings) =>{
    //Get the mappings turned into a single string that is ready to be encrypted and given to the user.
    
    //mappings
    let mappingsStr = "mappings=";

    for(const [location, item] of mappings)
    {
      mappingsStr += `${location.locationName}-${item},`;
    }
    //Tear off the last comma
    mappingsStr = mappingsStr.slice(0, -1);

    //Difficulty
    mappingsStr += `|Difficulty=${seed.difficulty}`;

    //seed type
    mappingsStr += `|seedtype=${seed.isLogicalSeed ? "Logic" : "No_Logic"}`;

    //Seed number
    mappingsStr += `|seednum=${seed.seedNum}`;

    //log
    console.log(`Mapping prep completed. String prepped for file: '${mappingsStr}'`);

    setMappingsStr(mappingsStr);
  }
  
  const generateRandoFile = () =>{
    console.log("Beginning rando file creation.");
    //Will do the work to create the file and download it on client machine.
    
    //DEPRECATED - may have to do this differently if moved to server
    let encodedMappingsStr = btoa(mappingsStr);
    console.log(`Encoded mappings string: '${encodedMappingsStr}'`);
    
    //Begin download
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodedMappingsStr);
    element.setAttribute('download', `MessengerRandomizerMapping_${fileSlot}.txt`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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
            <br/>
            <label>
              <input type="number" id="seedNum" name="seedNum" min="0"/>
              Seed (optional)
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
            <input type="radio" className='difficulty-setting' name='difficulty' value="Basic" onClick={(selection) => {setDifficulty(selection.target.value)}} defaultChecked/>
            <label>Basic Settings</label><br/>
            <input type="radio" className='difficulty-setting' name='difficulty' value="Advanced" onClick={(selection) => {setDifficulty(selection.target.value)}}/>
            <label>Advanced Settings</label>
          </div>
        </div>
        <div>
          <button type='button' onClick={onEnterSettingsData}>Generate</button>
          <button type='button' id='downloadBtn' onClick={generateRandoFile} disabled={mappingsStr ? false : true}>Download</button>
        </div>
        <div>
          <textarea className='logbox' disabled value={log}/>
        </div>
      </form>
    </div>
  );
}


export default App;
