export type Blank = { id: string; hint: string; maxChars: number; numeric?: boolean };

export type Column = {
  id: string;
  label: string;
  kind: 'text' | 'number' | 'monthYear' | 'url';
  maxChars?: number;
  allowUntracked?: boolean;
  acceptWords?: string[];
};

type Base = { id: string; label: string; help?: string; required: boolean };

export type Question =
  | (Base & { kind: 'text'; maxChars: number; multiline?: boolean; placeholder?: string })
  | (Base & { kind: 'email' })
  | (Base & { kind: 'phone' })
  | (Base & { kind: 'url'; acceptWords: string[] })
  | (Base & { kind: 'number'; allowUntracked?: boolean })
  | (Base & { kind: 'year' })
  | (Base & { kind: 'monthYear' })
  | (Base & { kind: 'radio'; options: string[]; numbered?: boolean })
  | (Base & { kind: 'select'; options: string[]; specify?: { options: string[]; maxChars: number } })
  | (Base & { kind: 'multiselect'; options: string[]; specify?: { options: string[]; maxChars: number } })
  | (Base & { kind: 'sentence'; parts: (string | Blank)[] })
  | (Base & { kind: 'table'; columns: Column[]; minRows: number; maxRows: number });

export type Section = { id: string; title: string; intro?: string; questions: Question[] };

export type NumberAnswer = { value: string; untracked: boolean };
export type ChoiceAnswer = { choice: string; specify: string };
export type MultiAnswer = { choices: string[]; specify: string };
export type SentenceAnswer = Record<string, string>;
export type Cell = string | NumberAnswer;
export type TableRow = Record<string, Cell>;
export type TableAnswer = TableRow[];
export type Answer = string | NumberAnswer | ChoiceAnswer | MultiAnswer | SentenceAnswer | TableAnswer;
export type Answers = Record<string, Answer>;

export type YesNo = 'yes' | 'no' | '';
export type ScreenerAnswers = Record<string, YesNo>;
