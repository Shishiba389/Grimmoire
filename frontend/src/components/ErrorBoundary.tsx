import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackLabel?: string;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, textAlign: "center" }}>
          <h3>{this.props.fallbackLabel || "Something went wrong"}</h3>
          <p style={{ opacity: 0.7, fontSize: 13 }}>{this.state.error.message}</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
