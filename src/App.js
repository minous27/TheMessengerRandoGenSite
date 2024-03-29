import { useState } from 'react';
import './styles/App.css';
import log from 'loglevel'
import EE from './components/EE'
import RandoForm from './components/RandoForm';


function App() {
  
  const [eeClicks, setEEClicks] = useState(0);

  const eeTriggerClick = () => {
    setEEClicks(eeClicks + 1);
    log.debug(`EE Clicks: ${eeClicks}`);
  }
  
  //Set log level
  if(process.env.NODE_ENV !== 'production')
  {
    log.setDefaultLevel(log.levels.DEBUG);
  }
  else
  {
    log.setDefaultLevel(log.levels.INFO);
  }

  return (

    <div className="App">
      <header className="App-header">
        <div>
          <h1 className='header-text'>The Messenger Randomizer Seed Generator</h1>
        </div>
        <span className='ee-trigger-27' onClick={eeTriggerClick}/>
        {eeClicks >= 27&&
          <EE/>
        }
      </header>
      <div className='rando-form'>
        <RandoForm/>
      </div>
    </div>
  );
}

export default App;
