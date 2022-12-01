import '../styles/RandoForm.css';
import ruxxtin from '../assets/ruxxtin.gif';
import log, { debug } from 'loglevel';
import { useState } from 'react';
import * as utilMethods from '../utils/SeedGenerator'
import * as constantMethods from '../config/rando-config';

function RandoForm() {
    const [useLogicEngine, isUseLogicEngine] = useState(false);
    const [fileSlot, setFileSlot] = useState(1);
    const [difficulty, setDifficulty] = useState("Basic")
    // const [seed, setSeed] = useState({seedNum: 0, isLogicalSeed: false, difficulty:""});
    const [seedNumInput, setSeedNumInput] = useState('');
    const [mappingsStr, setMappingsStr] = useState('');
    const [genLog, setGenLog] = useState("");

    const onEnterSettingsData = (event) =>{
        event.preventDefault();
        event.stopPropagation();

        let seedNum = document.getElementById("seedNum").value;

        //set seed info
        if(seedNum === '')
        {
          seedNum = utilMethods.GenerateSeed();
          setSeedNumInput(seedNum);
        }  

        let seed = utilMethods.parseSeed(seedNum, useLogicEngine, difficulty);
        
        try
        {
        //generate seed mappings
        let mappings = utilMethods.GenerateRandomizedMappings(seed);
        setMappingsStr(utilMethods.prepareMappingString(seed, mappings));
    
        //log
        setGenLog(
            "Seed info = " + "Seed num:'" + seed.seedNum + "' Is Logical: '" + seed.isLogicalSeed + "' Difficulty: '" + seed.difficulty + "'" + "\n"
            + "\nSettings:\n"
            + "Use Logic Engine = " + useLogicEngine + "\n"
            + "Fileslot = " + fileSlot + "\n"
            + "Difficulty = " + difficulty + "\n");
        }
        catch(err)
        {
        //We would expect this if the mappings attempted were not logically completable.
        setGenLog(`Seed generation failed. Reason: ${err.message}`);
        throw err;
        }
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

    const generateSpoilerLog = () => {
      //Generate mappings based on the provided seed number
      let mappings = utilMethods.GenerateRandomizedMappings(utilMethods.parseSeed(seedNumInput, useLogicEngine, difficulty));
      
      //We'll want to generate the spoiler log for whatever seed number is provided.
      let spoilerLog = `SPOILER LOG FOR SEED ${seedNumInput}:\n`;

      mappings.forEach((item, location) => {
        spoilerLog += `Location '${location.prettyLocationName}' contains Item '${item}'\n`;
      });

      setGenLog(spoilerLog);
    }
    
    const clearSeed = () => {
      //get a reference to the seed number field
      setSeedNumInput('');
      document.getElementById('seedNum').value = seedNumInput;
      setMappingsStr('');
      setGenLog('');
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
              <input type="number" id="seedNum" name="seedNum" min="0" value={seedNumInput} onInput={()=>{setSeedNumInput(document.getElementById('seedNum').value)}}/>
            </label>
            <button type='button' id='clearBtn' onClick={clearSeed} disabled={!seedNumInput}>Clear</button>
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
          <br/>
          <button type='button' id='spoilerBtn' onClick={generateSpoilerLog} disabled={!seedNumInput}>Spoiler Log</button>
        </div>
        <textarea className='logbox' disabled value={genLog}/><br/>
        <a rel='noreferrer' target='_blank' href='https://github.com/minous27/TheMessengerRandoGenSite/wiki'>Help</a><br/>
        <img className='ruxxtin-gif' alt='ruxxtin gif' src={ruxxtin}/><br/>
        {/* In case I still feel like showing a version number on the site.
         Version {process.env.REACT_APP_VERSION} 
         */}
      </form>
    );
}

export default RandoForm;