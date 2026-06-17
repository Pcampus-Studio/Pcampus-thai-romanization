'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { romanize, romanizeSentence, romanizeDetailed } from '../../src/index';
export default function Home() {
    const [input, setInput] = useState('');
    const [useSentence, setUseSentence] = useState(false);
    const [separator, setSeparator] = useState('');
    const [tone, setTone] = useState('omit');
    const options = useMemo(() => ({ separator, tone }), [separator, tone]);
    const output = useMemo(() => {
        const text = input.trim();
        if (!text)
            return '';
        return useSentence ? romanizeSentence(text, options) : romanize(text, options);
    }, [input, useSentence, options]);
    const detail = useMemo(() => {
        const text = input.trim();
        if (!text || useSentence)
            return null;
        return romanizeDetailed(text, options);
    }, [input, useSentence, options]);
    return (_jsx("main", { className: "min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-800 mb-8 text-center tracking-tight", children: "Thai Romanization" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap gap-4 text-sm", children: [_jsxs("label", { className: "flex items-center gap-2 text-slate-600", children: [_jsx("input", { type: "checkbox", checked: useSentence, onChange: (e) => setUseSentence(e.target.checked) }), "Sentence mode"] }), _jsxs("label", { className: "flex items-center gap-2 text-slate-600", children: ["Separator", _jsxs("select", { value: separator, onChange: (e) => setSeparator(e.target.value), className: "border rounded px-2 py-1", children: [_jsx("option", { value: "", children: "none" }), _jsx("option", { value: "-", children: "hyphen" }), _jsx("option", { value: " ", children: "space" })] })] }), _jsxs("label", { className: "flex items-center gap-2 text-slate-600", children: ["Tone", _jsxs("select", { value: tone, onChange: (e) => setTone(e.target.value), className: "border rounded px-2 py-1", children: [_jsx("option", { value: "omit", children: "omit" }), _jsx("option", { value: "number", children: "number" }), _jsx("option", { value: "diacritic", children: "diacritic" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-slate-500 uppercase tracking-wider", children: "Input (Thai)" }), _jsx("textarea", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Type Thai here... (e.g., \u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35 \u0E04\u0E23\u0E31\u0E1A)", className: "w-full h-32 p-4 text-lg border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none bg-slate-50/50" })] }), _jsxs("div", { className: "pt-4 border-t border-slate-50", children: [_jsx("label", { className: "text-sm font-semibold text-slate-500 uppercase tracking-wider", children: "Romanized Result" }), _jsx("div", { className: "mt-2 p-5 bg-blue-50/50 rounded-xl border border-blue-100 min-h-[4rem] flex items-center", children: _jsx("span", { className: "text-2xl font-bold text-blue-600 break-all", children: output || _jsx("span", { className: "text-blue-300 font-normal", children: "Waiting for input..." }) }) })] }), detail && (_jsxs("div", { className: "pt-4 border-t border-slate-50 space-y-3", children: [_jsxs("label", { className: "text-sm font-semibold text-slate-500 uppercase tracking-wider", children: ["Pipeline (confidence: ", detail.confidence, ")"] }), _jsxs("div", { className: "text-xs font-mono bg-slate-50 rounded-lg p-4 space-y-2 overflow-x-auto", children: [_jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "tokens:" }), " [", detail.tokens.join(' | '), "]"] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "units:" }), " [", detail.units.join(' | '), "]"] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400", children: "segments:" }), detail.segments.map((s, i) => (_jsxs("span", { className: "ml-2 text-slate-700", children: [s.thai, "\u2192", s.roman] }, i)))] })] })] }))] }), _jsx("p", { className: "mt-8 text-center text-slate-400 text-xs", children: "Built with Next.js & Thai Romanization Library" })] }) }));
}
//# sourceMappingURL=page.js.map