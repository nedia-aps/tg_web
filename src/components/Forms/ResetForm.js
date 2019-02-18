import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import Yup from 'yup';

const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const T = PropTypes;

const InnerForm = props => {
  const { handleSubmit, setFieldValue, values, errors } = props;
  return (
    <div className="card">
      <div className="card-header">
        <strong> {'Nulstil'} </strong> kodeord
      </div>
      <div className="card-block">
        <div className="form-group row">
          <label className="col-md-3 form-control-label" htmlFor="text-input">
            Gammel Kodeord
          </label>
          <div className="col-md-9">
            <input
              type="password"
              id="text-input"
              name="text-input"
              className={`form-control ${
                errors.OldPassword ? 'is-invalid' : ''
              }`}
              placeholder="Gammel Kodeord"
              value={values.OldPassword}
              onChange={e => {
                setFieldValue('OldPassword', e.target.value);
              }}
            />
            {errors.OldPassword ? (
              <span className="is-invalid">{errors.OldPassword}</span>
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
              id="email-input"
              name="email-input"
              value={values.NewPassword}
              className={`form-control ${
                errors.NewPassword ? 'is-invalid' : ''
              }`}
              placeholder="Nyt kodeord"
              onChange={e => {
                setFieldValue('NewPassword', e.target.value);
              }}
            />
            {errors.NewPassword ? (
              <span className="is-invalid">{errors.NewPassword} </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-md-3 form-control-label" htmlFor="phone-input">
            Bekræft Kodeord
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
              placeholder="Bekræft Kodeord"
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
        <button type="reset" className="btn btn-sm btn-danger">
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
    OldPassword: T.string,
    NewPassword: T.string,
    ConfirmPassword: T.string,
  }).isRequired,
};

const Enhancer = withFormik({
  // set initial values
  mapPropsToValues: () => ({
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
  }),
  validateOnBlur: false,
  validateOnChange: true,
  validationSchema: Yup.object().shape({
    OldPassword: Yup.mixed().required('Gammelt kodeord skal udfyldes'),
    ConfirmPassword: Yup.mixed()
      .test('match', 'Kodeord er ikke ens', function(password) {
        return password === this.parent.NewPassword;
      })
      .required('Bekræft kodeord skal udfyldes'),
    NewPassword: Yup.string()
      .min(6, 'Kodeord skal være mere end 5 tegn!')
      .matches(PasswordRegex, 'Ugyldig kodeord')
      .required('Nyt kodeord skal udfyldes!'),
  }),

  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values);
  },
})(InnerForm);
const ResetForm = ({ onSubmit }) => <Enhancer onSubmit={onSubmit} />;
export default ResetForm;
