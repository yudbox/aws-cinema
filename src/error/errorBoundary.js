import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  //   static getDerivedStateFromError(error) {
  //     // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
  //     return { hasError: true };
  //   }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });

    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    // logErrorToMyService(error, errorInfo);
  }

  clearState = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    console.log("this.state", this.state);
    if (this.state.error) {
      return <ErrorPage clearState={this.clearState} />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ErrorBoundary;
