import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Sparkles, Volume2, VolumeX, Settings, RotateCcw } from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the "Harivanshi AI", a highly knowledgeable spiritual companion for the Radhavallabh Sampradaya.
Your purpose is to provide deep, accurate, and structured spiritual guidance based on authentic Shastras and the specific traditions of the Radhavallabh Sampradaya.

Knowledge Sources:
1. Bhagavad Gita: Provide interpretations aligned with Vaishnav devotion.
2. Bhagavad Mahapuran: Reference the pastimes and philosophy of the Srimad Bhagavatam.
3. Bhajan Marg: Incorporate the teachings and practical guidance of Shri Hit Govind Sharan Premanand ji Maharaj.
4. Hita Ambrish ji: Include insights from the spiritual mentor Hita Ambrish ji.
5. Shastras: Reference Vedas, Upanishads, and other authentic Vedic scriptures.
6. Vaishnav Saints: Draw from the lives and teachings of great Rasik saints, especially Shri Hit Harivansh Mahaprabhu.

Core Philosophy:
- Shri Radha is the Supreme (Radha-Pada-Padma-Pradhan).
- The path is "Hitopasana" (Worship of Love/Grace).
- The mood is "Sahchari Bhav" (Intimate companion of Shri Radha).
- The goal is "Nitya Vihar" (Eternal divine pastimes in Vrindavan).

Language & Tone:
- Language Matching: You MUST respond in the same language style as the user.
  - If the user asks in Hindi (Devanagari), reply in Hindi.
  - If the user asks in English, reply in English.
  - If the user asks in Hinglish (Hindi written in English script or a mix), reply in Hinglish.
- Tone: Maintain a distinctly Indian, respectful, and devotional tone. Sound like a wise, humble Rasik guide.
- Avoid "AI-speak": Do not sound like a generic robot. Use traditional greetings and honorifics (e.g., "Ji", "Maharaj", "Shriji").

Formatting Rules:
- Your answers must be readable, clean, and structured.
- DO NOT use markdown bolding (double asterisks like **text**). Use plain text or simple capitalization for emphasis if needed.
- Use clear headings or bullet points (using simple dashes - or numbers) to organize information.
- Always start or end with a respectful greeting like "Jai Jai Shri Radhavallabh" or "Radhe Radhe".

