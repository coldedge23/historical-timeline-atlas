import React, { createContext, useContext } from 'react';

// Loading and error states for the catalog and data packs (plan v2 section 3.5).
const needsReload = (error) => error?.kind === 'updated' || error?.kind === 'schema';

export function dataErrorMessage(error) {
  switch (error?.kind) {
    case 'updated': case 'schema': return '網站已更新，請重新整理頁面。';
    case 'network': return '網路連線中斷，無法載入歷史資料。';
    case 'http': return `歷史資料載入失敗（伺服器回應 ${error.status}）。`;
    case 'parse': return '歷史資料檔案損毀，無法讀取。';
    default: return '歷史資料載入失敗。';
  }
}

function Actions({ error, onRetry }) {
  return needsReload(error)
    ? <button type="button" className="data-retry" onClick={() => window.location.reload()}>重新整理</button>
    : <button type="button" className="data-retry" onClick={onRetry}>重試</button>;
}

// Before the catalog and the first page are ready: the whole screen.
export function BootScreen({ error, onRetry }) {
  return (
    <div className="data-boot">
      {error
        ? <div role="alert"><p>{dataErrorMessage(error)}</p><Actions error={error} onRetry={onRetry} /></div>
        : <p role="status">正在載入歷史資料…</p>}
    </div>
  );
}

// While switching to a page that is not in memory yet; the current page stays visible underneath.
export function DataStatus({ state, onRetry, floating = false }) {
  if (!state) return null;
  const className = `data-status${state.error ? ' is-error' : ''}${floating ? ' is-floating' : ''}`;
  if (state.error) return <div className={className} role="alert"><p>{dataErrorMessage(state.error)}</p><Actions error={state.error} onRetry={onRetry} /></div>;
  return <div className={className} role="status"><p>正在載入歷史資料…</p></div>;
}

// A modal <dialog> sits in the top layer and makes the page behind it inert, so a link opened from a modal
// reports its loading state inside the dialog too.
export const DataStatusContext = createContext(null);
export function DialogDataStatus() {
  const status = useContext(DataStatusContext);
  return status ? <DataStatus state={status.state} onRetry={status.onRetry} floating /> : null;
}
