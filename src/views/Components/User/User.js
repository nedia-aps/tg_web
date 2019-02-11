import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as userAction from "../../../redux/actions";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { getStates, matchStateToTerm, sortStates, styles } from './utils'
import Autocomplete from './index'
import classnames from 'classnames';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Countries from './Countries';
import States from './States';
import Cities from './Cities';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];
var getOptions = function(input, callback) {
  setTimeout(function() {
    callback(null, {
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ],
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      complete: true
    });
  }, 500);
};

function logChange(val) {
  console.log("Selected: " + JSON.stringify(val));
}


  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

class User extends Component {
  componentWillMount(){
    if(this.props.userId!=""){
      this.props.userAction.getUser({userId:this.props.userId});
    }
    
  }
  constructor(props) {
    super(props);
    //console.log(this.props.userId);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      c:"{Id:1125,Name:'USA'}"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  
SaveUser(e){
  e.preventDefault()
  var name=this.refs.name.value;
  var email=this.refs.email.value;
  userAction.saveUser({name,email});
}
 state = { value: 'Ma' }
 state = {
    editorState: EditorState.createEmpty(),
  }
  render() {
     const { editorState } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          
          <div className="col-md-12 mb-12">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  <i className="icon-calculator"></i> Calculator
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  <i className="icon-basket-loaded"></i> Shoping cart
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  <i className="icon-pie-chart"></i> Charts
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
              <div className="card-header">
                <i className="fa fa-edit"></i>Form Elements
                <div className="card-actions">
                  <a href="#" className="btn-setting"><i className="icon-settings"></i></a>
                  <a href="#" className="btn-minimize"><i className="icon-arrow-up"></i></a>
                  <a href="#" className="btn-close"><i className="icon-close"></i></a>
                </div>
              </div>
              <div className="card-block">
                <form className="form-2orizontal" onSubmit={this.SaveUser.bind(this)}>
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="prependedInput">User Name</label>
                    <div className="controls">
                      <div className="input-prepend input-group">
                        <span className="input-group-addon">@</span>
                        <input id="prependedInput" className="form-control" value={this.props.userObject.Name} size="16" type="text" ref="name"/>
                      </div>
                      <p className="help-block">Here's some help text</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="email-input">Email</label>
                    <div className="controls">
                      <div className="input-group">
                       <span className="input-group-addon">.00</span> 
                       <input type="email" id="email-input" name="email-input" value={this.props.userObject.Email} className="form-control" placeholder="Enter Email" ref="email"/>
                       
                      </div>
                      <span className="help-block">Here's more help text</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label" htmlFor="email-input">Phone</label>
                    <div className="controls">
                      <div className="input-group">
                       <span className="input-group-addon">.00</span> 
                       <input type="email" id="email-input" name="email-input" value={this.props.userObject.Phone} className="form-control" placeholder="Enter Phone" ref="email"/>
                       
                      </div>
                      <span className="help-block">Here's more help text</span>
                    </div>
                  </div>
                    {/* <Select
                        name="form-field-name"
                        value="one"
                        options={options}
                        onChange={logChange}
                       />
                 
                 <Select.Async
    name="form-field-name"
    loadOptions={getOptions}
/> */}
                 <label htmlFor="states-autocomplete">Choose a state from the US</label>
                 <Countries c={this.props.selectedCountry}/>
                 <Cities />
                 <Cities/>
                 
                  {/* <Autocomplete
                    value={this.state.value}
                    inputProps={{ id: 'states-autocomplete' }}
                    items={getStates()}
                    getItemValue={(item) => item.name}
                    shouldItemRender={matchStateToTerm}
                    sortItems={sortStates}
                    onChange={(event, value) => this.setState({ value })}
                    onSelect={value => this.setState({ value })}
                    renderItem={(item, isHighlighted) => (
                      <div
                        style={isHighlighted ? styles.highlightedItem : styles.item}
                        key={item.abbr}
                      >{item.name}</div>
                    )}
                  /> */}
                  <div className="form-group">
                  <div className="controls">
                      <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-default">Cancel</button>
                      </div>
                  </div>
                  </div>
                  {/* <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                  /> */}
                </form>
              </div>
            </div>
              </TabPane>
              <TabPane tabId="2">
                2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </TabPane>
              <TabPane tabId="3">
                2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </TabPane>
            </TabContent>
          </div>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ userReducerTest}) => {
  const {
    userObject,
    userId,
    selectedCountry
    
  } = userReducerTest;
  return {
    userObject,
    userId,
    selectedCountry
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userAction: bindActionCreators(userAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(User)
);
