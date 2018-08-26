import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUnEnrolledCourses, deleteCourse } from '../actions/courseActions';
import Spinner from '../../common/components/controls/Spinner';
import TextFieldGroup from '../../common/components/controls/TextFieldGroup';

class ListCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      timeout: null,
    }
    this.onChange = this.onChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }
  
  componentDidMount() {
    console.log('ListCourse componentDidMount');
    this.doSearch();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log('componentWillReceiveProps ', nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
/*
    if (nextProps.user) {
      const user = nextProps.user;
      // Set component fields state
      this.setState({
        learnerId: user.id,
      });
    }    
*/
  }

  onDeleteClick(id) {
    const userEmail = this.props.user.email;
    this.props.deleteCourse(id, userEmail);
  }
  doSearch() {
    console.log('doSearch');
    this.props.getUnEnrolledCourses(this.state.searchTerm, this.props.user.id, this.props.user.email);
  }

  onChange(e) {
    const WAIT_INTERVAL = 500;
    this.setState({ [e.target.name]: e.target.value });

    clearTimeout(this.timer);
    this.timer = setTimeout(this.doSearch, WAIT_INTERVAL);
  }

  render() {
    const { loading } = this.props;

    var courseContent;

    var loadingContent = <span />;

    if (loading) {
      loadingContent = <Spinner />;
    }
    else {
      if (this.props.courses) {
        courseContent = this.props.courses.map(course => (
          <tr key={course._id}>
            <td><Link to={`/course/${course._id}`}>{course.code}</Link></td>
            <td>{course.name}</td>
            <td>
            <button
                onClick={this.onDeleteClick.bind(this, course._id)}
                className="btn-light">
                <i className="fas fa-minus-circle text-info mr-1" />
                Delete
            </button>              
            </td>
          </tr>
        ));
      }

    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="mb-4">Courses</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
            </div>
            <div className="col">
              <TextFieldGroup
                placeholder="Search..."
                value={this.state.searchTerm}
                onChange={this.onChange}
                name="searchTerm"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {courseContent}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {loadingContent}
            </div>
          </div>

        </div>
      </div>

    );
  }
}

ListCourse.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  //courses: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log('mapStateToProps  ListCourse');
  return {
    user: state.user.user,
    courses: state.course.courses ? state.course.courses : null,
    loading: state.course.loading,
  };
};

export default connect(mapStateToProps, { getUnEnrolledCourses, deleteCourse })(
  ListCourse
);
