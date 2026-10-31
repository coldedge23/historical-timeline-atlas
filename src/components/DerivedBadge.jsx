import React from 'react';

// Plan v2 section 3.2: a link matched by name or summary text, or read back from the other figure's record,
// is not a confirmed historical relation. System recommendations already carry their own label.
const BASIS_TEXT = {
  'commander-name': '依指揮官姓名比對',
  'summary-text': '依戰役摘要文字比對',
  'reverse-relation': '依對方的關係記錄反推',
};

export const DERIVED_NOTE = '標示「程式推導」者為依名稱、摘要文字比對或由對方記錄反推，未經人工確認。';

export function DerivedBadge({ basis }) {
  const reason = BASIS_TEXT[basis];
  if (!reason) return null;
  return (
    <span className="derived-badge" title={`${reason}，未經人工確認`}>
      程式推導<span className="sr-only">：{reason}，未經人工確認</span>
    </span>
  );
}
