/* _app.js */
import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import { userdetails,logout } from "../lib/auth";
import { ToastProvider } from 'react-toast-notifications'

import "../styles/antd.less";
import '../static/index.css';

class MyApp extends App {
  state = {
    user: null,
    symbol:"A"
  };

  componentDidMount() {
    // grab token value from cookie
    const token = Cookie.get("token");
    if (token) {
      userdetails(token)
      .then((res) => {
      this.setUser(res.data.user);
      })
      .catch((error) => {
        logout();
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };
  setSymbol = (s) => {
    this.setState({ symbol:s });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
          setSymbol: this.setSymbol,
          symbol:this.state.symbol
        }}
      >
  <ToastProvider>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
        </ToastProvider>
      </AppContext.Provider>
    );
  }
}

export default MyApp;