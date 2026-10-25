import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-zinc-200 bg-zinc-900/90 rounded-2xl border border-red-500/30 max-w-xl mx-auto my-12 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center text-2xl font-bold mb-4">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-red-300 font-serif mb-2">頁面載入異常</h2>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            {this.state.error?.message || '渲染組件時發生未預期錯誤，已自動攔截保護。'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs transition-colors"
          >
            重新載入頁面
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
