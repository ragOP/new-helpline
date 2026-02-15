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
import CallLanding from './CallLanding';
import CTALanding from './CTALanding';
import CompareLanding from './CompareLanding';
import StoryLanding from './StoryLanding';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import BenefitsExplorer from './BenefitsExplorer';
import TikTokLanding from './TikTokLanding';
import SplitCompare from './SplitCompare';
import MobileLanding from './MobileLanding';

const App = () => {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        {/* <Route path="/engsf1" element={<Chatbotdq />} /> */}
        <Route path="/engsfdq" element={<Chatbotdq2 />} />
        <Route path="/check" element={<Chatbotdq2fast />} />
        <Route path="/questions" element={<QuestionLanding />} />
        <Route path="/call" element={<CallLanding />} />
        <Route path="/cta" element={<CTALanding />} />
        <Route path="/compare" element={<CompareLanding />} />
        <Route path="/story" element={<StoryLanding />} />
        <Route path="/explorer" element={<BenefitsExplorer />} />
        <Route path="/tiktok" element={<TikTokLanding />} />
        <Route path="/split" element={<SplitCompare />} />
        <Route path="/mobile" element={<MobileLanding />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
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
