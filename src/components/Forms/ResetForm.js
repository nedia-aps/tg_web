import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import Yup from 'yup';

const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const T = PropTypes;

const InnerForm = props => {
  const {
    handleSubmit,
    setFieldValue,
    values,
    errors,
  } = props;
  return (
    <div className="card">
              <div className="card-header">

                <strong> {'Reset'} </strong> password
              </div>
              <div className="card-block">

                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="text-input"
                    >
                      Old Password
                    </label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        id="text-input"
                        name="text-input"
                        className={
                          "form-control " + (errors.OldPassword ? "is-invalid" : "")
                        }
                        placeholder="Old Password"
                        value={values.OldPassword}
                        onChange={e => {
                          setFieldValue('OldPassword', e.target.value);
                        }}

                      />
                      {errors.OldPassword
                        ? <span className="is-invalid">{errors.OldPassword}</span>
                        : ""}
                    </div>
                  </div>


                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="password-input"
                    >
                     New Password
                    </label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        id="email-input"
                        name="email-input"
                        value={values.NewPassword}
                        className={
                          "form-control " + (errors.NewPassword ? "is-invalid" : "")
                        }
                        placeholder="New Password"
                        onChange={e => {
                          setFieldValue('NewPassword', e.target.value);
                        }}


                      />
                      {errors.NewPassword
                        ? <span className="is-invalid">{errors.NewPassword} </span>
                        : ""}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="phone-input"
                    >
                      Confirm Password
                    </label>
                    <div className="col-md-9">
                    <input
                    type="password"
                    id="confirm-input"
                    name="confirm-input"
                    value={values.ConfirmPassword}
                    className={
                      "form-control " + (errors.ConfirmPassword ? "is-invalid" : "")
                    }
                    placeholder="Confirm Password"
                    onChange={e => {
                      setFieldValue('ConfirmPassword', e.target.value);
                    }}


                  />
                      {errors.ConfirmPassword
                        ? <span className="is-invalid">{errors.ConfirmPassword} </span>
                        : ""}
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
                    <i className="fa fa-ban" /> Reset
                  </button>
                </div>
              </div>
  );
};

InnerForm.propTypes = {
  handleSubmit: T.func.isRequired,
  setFieldValue: T.func.isRequired,
  setFieldTouched: T.func.isRequired,
  values: T.shape({
    OldPassword: T.string,
    NewPassword: T.string,
    ConfirmPassword: T.string,
  })
};

const Enhancer = withFormik({
  // set initial values
  mapPropsToValues: props => {

    return {
      OldPassword:'',
      NewPassword:'',
      ConfirmPassword:'',
    };
  },
  validateOnBlur: false,
  validateOnChange: true,
  validationSchema: Yup.object().shape({
    OldPassword: Yup.mixed().required('Old Password is required'),
    ConfirmPassword:Yup.mixed().test('match', 'Passwords do not match', function (password) {
      return password === this.parent.NewPassword
    }).required('Password confirm is required'),
    NewPassword: Yup.string()
    .min(6, 'New password has to be longer than 5 characters!')
    .matches(PasswordRegex,"Invalid password")
    .required('New password is required!')
    }),


  handleSubmit: (values, bag) => {
    bag.props.onSubmit(values);
  }
})(InnerForm);
const ResetForm = ({
  onSubmit,
}) => (
  <Enhancer
    onSubmit={onSubmit}
  />
);
export default ResetForm;
