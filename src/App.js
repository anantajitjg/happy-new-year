import React, { useState, useEffect } from 'react';
import party from 'party-js';
import iconIdle from './assets/icon-idle.gif';
import iconPopped from './assets/icon-popped.png';
import poppingAudio from './assets/party-popper.mp3';
import applauseAudio from './assets/applause.mp3';
import googleLogo from './assets/google.svg';
import './App.css';

function App() {
  const [popping, setPopping] = useState(false);
  const [textActive, setTextActive] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      partyPopper();
      setTimeout(() => {
        setTextActive(true);
      }, 1000);
    });
  });

  const partyPopper = (e) => {
    let source = new party.Rect(100, 0, 1000, 100);
    if (typeof e !== 'undefined') {
      source = new party.Circle(e.clientX, e.clientY, 1000);
    }
    party.confetti(source, {
      color: [ party.Color.fromHex("#28a233"), party.Color.fromHex("#eb4534"), party.Color.fromHex("#4386f0"), party.Color.fromHex("#fbad04") ],
      count: party.variation.range(20, 5000),
      gravity: 100,
      shapes: ["square", "rectangle"],
      size: party.variation.range(1, 2)
    });
  };

  const clickHandler = (e) => {
    if (! popping) {
      setPopping(true);
      setTextActive(false);
      e.target.src = iconPopped;
      new Audio(poppingAudio).play();
      partyPopper(e);
      setTimeout(() => {
        new Audio(applauseAudio).play();
        party.sparkles(document.querySelector('.main-text-wrapper'), {
          count: party.variation.range(20, 100),
          size: party.variation.range(1, 4)
        });
      }, 1000);
      setTimeout(() => {
        setPopping(false);
        setTextActive(true);
        e.target.src = iconIdle;
      }, 2000);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-text-wrapper">
          <div className="main-text">Happy New Year</div>
          <div className={textActive ? 'reveal-text active' : 'reveal-text'}>2022</div>
        </div>
        <img src={iconIdle} className="App-logo" alt="logo" onClick={clickHandler} />
        <div className="credits-text-wrapper">
          <p>Credits <a href="https://www.google.com/search?q=New+Year%27s+Eve" target="_blank" rel="noreferrer"><img src={googleLogo} alt="Google" /></a></p>
        </div>
      </header>
    </div>
  );
}

export default App;
