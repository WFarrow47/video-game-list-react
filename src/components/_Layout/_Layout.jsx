import React, { Component } from "react";

import Header from "./_Header";
import Footer from "./_Footer";

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Header />
        {children}
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;
