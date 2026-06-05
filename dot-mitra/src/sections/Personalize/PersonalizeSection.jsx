import { useState, useEffect } from 'react';
import { Palette, Settings, FileText, Send, Check, Shield } from 'lucide-react';
import SectionWrapper from '../../components/ui/SectionWrapper';
import SectionHeader from '../../components/ui/SectionHeader';

import telecomImg from '../../assets/telecom robot.png';
import defenceImg from '../../assets/defence robot.png';
import educationImg from '../../assets/education robot.png';
import railwayImg from '../../assets/transport robot.png';
import healthcareImg from '../../assets/healthcare robot.png';
import municipalImg from '../../assets/smart city robot.png';
import enterpriseImg from '../../assets/enterprise robot.png';

import './PersonalizeSection.css';

const assistantsData = [
  {
    id: 'telecom',
    name: 'Telecom Assistant',
    description: 'Your AI assistant for telecom policies, regulations, notifications and citizen services.',
    image: telecomImg,
    defaultColor: '#5b67f7',
    greeting: 'Hello! How can I help you with telecom policies today?',
    userQuery: 'I need information about telecom policies',
    botResponse: 'I can help you with that! Which specific policy or regulation are you interested in?'
  },
  {
    id: 'defence',
    name: 'Defence Assistant',
    description: 'Secure AI support for security protocols, strategic reporting, and emergency coordination.',
    image: defenceImg,
    defaultColor: '#34873c',
    greeting: 'Security clearance verified. How can I assist you with operational guidelines today?',
    userQuery: 'Access safety protocol handbook',
    botResponse: 'Safety protocol handbook loaded. Please specify the section or level of clearance required.'
  },
  {
    id: 'education',
    name: 'Education Assistant',
    description: 'Personalized guidance for student enrollment, curriculum development, and learning materials.',
    image: educationImg,
    defaultColor: '#d4a317',
    greeting: 'Welcome! Let\'s make learning simple. What curriculum details do you need?',
    userQuery: 'Show me the skill development courses',
    botResponse: 'I have found 5 courses in Digital Marketing and Web Development starting this week.'
  },
  {
    id: 'transport',
    name: 'Transport Assistant',
    description: 'Real-time transit information, ticketing systems routing, and municipal traffic reports.',
    image: railwayImg,
    defaultColor: '#2a5d91',
    greeting: 'Hi there! Ready to plan your route. Where are you heading to?',
    userQuery: 'Check train schedules from Central Station',
    botResponse: 'The next express train leaves from Platform 3 in approximately 8 minutes.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare Assistant',
    description: 'AI-guided public welfare initiatives, health advisory resources, and clinical queue management.',
    image: healthcareImg,
    defaultColor: '#e53e3e',
    greeting: 'Hello! I\'m here to provide public health resources and general medical advice.',
    userQuery: 'Where is the nearest primary care center?',
    botResponse: 'The nearest facility is Metro Clinic, located 1.2 miles away. Open until 8:00 PM.'
  },
  {
    id: 'smartcity',
    name: 'Smart City Assistant',
    description: 'Automated civic complaints lodging, utility billing support, and green city info.',
    image: municipalImg,
    defaultColor: '#805ad5',
    greeting: 'City services center online. How can I help resolve your municipal requests?',
    userQuery: 'Report street light issue on Maple Avenue',
    botResponse: 'Complaint recorded successfully. A maintenance ticket (#89201) has been created.'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Assistant',
    description: 'Boost company workflows with document search, employee onboarding, and internal FAQs.',
    image: enterpriseImg,
    defaultColor: '#d69e2e',
    greeting: 'Enterprise database connected. What business records would you like to query?',
    userQuery: 'Find onboarding materials for new hires',
    botResponse: 'I have fetched the 2026 Onboarding Guide and the Employee Policy handbook.'
  }
];

const colorPresets = [
  '#5b67f7', // Blue
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#ef4444', // Red
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#1f2937'  // Charcoal
];

