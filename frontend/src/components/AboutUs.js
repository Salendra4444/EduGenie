import React from 'react';
import Header from './Header';
import Footer from './Footer';

function AboutUs() {
  return (
    <div className="bg-[#100f2c] text-white min-h-screen font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1000px] mx-auto relative z-10">
          
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">EduGenie</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-[700px] mx-auto leading-relaxed">
              We are on a mission to revolutionize how students interact with knowledge. Our platform harnesses the power of advanced AI to make learning more efficient, accurate, and deeply personalized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div className="bg-[#1c1a4a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 lg:p-12 shadow-2xl shadow-indigo-900/20 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/30">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed text-[1.05rem]">
                We envision a world where every learner has a 24/7 personal tutor that perfectly understands their study materials. By eliminating the friction of traditional studying, we want to empower students to reach their highest academic potential.
              </p>
            </div>

            <div className="bg-[#1c1a4a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 lg:p-12 shadow-2xl shadow-indigo-900/20 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/30">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">The Technology</h3>
              <p className="text-slate-400 leading-relaxed text-[1.05rem]">
                EduGenie doesn't just pass queries to a generic LLM. We utilize cutting-edge Retrieval-Augmented Generation (RAG) architecture. This means the AI strictly searches your specific uploaded notes to construct contextually flawless, non-hallucinated answers.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-[#0b0a1f] p-10 md:p-16 rounded-[2.5rem] border border-indigo-500/20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z\' fill=\'%23ffffff\' fill-opacity=\'0.02\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">Designed Built For Students, By Innovators</h2>
              <p className="text-indigo-200/80 max-w-[600px] mx-auto text-lg mb-10">
                Created with a passion for SDG 4 (Quality Education) and SDG 10 (Reduced Inequalities), ensuring world-class academic support is accessible to everyone.
              </p>
              
              <div className="inline-flex items-center gap-3 bg-indigo-500/20 text-indigo-300 px-6 py-3 rounded-full border border-indigo-500/30 font-medium tracking-wide">
                <span>Join us on this journey </span> <span className="text-xl leading-none">✨</span>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default AboutUs;
