import React from 'react';
import { MessageCircleQuestion, Play, Landmark, RotateCcw } from 'lucide-react';
import { DISCUSSION_QUESTIONS, JOURNEY_STEPS } from '../../data/journeyData';

interface Props {
  onPresentStep: (index: number) => void;
}

/** Closing view: the policy takeaways of the whole journey and the questions for delegates. */
export const DiscussionView: React.FC<Props> = ({ onPresentStep }) => {
  const indexOf = (code: string) => JOURNEY_STEPS.findIndex((s) => s.stageCode === code);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-indigo-950 text-white p-6 md:p-10 shadow-sm">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-indigo-300">
          <MessageCircleQuestion className="w-3.5 h-3.5" /> Questions for the room
        </span>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight mt-2 max-w-3xl">
          The technology works. What do countries need to agree on to make it real?
        </h2>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DISCUSSION_QUESTIONS.map((q, i) => (
          <article key={q.id} className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">{q.theme}</span>
            </div>
            <p className="text-lg font-semibold text-slate-900 leading-snug">{q.question}</p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500">Revisit:</span>
              {q.relatedSteps.map((code) => {
                const idx = indexOf(code);
                const step = JOURNEY_STEPS[idx];
                return (
                  <button
                    key={code}
                    onClick={() => onPresentStep(idx)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-700"
                  >
                    <Play className="w-3 h-3 text-sky-600" />
                    <span className="font-mono">{code}</span> {step.title}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <section className="bg-white rounded-2xl border border-clinical-divider p-6 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Landmark className="w-4 h-4 text-indigo-600" /> Policy takeaways, moment by moment
        </h3>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {JOURNEY_STEPS.map((s, i) => (
            <li key={s.stageCode}>
              <button onClick={() => onPresentStep(i)} className="w-full text-left flex items-start gap-2 rounded-lg p-2 hover:bg-slate-50">
                <span className="font-mono text-[11px] font-bold text-slate-500 mt-0.5 w-10 flex-shrink-0">{s.stageCode}</span>
                <span className="text-sm text-slate-800 leading-snug">{s.policyTakeaway}</span>
              </button>
            </li>
          ))}
        </ol>
        <button
          onClick={() => onPresentStep(0)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Back to the start of the walkthrough
        </button>
      </section>
    </div>
  );
};
