import './App.css';
import background from './assets/PHEMORE.jpg'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Messenger Randomizer Seed Generator</h1>
        <h1>SEED ME PHEMORE</h1>
        <img src={background}/>
      </header>
      <div className='settings'>
        <div className='logic-checkbox-section'>
          <label>
          <input type="checkbox"/>
          Use Logic Engine
          </label>
        </div>
        <div className='file-slot-section'>
          <h3 className='section-title'>File Slot</h3>
          <div className='file-slot-selection'>
            <input type="radio" className='file-slot-setting' name='file-slot' value='1' checked/>
            <label>1</label>
            <br/><input type="radio" className='file-slot-setting' name='file-slot' value='1'/>
            <label>2</label>
            <br/><input type="radio" className='file-slot-setting' name='file-slot' value='1'/>
            <label>3</label>
          </div>
        </div>
        <div className='difficulty-section'>
          <h3 className='section-title'>Difficulty</h3>
          <input type="radio" className='difficulty-setting' name='difficulty' value="basic" checked/>
          <label>Basic Settings</label><br/>
          <input type="radio" className='difficulty-setting' name='difficulty' value="advanced"/>
          <label>Advanced Settings</label>
        </div>
      </div>
      <div>
        <button type='button'>Generate</button>
      </div>
      <div>
        <textarea>Sup</textarea>
      </div>
    </div>
  );
}


export default App;
