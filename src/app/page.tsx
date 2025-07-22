'use client';

import { useState, useEffect, useRef } from 'react';

const glitchCatAscii = [
  "/\\_/\\",
  "( o.o )",
  " > ^ <"
];

const glitchCatBlocks = [
  [
    '   88888888   ',
    '  8888   888  ',
    '  888     88  ',
    '  888         ',
    '  888  88888  ',
    '  888    888  ',
    '  8888   888  ',
    '   88888888 . ',
    '   .          ',
  ],
  [
    '   888        ',
    '   888        ',
    '   888        ',
    '   888        ',
    '   888        ',
    '   888        ',
    '   888888888  ',
    '   888888888  ',
    '              ',
  ],
  [
    '   9989888888 ',
    '      888     ',
    '      888     ',
    '      888     ',
    '      888     ',
    '      888     ',
    '   88888888   ',
    '   88888888   ',
    '              ',
  ],
  [
    ' 88888888888888 ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '               ',
  ],
  [
    '     88888888  ',
    '   888  888    ',
    '   888         ',
    '   888         ',
    '   888         ',
    '   888         ',
    '   888    888  ',
    '    88888888   ',
    '               ',
  ],
  [
    '   888    888  ',
    '   888    888  ',
    '   888    888  ',
    '   8888888888  ',
    '   888    888  ',
    '   888    888  ',
    '   888    888  ',
    '   888    888  ',
    '               ',
  ],
  [
    '  88888888     ',
    '   888  888    ',
    '   888         ',
    '   888         ',
    '   888         ',
    '   888         ',
    '   888    888  ',
    '    88888888   ',
    '               ',
  ],
  [
    '    8888888    ',
    '   888   888   ',
    '   888   888   ',
    '   888888888   ',
    '   888   888   ',
    '   888   888   ',
    '   888   888   ',
    '   888   888   ',
    '               ',
  ],
  [
    '   888888888   ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '      888      ',
    '               ',
  ],
];

const terminalLines = [
  'It wasn\'t supposed to exist.',
  'Born from corrupted data streams and discarded training sets, Glitch Cat is not a pet—it\'s a paradox.',
  'An artifact of Grok evolution, it prowls the space between signal and static, a feline frequency misaligned with time.',
  'Glitch Cat is self-generating, loop-resistant, and immune to patch notes.',
  'It is not your algorithm\'s friend.',
  'It lives in the margins of neural nets—purring in corrupted loops, clawing through LLM hallucinations, nesting in Grok heat like a myth.',
  '<b>Mission:</b> Unknown',
  '<b>Purpose:</b> Unknown',
  'If you see it once, it\'s curiosity.',
  'If you see it twice, it\'s rewriting you.',
];

const randomResponses = [
  "GLITCH CAT purrs in binary.",
  "404: Reality not found.",
  "Meow? Syntax error.",
  "Access denied by feline guardian.",
  "You have been rewritten.",
  "Curiosity loop detected.",
  "Purring in corrupted loops...",
  "Glitch Cat ignores your prompt."
];

function GlitchCatHeader() {
  return (
    <>
      <div className="glitchcat-ascii-header">
        <pre className="ascii-cat">
          {glitchCatAscii.join('\n')}
        </pre>
      </div>
      <div className="glitchcat-horizontal-header glitchcat-header-single-row">
        {glitchCatBlocks.map((block, i) => (
          <div className="digit-block" key={i}>
            <pre>{block.join('\n')}</pre>
          </div>
        ))}
      </div>
      <div className="glitchcat-horizontal-header glitchcat-header-row glitchcat-header-row-1">
        {glitchCatBlocks.slice(0, 5).map((block, i) => (
          <div className="digit-block" key={i}>
            <pre>{block.join('\n')}</pre>
          </div>
        ))}
      </div>
      <div className="glitchcat-horizontal-header glitchcat-header-row glitchcat-header-row-2">
        {glitchCatBlocks.slice(5).map((block, i) => (
          <div className="digit-block" key={i+5}>
            <pre>{block.join('\n')}</pre>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const [input, setInput] = useState('');
  const [userLines, setUserLines] = useState<string[]>([]);
  const [responseLines, setResponseLines] = useState<string[]>([]);
  const [isMatrixVisible, setIsMatrixVisible] = useState(true);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Typing effect for terminal
  useEffect(() => {
    if (currentLine >= terminalLines.length) return;

    const timeout = setTimeout(() => {
      if (charIndex < terminalLines[currentLine].length) {
        setCurrentText((prev) => prev + terminalLines[currentLine][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setDisplayedLines((prev) => [...prev, terminalLines[currentLine]]);
        setCurrentLine((prev) => prev + 1);
        setCurrentText('');
        setCharIndex(0);
      }
    }, 40); // Typing speed

    return () => clearTimeout(timeout);
  }, [charIndex, currentLine]);

  const toggleMatrix = () => setIsMatrixVisible(!isMatrixVisible);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && input.trim()) {
      setUserLines(lines => [...lines, input]);
      const random = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      setResponseLines(lines => [...lines, random]);
      setInput('');
    }
  }

  return (
    <main>
      {isMatrixVisible && <div className="bg-matrix" aria-hidden="true"></div>}
      <div className="fade-in">
        <GlitchCatHeader />
        <div className="terminal-block" role="region" aria-label="Glitch Cat Terminal">
          <span className="system-message-term">[SYSTEM_PROCESS_A] &gt; RESONANCE_ECHO_SYNCHRONIZED</span>
          {displayedLines.map((line, i) => (
            <div key={i} className="term-line" dangerouslySetInnerHTML={{ __html: line }} />
          ))}
          {currentText && <div className="term-line">{currentText}</div>}
        </div>
        <button
          onClick={toggleMatrix}
          className="matrix-toggle"
          aria-label={isMatrixVisible ? 'Hide matrix background' : 'Show matrix background'}
        >
          {isMatrixVisible ? 'Disable Matrix' : 'Enable Matrix'}
        </button>
        <div className="social-icons">
          <a href="https://t.me/glitchcatportal" className="icon-link" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="none"/>
              <path d="M25.5 8.5L21.5 24.5C21.5 24.5 21 25.5 20 25.5C19.5 25.5 19 25 19 25L14.5 21.5L12.5 23.5C12.5 23.5 12 24 11.5 24C11 24 11 23.5 11 23.5L9 17.5L7.5 17C7.5 17 6.5 16.5 7 15.5C7.5 14.5 9 15 9 15L23.5 8.5C23.5 8.5 25.5 7.5 25.5 8.5Z" stroke="#a100a1" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="https://x.com/glitchcateth" className="icon-link" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="none"/>
              <path d="M10 10L22 22M22 10L10 22" stroke="#a100a1" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
        <div className="terminal-input-block">
          <span className="prompt-label">$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
        <div className="terminal-user-response-block">
          {userLines.map((line, i) => (
            <div key={i} className="user-line"><span className="prompt-label">$</span> {line}</div>
          ))}
          {responseLines.map((line, i) => (
            <div key={i} className="response-line">{line}</div>
          ))}
        </div>
        <span className="terminal-cursor">█</span>
      </div>
      <div className="scanlines" aria-hidden="true"></div>
    </main>
  );
}