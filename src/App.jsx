import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './Chatbot';
import ChatbotTwo from './Chatbottwo';
import ChatbotThree from './ChatbotThree';
import ChatbotFour from './ChatbotFour';
import Chatbotdq from './Chatbotdq';
import Chatbotdq2 from './Chatbotdq2';
import Home from './Home';
import FastChat from './FastChat';
import Raghib from './Raghib';
import QuestionLanding from './QuestionLanding';
import Chatbotdq2fast from './Chatbotdq2Fast';

const App = () => {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        {/* <Route path="/engsf1" element={<Chatbotdq />} /> */}
        <Route path="/engsfdq" element={<Chatbotdq2 />} />
        <Route path="/check" element={<Chatbotdq2fast />} />
        <Route path="/questions" element={<QuestionLanding />} />
        {/* <Route path="/engsf2200" element={<ChatbotTwo />} />
        <Route path="/engsf1dup" element={<Chatbotdq2 />} />
        <Route path="/engsffast" element={<FastChat />} />
        <Route path="/engsf2200dup" element={<ChatbotFour />} />
          <Route path="/engimg" element={<Raghib />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
