import React, { ReactElement } from "react";
interface PropsType {
  children: ReactElement;
}
class FallBack extends React.Component<PropsType> {
  state = { hasError: false };
  static getDerivedStateFromErrors(error: any) {
    return { hasError: error };
  }
  componentDidCatch(error: any) {
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Im falling back</h1>;
    }
    return this.props.children;
  }
}

export default FallBack;
