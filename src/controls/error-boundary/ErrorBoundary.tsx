import classes from './ErrorBoundary.module.scss';

import React from "react";
import { PropsWithChildren } from "react";

interface ErrorBoundaryProps {
  fallback: any
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState>{
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error(error, info);
  }

  render() {
    return this.state.hasError
      ? <div className={classes.boundaryWrapper}>
        {this.props.fallback}
      </div>
      : this.props.children;
  }
}

export default ErrorBoundary;