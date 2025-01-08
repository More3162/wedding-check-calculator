import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [relationship, setRelationship] = useState("");
  const [weddingType, setWeddingType] = useState("");
  const [season, setSeason] = useState("");
  const [giftAmount, setGiftAmount] = useState(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    "#FFFAE3", // Summer
    "#E3F2FF", // Winter
    "#FFEDE1", // Fall
    "#E8FFE3", // Spring
  ];

  useEffect(() => {
    const updateBackground = () => {
      document.body.style.backgroundColor = backgrounds[backgroundIndex];
    };

    updateBackground();

    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundIndex, backgrounds]);

  const calculateGift = () => {
    let baseAmount = 0;

    // amount based on relationship
    switch (relationship) {
      case "family-close":
        baseAmount = 500;
        break;
      case "family-distant":
        baseAmount = 300;
        break;
      case "close-friend":
        baseAmount = 400;
        break;
      case "friend-like-sibling":
        baseAmount = 450;
        break;
      case "coworker":
        baseAmount = 250;
        break;
      case "bad-relationship":
        baseAmount = 150;
        break;
      default:
        baseAmount = 0;
    }

    // wedding type
    switch (weddingType) {
      case "friday-noon":
        baseAmount *= 1;
        break;
      case "midweek":
        baseAmount *= 0.8;
        break;
      case "thursday-evening":
        baseAmount *= 1.2;
        break;
      default:
        baseAmount *= 1;
    }

    // season
    switch (season) {
      case "summer":
        baseAmount *= 1.1;
        break;
      case "winter":
        baseAmount *= 0.9;
        break;
      case "fall":
        baseAmount *= 1;
        break;
      case "spring":
        baseAmount *= 1.05;
        break;
      default:
        baseAmount *= 1;
    }

    setGiftAmount(Math.round(baseAmount));
  };

  return (
    <div className="App">
      <h1>Wedding Gift Calculator 🎉</h1>
      <div className="form-group">
        <label>👫 Relationship:</label>
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option value="">Select</option>
          <option value="family-close">Family (Close) 👨‍👩‍👧‍👦</option>
          <option value="family-distant">Family (Distant) 🧑‍🤝‍🧑</option>
          <option value="close-friend">Close Friend 🤝</option>
          <option value="friend-like-sibling">Friend (Like Sibling) 👫</option>
          <option value="coworker">Coworker 💼</option>
          <option value="bad-relationship">Bad Relationship 💔</option>
        </select>
      </div>

      <div className="form-group">
        <label>💍 Wedding Type:</label>
        <select
          value={weddingType}
          onChange={(e) => setWeddingType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="friday-noon">Friday Noon 🌞</option>
          <option value="midweek">Midweek 📅</option>
          <option value="thursday-evening">Thursday Evening 🌜</option>
        </select>
      </div>

      <div className="form-group">
        <label>🌸 Season:</label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          <option value="">Select</option>
          <option value="summer">Summer 🌞</option>
          <option value="winter">Winter ❄️</option>
          <option value="fall">Fall 🍂</option>
          <option value="spring">Spring 🌸</option>
        </select>
      </div>

      <button onClick={calculateGift} className="calculate-btn">
        💡 Calculate Gift
      </button>

      {giftAmount !== null && (
        <div className="result">
          <h2>🎉 Recommended Gift Amount:</h2>
          <p>{giftAmount} ₪</p>
        </div>
      )}
    </div>
  );
};

export default App;
