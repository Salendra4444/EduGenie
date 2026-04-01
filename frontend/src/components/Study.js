import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function Study() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    // Preload voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getLanguageCode = (langName) => {
    const map = {
      'English': 'en-US',
      'Spanish': 'es-ES',
      'French': 'fr-FR',
      'German': 'de-DE',
      'Hindi': 'hi-IN',
      'Chinese': 'zh-CN',
      'Japanese': 'ja-JP',
      'Korean': 'ko-KR'
    };
    return map[langName] || 'en-US';
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        window.speechSynthesis.cancel(); // Clear queue
        const utterance = new SpeechSynthesisUtterance(summary);

        const langCode = getLanguageCode(language);
        utterance.lang = langCode;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;
        
        // Voice selection based on target language
        if (language === 'English') {
          selectedVoice = voices.find(v => v.name === "Microsoft Heera - English (India)")
            || voices.find(v => v.name === "Microsoft Ravi - English (India)")
            || voices.find(v => v.name.includes("Google") && v.lang.startsWith("en"));
        } else if (language === 'Hindi') {
          selectedVoice = voices.find(v => v.name.includes("Swara") || v.name.includes("Madhur"))
            || voices.find(v => v.lang.includes("hi-IN") || v.lang.includes("hi"));
        }
        
        // Generic fallback to match the language code
        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.lang === langCode) 
              || voices.find(v => v.lang.startsWith(langCode.split('-')[0])) 
              || voices[0];
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  const handleCopy = async () => {
    // If the browser does not support the modern clipboard API (e.g., non-HTTPS environment)
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = summary;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
      return;
    }

    // Modern clipboard API usage
    try {
      await navigator.clipboard.writeText(summary);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    // Check file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const extension = selectedFile.name.split('.').pop().toLowerCase();

    if (validTypes.includes(selectedFile.type) || ['pdf', 'docx', 'txt'].includes(extension)) {
      setFile(selectedFile);
    } else {
      setFile(null);
      setError('Please upload a valid PDF, DOCX, or TXT file.');
    }
  };

  const generateSummary = async () => {
    if (!file) return;

    setIsGenerating(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);

      // Sending to backend /upload (Dummy request pending backend implementation)
      /* 
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.summary);
      */

      // Mocking the backend delay and response for frontend testing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSummary(`यह आपके अपलोड किए गए दस्तावेज़ का ${language} में AI द्वारा तैयार किया गया सारांश है। यह मुख्य बिंदुओं, महत्वपूर्ण तर्कों और आवश्यक परिभाषाओं को संक्षेप में प्रस्तुत करता है ताकि आप आसानी से और जल्दी पुनरावृत्ति कर सकें। (नोट: यह केवल एक डेमो टेक्स्ट है, वास्तविक बैकएंड कनेक्शन के बाद असली सारांश दिखेगा!)`);
    } catch (err) {
      setError('An error occurred while communicating with the server.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setSummary('');
    setError('');
  };

  return (
    <div className="bg-[#100f2c] text-white min-h-screen font-sans flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[800px] mx-auto relative z-10">

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Smart Study</span> Assistant
            </h1>
            <p className="text-slate-400 text-lg md:text-xl">Upload your study material and let AI do the heavy lifting.</p>
          </div>

          <div className="bg-[#1c1a4a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-900/20">

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-8 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Upload Area */}
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 ${isDragging ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02]' : 'border-slate-600/50 bg-white/5 hover:border-indigo-500/50 hover:bg-white/10'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl text-indigo-400">📄</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-200">Drag & drop your notes here</h3>
                <p className="text-slate-400 text-sm mb-6 text-center">Supports PDF, DOCX, and TXT files (Max 10MB)</p>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleFileInput}
                />
                <label
                  htmlFor="file-upload"
                  className="bg-slate-700/50 hover:bg-slate-600 text-white px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors border border-white/10"
                >
                  Browse Files
                </label>
              </div>
            ) : (
              /* Selected File View */
              <div className="animate-fade-in-up">
                <div className="bg-white/5 border border-indigo-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-2xl">{file.name.endsWith('.pdf') ? '📕' : file.name.endsWith('.docx') ? '📘' : '📓'}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-200 truncate">{file.name}</p>
                      <p className="text-slate-400 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>

                  <button
                    onClick={clearFile}
                    className="text-slate-400 hover:text-red-400 transition-colors bg-white/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Language Selection */}
                <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <label className="text-slate-300 font-medium whitespace-nowrap text-[15px]">Summary Language:</label>
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="appearance-none bg-[#100f2c] border border-white/20 text-white py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:border-indigo-500 hover:border-indigo-400 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer shadow-lg shadow-black/20"
                    >
                      <option value="English">🇬🇧 English</option>
                      <option value="Spanish">🇪🇸 Spanish</option>
                      <option value="French">🇫🇷 French</option>
                      <option value="German">🇩🇪 German</option>
                      <option value="Hindi">🇮🇳 Hindi</option>
                      <option value="Chinese">🇨🇳 Chinese</option>
                      <option value="Japanese">🇯🇵 Japanese</option>
                      <option value="Korean">🇰🇷 Korean</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={generateSummary}
                    disabled={isGenerating}
                    className={`bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center gap-3 ${isGenerating ? 'opacity-80 cursor-wait' : 'hover:scale-105 hover:shadow-indigo-500/40'}`}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Magic...
                      </>
                    ) : (
                      <>
                        <span>✨</span> Generate Summary
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* AI Summary Result */}
            {summary && (
              <div className="mt-12 pt-10 border-t border-white/10 animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center p-[2px]">
                      <div className="w-full h-full bg-[#1c1a4a] rounded-full flex items-center justify-center">
                        <span className="text-lg">🤖</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100">AI Summary Generated</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSpeak}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-indigo-400 transition-colors border border-white/5"
                      title={isSpeaking ? "Pause Audio" : "Listen to Summary"}
                    >
                      <span className="text-lg leading-none">{isSpeaking ? '⏸️' : '🔊'}</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-indigo-400 transition-colors border border-white/5"
                      title="Copy to Clipboard"
                    >
                      <span className="text-lg leading-none">{isCopied ? '✅' : '📋'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#100f2c]/50 p-6 rounded-2xl border border-indigo-500/20 text-slate-300 leading-relaxed text-[1.05rem]">
                  {summary}
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="bg-white/5 hover:bg-white/10 text-slate-300 px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 transition">
                    📝 Generate Quiz
                  </button>
                  <button className="bg-white/5 hover:bg-white/10 text-slate-300 px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 transition">
                    🗂️ Create Flashcards
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Study;
