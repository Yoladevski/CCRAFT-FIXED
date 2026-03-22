import React from 'react';

interface MistakeBlock {
  title: string;
  explanation: string;
  howToFix: string;
  think: string;
}

function parseMistakes(text: string): MistakeBlock[] {
  const normalised = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  const rawBlocks = normalised
    .split(/\n\s*---\s*\n/)
    .map(b => b.trim())
    .filter(Boolean);

  const blocks: MistakeBlock[] = [];

  for (const block of rawBlocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);

    if (lines.length === 0) continue;

    let titleLine = lines[0].replace(/^[•\-\*]\s*/, '');
    let explanation = '';
    let howToFix = '';
    let think = '';

    const howToFixIdx = lines.findIndex(l =>
      /^how to fix[:\s]/i.test(l)
    );
    const thinkIdx = lines.findIndex(l =>
      /^think[:\s]/i.test(l)
    );

    if (howToFixIdx !== -1 || thinkIdx !== -1) {
      const explanationEnd = howToFixIdx !== -1
        ? howToFixIdx
        : thinkIdx !== -1
        ? thinkIdx
        : lines.length;

      explanation = lines.slice(1, explanationEnd).join(' ').trim();

      if (howToFixIdx !== -1) {
        const inlineFix = lines[howToFixIdx].replace(/^how to fix[:\s]*/i, '').trim();
        const fixEnd = thinkIdx !== -1 ? thinkIdx : lines.length;
        const nextLines = lines.slice(howToFixIdx + 1, fixEnd);
        howToFix = inlineFix
          ? [inlineFix, ...nextLines].join(' ').trim()
          : nextLines.join(' ').trim();
      }

      if (thinkIdx !== -1) {
        const inlineThink = lines[thinkIdx].replace(/^think[:\s]*/i, '').trim();
        const nextLines = lines.slice(thinkIdx + 1);
        think = inlineThink
          ? [inlineThink, ...nextLines].join(' ').trim()
          : nextLines.join(' ').trim();
        think = think.replace(/^[""]|[""]$/g, '').replace(/^"|"$/g, '').trim();
      }
    } else {
      explanation = lines.slice(1).join(' ').trim();
    }

    if (titleLine) {
      blocks.push({ title: titleLine, explanation, howToFix, think });
    }
  }

  if (blocks.length === 0 && text.trim()) {
    blocks.push({ title: '', explanation: text.trim(), howToFix: '', think: '' });
  }

  return blocks;
}

interface CommonMistakesContentProps {
  text: string;
}

export default function CommonMistakesContent({ text }: CommonMistakesContentProps) {
  const blocks = parseMistakes(text);

  if (blocks.length === 1 && !blocks[0].title && !blocks[0].howToFix && !blocks[0].think) {
    return (
      <p className="text-[#A0A0A0] text-body leading-relaxed">{blocks[0].explanation}</p>
    );
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <div key={i} className={i > 0 ? 'pt-6 border-t border-[#2E2E2E]' : ''}>
          {block.title && (
            <p
              className="text-white font-semibold text-body mb-1.5"
              style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.03em' }}
            >
              {block.title}
            </p>
          )}
          {block.explanation && (
            <p className="text-[#A0A0A0] text-body leading-relaxed">
              {block.explanation}
            </p>
          )}
          {block.howToFix && (
            <p className="text-body leading-relaxed mt-2.5">
              <span className="text-[#B11226] font-semibold" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.72em', letterSpacing: '0.06em' }}>
                HOW TO FIX:
              </span>{' '}
              <span className="text-[#A0A0A0]">{block.howToFix}</span>
            </p>
          )}
          {block.think && (
            <p className="text-body leading-relaxed mt-1.5">
              <span className="text-[#B11226] font-semibold" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.72em', letterSpacing: '0.06em' }}>
                THINK:
              </span>{' '}
              <span className="text-[#EDEDED] italic">&ldquo;{block.think}&rdquo;</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
