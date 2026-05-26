import React from "react";
import "./ErrorBoundry.css"; 

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error) {
    console.error(
      "ErrorBoundary fångade ett fel:",
      error
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {

    if (this.state.hasError) {
      return (
        <main className="error-page">

          <section className="error-card">

            <h1>Något gick fel</h1>

            <p>Ett oväntat fel uppstod i applikationen.</p>

            <button onClick={this.handleReload}>Ladda om sidan</button>
          </section>

        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;