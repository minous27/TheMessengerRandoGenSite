import '../styles/RandoForm.css';
import ruxxtin from '../assets/ruxxtin.gif';
import log from 'loglevel';
import { useState } from 'react';
import * as utilMethods from '../utils/SeedGenerator'
import * as constantMethods from '../config/rando-config';

function RandoForm() {
    const [useLogicEngine, isUseLogicEngine] = useState(false);
    const [fileSlot, setFileSlot] = useState(1);
    const [difficulty, setDifficulty] = useState("Basic")
    const [seed, setSeed] = useState({seedNum: 0, isLogicalSeed: false, difficulty:""});
    const [mappingsStr, setMappingsStr] = useState();
    const [genLog, setGenLog] = useState("");
    

    const onEnterSettingsData = (event) =>{
        
        event.preventDefault();
        event.stopPropagation();

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
        setGenLog(
            "Seed info = " + "Seed num:'" + seed.seedNum + "' Is Logical: '" + seed.isLogicalSeed + "' Difficulty: '" + seed.difficulty + "'" + "\n"
            + "\nSettings:\n"
            + "Use Logic Engine = " + useLogicEngine + "\n"
            + "Fileslot = " + fileSlot + "\n"
            + "Difficulty = " + difficulty + "\n");
            //+ "Location = " + locationsStr + "\n"
            //+ "Mappings = " + mappingStr + "\n");
        }
        catch(err)
        {
        //We would expect this if the mappings attempted were not logically completable.
        setGenLog(`Seed generation failed. Reason: ${err.message}`);
        mappingStr = null;
        }
    }

    const prepareMappingString = (mappings) =>{
        //Get the mappings turned into a single string that is ready to be encrypted and given to the user.
        
        //mappings
        let mappingsStr = "mappings=";

        for(const [location, item] of mappings)
        {
        mappingsStr += `${location.locationName}~${item},`;
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
        log.debug(`Mapping prep completed. String prepped for file: '${mappingsStr}'`);

        setMappingsStr(mappingsStr);
    }
    
    const generateRandoFile = () =>{
        log.debug("Beginning rando file creation.");
        //Will do the work to create the file and download it on client machine.
        let encodedMappingsStr = btoa(mappingsStr); //DEPRECATED - may have to do this differently if moved to server
        log.debug(`Encoded mappings string: '${encodedMappingsStr}'`);
        
        //Begin download
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodedMappingsStr);
        element.setAttribute('download', `MessengerRandomizerMapping_${fileSlot}.txt`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return(
        <form onSubmit={onEnterSettingsData}>
        <div className='settings'>
          <div className='logic-checkbox-section'>
            <label>
              <input type="checkbox" onClick={(selection) => {isUseLogicEngine(selection.target.checked)}}/>
              Use Logic Engine
            </label>
            <br/>
            <label>
                Seed (optional)
                <br/>
              <input type="number" id="seedNum" name="seedNum" min="0"/>
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
          <button type='submit'>Generate</button>
          <button type='button' id='downloadBtn' onClick={generateRandoFile} disabled={mappingsStr ? false : true}>Download</button>
        </div>
        <textarea className='logbox' disabled value={genLog}/><br/>
        <a rel='noreferrer' target='_blank' href='https://github.com/minous27/TheMessengerRandoGenSite/wiki'>Help</a><br/>
        <img className='ruxxtin-gif' alt='ruxxtin gif' src={ruxxtin}/>
      </form>
    );
}

export default RandoForm;