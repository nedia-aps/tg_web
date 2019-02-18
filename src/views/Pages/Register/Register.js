import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>Opret</h1>
                  <p className="text-muted">Opret bruger</p>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">
                      <i className="icon-user" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Brugernavn"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">@</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Fejl"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">
                      <i className="icon-lock" />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Kodeord"
                    />
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon">
                      <i className="icon-lock" />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Gentag kodeord"
                    />
                  </div>
                  <button type="button" className="btn btn-block btn-success">
                    Opret bruger
                  </button>
                </div>
                <div className="card-footer p-4">
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-block btn-facebook"
                        type="button"
                      >
                        <span>Facebook</span>
                      </button>
                    </div>
                    {/* <div className="col-6">
                      <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
