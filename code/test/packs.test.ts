import { describe, it, expect } from 'vitest';
import {
  coreVocab,
  geoVocab,
  calendarVocab,
  mergeVocabulary,
  defaultVocabulary,
} from '../src/packs/index.ts';
import { vocabulary } from '../src/vocabulary.ts';

describe('Vocabulary packs', () => {
  it('should merge packs without duplicates', () => {
    const merged = mergeVocabulary(coreVocab, calendarVocab, geoVocab);
    expect(merged.length).toBe(new Set(merged).size);
  });

  it('defaultVocabulary should equal vocabulary export', () => {
    expect(defaultVocabulary).toEqual(vocabulary);
  });

  it('geo pack should include province compounds', () => {
    expect(geoVocab).toContain('กาญจนบุรี');
    expect(geoVocab).toContain('พระนครศรีอยุธยา');
  });

  it('calendar pack should include month roots', () => {
    expect(calendarVocab).toContain('มกรา');
    expect(calendarVocab).toContain('คม');
  });

  it('core pack should include common compounds', () => {
    expect(coreVocab).toContain('กษัตริย์');
    expect(coreVocab).toContain('จราจร');
  });
});
