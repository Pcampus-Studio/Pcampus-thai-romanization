'use client'

import { useMemo, useState } from 'react'
import { romanize, romanizeSentence, romanizeDetailed } from '../../src/index'
import ArticleHighlight from './components/ArticleHighlight'

export default function Home() {
  const [input, setInput] = useState('')
  const [useSentence, setUseSentence] = useState(false)
  const [separator, setSeparator] = useState<'' | '-' | ' '>('')
  const [tone, setTone] = useState<'omit' | 'number' | 'diacritic'>('omit')

  const options = useMemo(() => ({ separator, tone }), [separator, tone])

  const output = useMemo(() => {
    const text = input.trim()
    if (!text) return ''
    return useSentence ? romanizeSentence(text, options) : romanize(text, options)
  }, [input, useSentence, options])

  const detail = useMemo(() => {
    const text = input.trim()
    if (!text || useSentence) return null
    return romanizeDetailed(text, options)
  }, [input, useSentence, options])

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center p-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100 space-y-10">
        <h1 className="text-3xl font-bold text-slate-800 text-center tracking-tight">
          Thai Romanization
        </h1>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                checked={useSentence}
                onChange={(e) => setUseSentence(e.target.checked)}
              />
              Sentence mode
            </label>
            <label className="flex items-center gap-2 text-slate-600">
              Separator
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value as '' | '-' | ' ')}
                className="border rounded px-2 py-1"
              >
                <option value="">none</option>
                <option value="-">hyphen</option>
                <option value=" ">space</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-slate-600">
              Tone
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as 'omit' | 'number' | 'diacritic')}
                className="border rounded px-2 py-1"
              >
                <option value="omit">omit</option>
                <option value="number">number</option>
                <option value="diacritic">diacritic</option>
              </select>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Input (Thai)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type Thai here... (e.g., สวัสดี ครับ)"
              className="w-full h-32 p-4 text-lg border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none bg-slate-50/50"
            />
          </div>

          <div className="pt-4 border-t border-slate-50">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Romanized Result
            </label>
            <div className="mt-2 p-5 bg-blue-50/50 rounded-xl border border-blue-100 min-h-[4rem] flex items-center">
              <span className="text-2xl font-bold text-blue-600 break-all">
                {output || <span className="text-blue-300 font-normal">Waiting for input...</span>}
              </span>
            </div>
          </div>

          {detail && (
            <div className="pt-4 border-t border-slate-50 space-y-3">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Pipeline (confidence: {detail.confidence})
              </label>
              <div className="text-xs font-mono bg-slate-50 rounded-lg p-4 space-y-2 overflow-x-auto">
                <div><span className="text-slate-400">tokens:</span> [{detail.tokens.join(' | ')}]</div>
                <div><span className="text-slate-400">units:</span> [{detail.units.join(' | ')}]</div>
                <div>
                  <span className="text-slate-400">segments:</span>
                  {detail.segments.map((s, i) => (
                    <span key={i} className="ml-2 text-slate-700">
                      {s.thai}→{s.roman}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100">
          <ArticleHighlight options={options} />
        </div>

        <p className="text-center text-slate-400 text-xs">
          Built with Next.js & Thai Romanization Library
        </p>
      </div>
    </main>
  )
}
