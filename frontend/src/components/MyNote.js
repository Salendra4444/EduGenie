import React from 'react';
import Header from './Header';
import Footer from './Footer';

function MyNote() {
  return (
    <div className="bg-[#100f2c] text-white min-h-screen font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow py-20 px-6 relative flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 rounded-[2.5rem] text-center max-w-[600px] relative z-10 shadow-2xl shadow-black/40">
          
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse shadow-lg shadow-indigo-500/30">
            <span className="text-5xl">🚧</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            My Notes
          </h1>
          
          <div className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full text-sm font-medium tracking-widest uppercase mb-6">
            Under Construction
          </div>

          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            We are currently building this feature! Soon, you'll be able to view all your uploaded documents, saved summaries, exported flashcards, and quizzes perfectly organized right here.
          </p>

          <div className="flex items-center justify-center space-x-2 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default MyNote;
