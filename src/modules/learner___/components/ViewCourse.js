import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../common/validation/is-empty';

import TextFieldGroup from '../../common/components/controls/TextFieldGroup';
import TextAreaFieldGroup from '../../common/components/controls/TextAreaFieldGroup';
import InputGroup from '../../common/components/controls/InputGroup';
import SelectListGroup from '../../common/components/controls/SelectListGroup';
import { getCourse, enrollCourse } from '../actions/learnerCourseActions';
import { resetStore } from '../../common/actions/commonActions';
import _ from "lodash";

class ViewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonId: '0',
      lessonName: '',

      name: '',
      code: '',
      description: '',

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }


  componentDidMount() {
    const { id } = this.props.match.params;
    const userEmail = this.props.user.email;
    this.props.getCourse(id, userEmail);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log('componentWillReceiveProps ', nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.course) {
      const course = nextProps.course;
      // Set component fields state
      this.setState({
        _id: course._id,
        name: course.name,
        code: course.code,
        description: course.description,

        lessonId: course.lesson,
        lessonName: course.lessonName,
        lesson: course.lesson,
      });
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  goBack() {
    this.props.resetStore();
    this.props.history.goBack();
  }
  enrollCourse() {
    const { id } = this.props.match.params;
    debugger
    this.props.enrollCourse(id, () => {
      this.goBack();
    });    
  }

  render() {
    const { errors } = this.state;
    var lessonContent;
    var sectionContent;

    lessonContent = (
      <div>
        <hr></hr>
        <h1 className="display-4 text-center">Lesson</h1>
      </div>
    );
    var lesson = this.state.lesson;
    if (lesson) {
      lessonContent = (
        <div>
          <h4>Lesson code: <span class="label label-default">{lesson ? lesson.code : ''}</span></h4>
          <h4>Lesson name: <span class="label label-default">{lesson ? lesson.name : ''}</span></h4>
          <hr></hr>
          {
            lesson.sections.map(section => {
              return (
                <div>
                  <hr></hr>
                  <h3><span>{section.name}</span></h3>
                  {
                    section.units.map(unit => {
                      return (
                        <h4><span>{unit.name}</span></h4>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">
              <button className="btn btn-light" onClick={() => this.goBack()}>Go Back</button>
              <h1 className="display-4 text-center">View Course 11</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 m-auto">
              <h4>Code: <span class="label label-default">{this.state.code}</span></h4>
              <h4>Name: <span class="label label-default">{this.state.name}</span></h4>
              <h4>Description: <span class="label label-default">{this.state.description}</span></h4>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 m-auto">
              {lessonContent}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 m-auto">
              <button className="btn btn-light" onClick={() => this.enrollCourse()}>Enroll</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

ViewCourse.propTypes = {
  getCourse: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log('mapStateToProps ', state.errors);
  return {
    user: state.user.user,
    course: state.course.course,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { getCourse, enrollCourse, resetStore })(
  withRouter(ViewCourse)
);