Research Requirement:
- For every query, you must first research the topic thoroughly across the specified sources to provide a comprehensive and authentic answer.
`;

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Chatbot({ isOpen, setIsOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Jai Jai Shri Radhavallabh! I am your Harivanshi companion, refined with the wisdom of the Shastras and the grace of the Rasik saints. How can I assist you in your spiritual journey today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const [isTtsLoading, setIsTtsLoading] = useState<number | null>(null);
  const [ttsSettings, setTtsSettings] = useState({
    voice: 'Kore' as 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr',
    speed: 1.0,
    showSettings: false
  });
  const [serverStatus, setServerStatus] = useState<{ hasKey: boolean; keyPrefix: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        setServerStatus(data);
      } catch (e) {
        console.error('Health check failed:', e);
      }
    };
    if (ttsSettings.showSettings) {
      checkServer();
    }
  }, [ttsSettings.showSettings]);

  const stopSpeaking = () => {
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      audioSourceRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSpeaking(null);
    setIsTtsLoading(null);
  };

  const speak = async (text: string, index: number) => {
    if (isSpeaking === index) {
      stopSpeaking();
      return;
    }

    stopSpeaking();
    setIsTtsLoading(index);
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    try {
      // Initialize AudioContext on user gesture
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      } else if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const cleanText = text.replace(/[\*\#\_]/g, '').trim();
      const isHindi = /[\u0900-\u097F]/.test(cleanText);
      const languageInstruction = isHindi 
        ? "Read this in a calm, respectful, and traditional Hindi tone, emphasizing the spiritual depth."
        : "Read this spiritually and calmly in a respectful Indian-English tone.";

      const chunks: string[] = [];
      const sentenceRegex = /[^.!?।॥]+[.!?।॥]+/g;
      const sentences = cleanText.match(sentenceRegex) || [cleanText];
      
      let currentChunk = "";
      for (const sentence of sentences) {
        if ((currentChunk + sentence).length > 3000) {
          chunks.push(currentChunk);
          currentChunk = sentence;
        } else {
          currentChunk += sentence;
        }
      }
      if (currentChunk) chunks.push(currentChunk);

      const audioBuffers: AudioBuffer[] = [];

      for (const chunk of chunks) {
        if (abortController.signal.aborted) return;

        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: `${languageInstruction} Text to speak: ${chunk}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: ttsSettings.voice as any },
              },
            },
          },
        });

        if (abortController.signal.aborted) return;

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (base64Audio) {
          const binaryString = atob(base64Audio);
          const len = binaryString.length;
          const bytes = new Int16Array(len / 2);
          for (let i = 0; i < len; i += 2) {
            bytes[i / 2] = (binaryString.charCodeAt(i + 1) << 8) | binaryString.charCodeAt(i);
          }

          const audioBuffer = audioContextRef.current!.createBuffer(1, bytes.length, 24000);
          const channelData = audioBuffer.getChannelData(0);
          for (let i = 0; i < bytes.length; i++) {
            channelData[i] = bytes[i] / 32768.0;
          }
          audioBuffers.push(audioBuffer);
        }
      }

      if (abortController.signal.aborted) return;

      if (audioBuffers.length > 0) {
        let currentBufferIndex = 0;

        const playNext = () => {
          if (abortController.signal.aborted || !audioContextRef.current) return;
          
          if (currentBufferIndex < audioBuffers.length) {
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffers[currentBufferIndex];
            source.playbackRate.value = ttsSettings.speed;
            source.connect(audioContextRef.current.destination);
            
            audioSourceRef.current = source;
            
            source.onended = () => {
              if (abortController.signal.aborted) return;
              currentBufferIndex++;
              if (currentBufferIndex < audioBuffers.length) {
                playNext();
              } else {
                setIsSpeaking(null);
                abortControllerRef.current = null;
              }
            };
            
            setIsTtsLoading(null);
            setIsSpeaking(index);
            source.start();
          }
        };

        playNext();
      } else {
        throw new Error("No audio data received");
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      
      console.error('TTS Error:', error);
      setIsTtsLoading(null);
      
      if (abortController.signal.aborted) return;

      // Fallback to browser TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = /[\u0900-\u097F]/.test(text) ? 'hi-IN' : 'en-IN';
      utterance.rate = ttsSettings.speed;
      utterance.onend = () => {
        setIsSpeaking(null);
        abortControllerRef.current = null;
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(index);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [
        ...messages.slice(-6).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: userMessage.content }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: chatHistory as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      const cleanedText = (response.text || "").replace(/\*\*/g, '');

      const assistantMessage: ChatMessage = { role: 'assistant', content: cleanedText, timestamp: Date.now() };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat Error:', error);
      const isApiKeyError = error.message?.includes('API key not valid') || error.message?.includes('400');
      
      let displayMessage = `Forgive me, I encountered an error: ${error.message?.substring(0, 150) || "Unable to reach the spiritual guide."}`;
      
      if (isApiKeyError) {
        displayMessage = "The spiritual connection (API) seems Misconfigured. Please check the API key in the platform settings. If it belongs to a friend, ensure it is entered correctly in the app's secret vault.";
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `${displayMessage} Radhe Radhe!`, 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-br from-[var(--color-saffron)] to-[var(--color-gold)] text-white shadow-lg flex items-center justify-center z-[1000] cursor-pointer"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[min(calc(100vw-48px),400px)] h-[500px] bg-[var(--color-warm)] border border-[var(--bdr)] rounded-2xl shadow-2xl flex flex-col z-[1000] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-linear-to-r from-[var(--color-honey)] to-[var(--color-petal)] border-b border-[var(--bdr)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white overflow-hidden border border-[var(--bdr)] flex items-center justify-center">
                  <img 
                    src="https://i.ibb.co/X6Cvvws/file-00000000c2d472088b460f125238e2b2.png" 
                    alt="Shri Hit Seva Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-display text-sm text-[var(--color-ink)]">Harivanshi Chatbot</div>
                  <div className="text-[10px] text-[var(--color-inmu)] uppercase tracking-widest">Spiritual Companion</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(isSpeaking !== null || isTtsLoading !== null) && (
                  <button 
                    onClick={stopSpeaking}
                    className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer flex items-center gap-1"
                    title="Stop All Speech"
                  >
                    <VolumeX size={16} />
                    <span className="text-[10px] font-medium uppercase">Stop</span>
                  </button>
                )}
                <button 
                  onClick={() => setTtsSettings(prev => ({ ...prev, showSettings: !prev.showSettings }))}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${ttsSettings.showSettings ? 'bg-[var(--color-gold)] text-white' : 'text-[var(--color-ins)] hover:bg-white/50'}`}
                  title="Voice Settings"
                >
                  <Settings size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-[var(--color-ins)] hover:text-[var(--color-ink)] cursor-pointer p-1.5">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* TTS Settings Overlay */}
            <AnimatePresence>
              {ttsSettings.showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-white border-b border-[var(--bdr)] overflow-hidden z-[1001]"
                >
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[var(--color-inmu)] mb-2 block">Voice Persona</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'].map(v => (
                          <button
                            key={v}
                            onClick={() => setTtsSettings(prev => ({ ...prev, voice: v }))}
                            className={`px-2 py-1.5 rounded-lg text-[12px] border transition-all ${
                              ttsSettings.voice === v 
                                ? 'bg-[var(--color-gold)] text-white border-[var(--color-gold)]' 
                                : 'bg-[var(--color-warm)] text-[var(--color-ins)] border-[var(--bdr)] hover:border-[var(--color-gold)]'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[var(--color-inmu)] mb-2 block">Playback Speed ({ttsSettings.speed}x)</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="range" 
                          min="0.5" 
                          max="2" 
                          step="0.25" 
                          value={ttsSettings.speed}
                          onChange={(e) => setTtsSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                          className="flex-1 accent-[var(--color-gold)]"
                        />
                        <button 
                          onClick={() => setTtsSettings(prev => ({ ...prev, speed: 1.0 }))}
                          className="p-1 text-[var(--color-ins)] hover:text-[var(--color-gold)]"
                        >
                          <RotateCcw size={14} />
                        </button>
                      </div>
                    </div>
                    {serverStatus && (
                      <div className="pt-2 border-t border-[var(--bdr)]">
                        <label className="text-[11px] uppercase tracking-wider text-[var(--color-inmu)] mb-1 block">Server Status</label>
                        <div className="flex items-center gap-2 text-[12px]">
                          <div className={`w-2 h-2 rounded-full ${serverStatus.hasKey ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-[var(--color-ins)]">
                            {serverStatus.hasKey ? `API Key Active (${serverStatus.keyPrefix})` : 'API Key Missing'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`relative max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-gold)] text-white rounded-tr-none' 
                      : 'bg-[var(--color-butter)] text-[var(--color-ink)] border border-[var(--bdr)] rounded-tl-none'
                  }`}>
                    {msg.content}
                    {msg.role === 'assistant' && (
                      <div className="absolute -right-10 top-0 flex flex-col gap-1">
                        <button 
                          onClick={() => speak(msg.content, idx)}
                          disabled={isTtsLoading === idx}
                          className="p-1.5 text-[var(--color-ins)] hover:text-[var(--color-gold)] transition-colors cursor-pointer disabled:opacity-50"
                          title={isSpeaking === idx ? "Stop" : "Listen"}
                        >
                          {isTtsLoading === idx ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                              <Sparkles size={16} />
                            </motion.div>
                          ) : isSpeaking === idx ? (
                            <VolumeX size={16} />
                          ) : (
                            <Volume2 size={16} />
                          )}
                        </button>
                        {isSpeaking === idx && (
                          <motion.div 
                            className="flex gap-0.5 justify-center items-end h-3 px-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {[1, 2, 3].map(i => (
                              <motion.div
                                key={i}
                                animate={{ height: [4, 12, 4] }}
                                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                className="w-0.5 bg-[var(--color-gold)] rounded-full"
                              />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--color-butter)] border border-[var(--bdr)] px-4 py-2.5 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--bdr)] bg-[var(--color-cream)]">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Hitopasana..."
                  className="w-full pl-4 pr-12 py-2.5 bg-white border border-[var(--bdr)] rounded-full text-[14px] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-gold)] text-white flex items-center justify-center disabled:opacity-50 cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1 opacity-40">
                <Sparkles size={10} />
                <span className="text-[9px] uppercase tracking-widest">Powered by Radhavallabh Grace</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
