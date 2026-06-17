'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { romanizeSentence } from '../../../src/index'
import type { RomanizeOptions } from '../../../src/types'

const ARTICLE = {
  title: 'เที่ยวไทยหนึ่งวัน',
  paragraphs: [
    'เช้าวันเสาร์ ผมตื่นเช้าที่กรุงเทพ อากาศร้อนอบอ้าวแต่ท้องฟ้าแจ่มใส หลังอาบน้ำเสร็จ ก็นั่งรถไฟฟ้าไปสนามบินสุวรรณภูมิ เพื่อบินไปเชียงใหม่',
    'เที่ยงถึงเชียงใหม่ ผมไปวัดพระธาตุดอยสุเทพ ชมวิวเมืองจากบนเขา แล้วลงมากินข้าวซอย ตอนบ่ายแวะตลาดวโรรส ซื้อของฝากกลับบ้าน',
    'เย็นกลับมาที่กรุงเทพ เปิดสมาร์ทโฟนดูแผนที่ ขับรถผ่านนครปฐม ไปทานอาหารที่ร้านใกล้สมุทรปราการ ก่อนกลับบ้านพักผ่อน',
    'ก่อนนอน ผมนึกถึงเดือนหน้าที่จะไปกาญจนบุรี ชมสะพานข้ามแม่น้ำแคว และลองซอฟต์แวร์ romanize คำไทยที่เพิ่งเรียนรู้วันนี้',
  ],
}

type SelectionInfo = {
  text: string
  roman: string
  x: number
  y: number
}

type Props = {
  options: RomanizeOptions
}

export default function ArticleHighlight({ options }: Props) {
  const articleRef = useRef<HTMLElement>(null)
  const [selection, setSelection] = useState<SelectionInfo | null>(null)

  const updateSelection = useCallback(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setSelection(null)
      return
    }

    const text = sel.toString().trim()
    if (!text || !/[\u0E00-\u0E7F]/.test(text)) {
      setSelection(null)
      return
    }

    const range = sel.getRangeAt(0)
    if (!articleRef.current?.contains(range.commonAncestorContainer)) {
      setSelection(null)
      return
    }

    const rect = range.getBoundingClientRect()
    setSelection({
      text,
      roman: romanizeSentence(text, options),
      x: rect.left + rect.width / 2,
      y: rect.top,
    })
  }, [options])

  useEffect(() => {
    document.addEventListener('mouseup', updateSelection)
    document.addEventListener('keyup', updateSelection)
    return () => {
      document.removeEventListener('mouseup', updateSelection)
      document.removeEventListener('keyup', updateSelection)
    }
  }, [updateSelection])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-800">{ARTICLE.title}</h2>
        <span className="text-xs text-slate-400 whitespace-nowrap">
          highlight ข้อความไทยเพื่อดูคำอ่าน
        </span>
      </div>

      <article
        ref={articleRef}
        className="select-text rounded-xl border border-amber-100 bg-amber-50/40 p-6 text-lg leading-relaxed text-slate-700 space-y-4"
      >
        {ARTICLE.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>

      {selection && (
        <div
          className="fixed z-50 -translate-x-1/2 -translate-y-full pointer-events-none"
          style={{ left: selection.x, top: selection.y - 10 }}
        >
          <div className="rounded-xl border border-blue-200 bg-white px-4 py-3 shadow-lg shadow-blue-200/40 max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              คำอ่าน
            </p>
            <p className="text-sm text-slate-600 mb-1 line-clamp-2">{selection.text}</p>
            <p className="text-lg font-bold text-blue-600 break-all">{selection.roman}</p>
          </div>
          <div className="mx-auto h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-white drop-shadow" />
        </div>
      )}
    </section>
  )
}