export default function PersonalizeSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentAssistant = assistantsData[selectedIdx];

  // Customizable states
  const [brandColor, setBrandColor] = useState(currentAssistant.defaultColor);
  const [botName, setBotName] = useState(currentAssistant.name);
  const [greeting, setGreeting] = useState(currentAssistant.greeting);
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState('branding');

  // Synchronize when active assistant changes
  useEffect(() => {
    setBrandColor(currentAssistant.defaultColor);
    setBotName(currentAssistant.name);
    setGreeting(currentAssistant.greeting);
  }, [selectedIdx, currentAssistant]);

  return (
    <SectionWrapper id="personalize" className="section--light personalize__wrapper">
      <div className="container">
        {/* Header */}
        <div className="personalize__header-container">
          <div className="personalize__badge">Customize Your AI Assistant</div>
          <SectionHeader
            title="Personalise Every Assistant"
            highlightWord="Assistant"
            subtitle="Create department specific AI assistants with custom avatars, branding, and experiences tailored to your organization"
            alignment="center"
          />
        </div>

        {/* Builder Workspace Card */}
        <div className="personalize__workspace">
          
          {/* LEFT: Preview Panel */}
          <div className="personalize__panel-left">
            <div className="personalize__avatar-container">
              <div className="personalize__avatar-pedestal"></div>
              <img 
                src={currentAssistant.image} 
                alt={botName} 
                className="personalize__avatar-img"
              />
            </div>
            <h3 className="personalize__left-title">{botName}</h3>
            <p className="personalize__left-desc">{currentAssistant.description}</p>
          </div>

          {/* CENTER: Chat Widget Mockup */}
          <div className="personalize__panel-center">
            <div className="personalize__chat-widget">
              {/* Header */}
              <div 
                className="personalize__chat-header" 
                style={{ backgroundColor: brandColor }}
              >
                <div className="personalize__chat-header-info">
                  {showLogo && (
                    <div className="personalize__chat-logo">
                      <Shield size={16} color="#fff" />
                    </div>
                  )}
                  <div>
                    <div className="personalize__chat-name">{botName}</div>
                    <div className="personalize__chat-status">
                      <span className="personalize__chat-status-dot"></span>
                      Online
                    </div>
                  </div>
                </div>
                <button className="personalize__chat-close">×</button>
              </div>

              {/* Chat Messages */}
              <div className="personalize__chat-body">
                {/* Greeting */}
                <div className="personalize__chat-msg-row bot">
                  <div className="personalize__chat-bubble">
                    {greeting}
                  </div>
                </div>

                {/* User Query */}
                <div className="personalize__chat-msg-row user">
                  <div 
                    className="personalize__chat-bubble"
                    style={{ backgroundColor: brandColor, color: '#fff' }}
                  >
                    {currentAssistant.userQuery}
                  </div>
                </div>

                {/* Bot Response */}
                <div className="personalize__chat-msg-row bot">
                  <div className="personalize__chat-bubble">
                    {currentAssistant.botResponse}
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="personalize__chat-input">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  disabled
                />
                <button 
                  className="personalize__chat-send"
                  style={{ backgroundColor: brandColor }}
                >
                  <Send size={14} color="#fff" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Customizer Panel */}
          <div className="personalize__panel-right">
            <h3 className="personalize__right-title">Customization</h3>

            {/* Customization Tabs */}
            <div className="personalize__tabs">
              <button 
                className={`personalize__tab-btn ${activeTab === 'branding' ? 'active' : ''}`}
                onClick={() => setActiveTab('branding')}
              >
                <Palette size={16} />
                Branding
              </button>
              <button 
                className={`personalize__tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={16} />
                Chat Settings
              </button>
              <button 
                className={`personalize__tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                <FileText size={16} />
                Content
              </button>
            </div>

            {/* Tab Panels */}
            <div className="personalize__tab-content">
              {activeTab === 'branding' && (
                <div className="personalize__control-group animate-fade-in">
                  <label className="personalize__control-label">Brand Color</label>
                  <div className="personalize__color-input-row">
                    <div 
                      className="personalize__color-preview-box"
                      style={{ backgroundColor: brandColor }}
                    />
                    <input 
                      type="text" 
                      value={brandColor} 
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="personalize__text-input"
                      placeholder="#5b67f7"
                    />
                  </div>

                  <label className="personalize__control-label" style={{ marginTop: '20px' }}>Color Presets</label>
                  <div className="personalize__presets-grid">
                    {colorPresets.map((color) => (
                      <button
                        key={color}
                        className={`personalize__preset-btn ${brandColor.toLowerCase() === color.toLowerCase() ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBrandColor(color)}
                      >
                        {brandColor.toLowerCase() === color.toLowerCase() && <Check size={14} color="#fff" />}
                      </button>
                    ))}
                  </div>

                  <div className="personalize__toggle-row">
                    <div>
                      <div className="personalize__toggle-title">Show Company Logo</div>
                      <div className="personalize__toggle-desc">Display logo in chat header</div>
                    </div>
                    <label className="personalize__switch">
                      <input 
                        type="checkbox" 
                        checked={showLogo}
                        onChange={(e) => setShowLogo(e.target.checked)}
                      />
                      <span className="personalize__slider"></span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="personalize__control-group animate-fade-in">
                  <label className="personalize__control-label">Assistant Name</label>
                  <input 
                    type="text" 
                    value={botName} 
                    onChange={(e) => setBotName(e.target.value)}
                    className="personalize__text-input"
                  />

                  <label className="personalize__control-label" style={{ marginTop: '20px' }}>Greeting Message</label>
                  <textarea 
                    value={greeting} 
                    onChange={(e) => setGreeting(e.target.value)}
                    className="personalize__textarea"
                    rows={4}
                  />
                </div>
              )}

              {activeTab === 'content' && (
                <div className="personalize__control-group animate-fade-in">
                  <label className="personalize__control-label">Knowledge Base Source</label>
                  <select className="personalize__select-input">
                    <option>Telecom Policies PDF (14.2 MB)</option>
                    <option>Defence Guidelines Handbook</option>
                    <option>Skill Development FAQ</option>
                    <option>Smart City Civic Database</option>
                  </select>

                  <div className="personalize__info-box" style={{ marginTop: '20px' }}>
                    <div className="personalize__info-title">Contextual Training</div>
                    <p className="personalize__info-text">
                      Dot Mitra parses official documents to answer queries using standard RAG architectures. Custom rules prevent hallucinated responses.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM: Assistant Selector */}
        <div className="personalize__selector-grid">
          {assistantsData.map((asst, idx) => {
            const isActive = idx === selectedIdx;
            return (
              <button
                key={asst.id}
                className={`personalize__selector-card ${isActive ? 'active' : ''}`}
                style={isActive ? { borderColor: brandColor, boxShadow: `0 0 12px ${brandColor}33` } : {}}
                onClick={() => setSelectedIdx(idx)}
              >
                <div className="personalize__selector-img-container">
                  <img src={asst.image} alt={asst.name} className="personalize__selector-img" />
                </div>
                <span className="personalize__selector-name" style={isActive ? { color: brandColor } : {}}>
                  {asst.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
