import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import Yup from 'yup';

// eslint-disable-next-line
const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const T = PropTypes;

const InnerForm = props => {
  const { handleSubmit, setFieldValue, values, errors, resetForm } = props;
  return (
    <div className="card">
      <div className="card-header">
        <strong> {'Opret'} </strong> admin
      </div>
      <div className="card-block">
        <div className="form-group row">
          <label className="col-md-3 form-control-label" htmlFor="name-input">
            Navn
          </label>
          <div className="col-md-9">
            <input
              type="text"
              id="name-input"
              name="name-input"
              className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
              placeholder="Navn"
              value={values.Name}
              onChange={e => {
                setFieldValue('Name', e.target.value);
              }}
            />
            {errors.Name ? (
              <span className="is-invalid">{errors.Name}</span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-md-3 form-control-label" htmlFor="email-input">
            E-mail
          </label>
          <div className="col-md-9">
            <input
              type="text"
              id="email-input"
              name="email-input"
              className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
              placeholder="E-mail"
              value={values.Email}
              onChange={e => {
                setFieldValue('Email', e.target.value);
              }}
            />
            {errors.Email ? (
              <span className="is-invalid">{errors.Email}</span>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-md-3 form-control-label" htmlFor="phone-input">
            Tlf
          </label>
          <div className="col-md-9">
            <input
              type="text"
              id="phone-input"
              name="phone-input"
              className={`form-control ${errors.Phone ? 'is-invalid' : ''}`}
              placeholder="Tlf"
              value={values.Phone}
              onChange={e => {
                setFieldValue('Phone', e.target.value);
              }}
            />
            {errors.Phone ? (
              <span className="is-invalid">{errors.Phone}</span>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="form-group row">
          <label
            className="col-md-3 form-control-label"
            htmlFor="password-input"
          >
            Nyt kodeord
          </label>
          <div className="col-md-9">
            <input
              type="password"
              id="password-input"
              name="password-input"
              value={values.Password}
              className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
              placeholder="Nyt kodeord"
              onChange={e => {
                setFieldValue('Password', e.target.value);
              }}
            />
            {errors.Password ? (
              <span className="is-invalid">{errors.Password} </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="form-group row">
          <label
            className="col-md-3 form-control-label"
            htmlFor="confirm-input"
          >
            Gentag kodeord
          </label>
          <div className="col-md-9">
            <input
              type="password"
              id="confirm-input"
              name="confirm-input"
              value={values.ConfirmPassword}
              className={`form-control ${
                errors.ConfirmPassword ? 'is-invalid' : ''
              }`}
              placeholder="Gentag kodeord"
              onChange={e => {
                setFieldValue('ConfirmPassword', e.target.value);
              }}
            />
            {errors.ConfirmPassword ? (
              <span className="is-invalid">{errors.ConfirmPassword} </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="card-footer text-right">
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={handleSubmit}
        >
          <i className="fa fa-dot-circle-o" />
          Gem
        </button>
        <button
          type="reset"
          className="btn btn-sm btn-danger"
          onClick={() => resetForm()}
        >
          <i className="fa fa-ban" /> Nulstil
        </button>
      </div>
    </div>
  );
};

InnerForm.propTypes = {
  handleSubmit: T.func.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    Name: T.string,
    Email: T.string,
    Password: T.string,
    ConfirmPassword: T.string,
    Phone: T.string,
  }).isRequired,
};

const Enhancer = withFormik({
  // set initial values
  mapPropsToValues: () => ({
    // props
    Name: '',
    Password: '',
    ConfirmPassword: '',
    Email: '',
    Phone: '',
  }),
  validateOnBlur: false,
  validateOnChange: true,
  validationSchema: Yup.object().shape({
    Name: Yup.string()
      .matches(
        /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
        'Bare bokstaver og mellomrom tillatt!',
      )
      .required('Navn kreves'),
    ConfirmPassword: Yup.mixed()
      .test('match', 'passordene er ikke like!', function(password) {
        return password === this.parent.Password;
      })
      .required('Passordbekreftelse kreves!'),

    Password: Yup.string()
      .min(6, 'Passordet må være lengre enn 5 tegn!')
      .matches(PasswordRegex, 'Ugyldig passord!')
      .required('Passord er påkrevd!'),
    Email: Yup.string()
      .matches(EmailRegex, 'Ugyldig epost!')
      .required('E-post er nødvendig!'),
    Phone: Yup.string()
      .matches(/(^[0-9]+$)/, 'only digits here!')
      .required('Telefonnummer er påkrevd!'),
  }),

  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values);
  },
})(InnerForm);
const AdminForm = ({ onSubmit }) => <Enhancer onSubmit={onSubmit} />;
export default AdminForm;
