import React, { Component } from "react";
import "./App.css";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
      gender: "",
      userData: [],
      index: "",
      errors: {},
    };
  }

  hendleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validations = (name, value) => {
    console.log("value", value);
    console.log("name", name);
    switch (name) {
      case "name":
        if (!value) {
          return "Full name is required";
        } else {
          return "";
        }
      case "phone":
        if (!value) {
          return "Phone No. name is required";
        } else {
          return "";
        }
      case "gender":
        if (!value) {
          return "Gender is required";
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  hendleSubmit = () => {
    const errors = {};
    console.log("errors", errors);
    const user = {
      name: this.state.name,
      phone: this.state.phone,
      gender: this.state.gender,
    };
    const data = this.state.userData;

    Object.keys(user).forEach((key) => {
      const error = this.validations(key, user[key]);
      if (error && error.length > 0) {
        errors[key] = error;
      }
    });
    console.log("error length----->", Object.keys(errors).length);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors });
      return;
    } else {
      this.setState({ errors: {} });
    }

    if (this.state.index === "") {
      data.push(user);
    } else {
      data[this.state.index] = user;
      this.setState({
        index: "",
      });
    }
    this.setState({
      userData: [...data],
    });
    this.setState({
      name: "",
      phone: "",
      gender: "",
    });
  };

  Editrow = (data, i, index) => {
    this.setState({
      name: i.name,
      phone: i.phone,
      gender: i.gender,
      index: index,
    });
  };

  Deleterow = (data, i, index) => {
    console.log("i", i, index);
    const Data = this.state.userData;
    console.log("Data", Data);
    Data.splice(index, 1);
    console.log("splice-->", Data);
    this.setState({
      userData: [...Data],
    });
  };

  columns = [
    {
      title: "Full Name",
      dataIndex: "name",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (data, i, index) => (
        <>
          <EditOutlined
            onClick={() => {
              this.Editrow(data, i, index);
            }}
            style={{ color: "blue", marginRight: "10px" }}
          />
          <DeleteOutlined
            onClick={() => {
              this.Deleterow(data, i, index);
            }}
            style={{ color: "red" }}
          />
        </>
      ),
    },
  ];

  render() {
    return (
      <>
        <div className="main-div">
          <div className="div">
            <h2>Crud Form</h2>
            <div className="div-group">
              <label>Full Name : </label>
              <input className="input" type="text" name="name" placeholder="Full Name" value={this.state.name} onChange={(e) => this.hendleChange(e)} />
              <span className="formvalidation" style={{ color: "red" }}>
                {this.state.errors && this.state.errors.name}
              </span>
            </div>
            <div className="div-group">
              <label>Phone No. : </label>
              <input className="input" type="number" name="phone" placeholder="Phone No." value={this.state.phone} onChange={(e) => this.hendleChange(e)} />
              <span className="formvalidation" style={{ color: "red" }}>
                {this.state.errors && this.state.errors.phone}
              </span>
            </div>
            <div className="div-group">
              <label>Gender : </label>
              <label>Male</label>
              <input type="radio" name="gender" value="male" onChange={(e) => this.hendleChange(e)} checked={this.state.gender === "male"} />
              <label>Female</label>
              <input type="radio" name="gender" value="female" onChange={(e) => this.hendleChange(e)} checked={this.state.gender === "female"} />
              <label>Other</label>
              <input type="radio" name="gender" value="other" onChange={(e) => this.hendleChange(e)} checked={this.state.gender === "other"} />
              <span className="formvalidation" style={{ color: "red" }}>
                {this.state.errors && this.state.errors.gender}
              </span>
            </div>
            <button type="button" onClick={() => this.hendleSubmit()}>
              Submit
            </button>
          </div>
        </div>
        <Table className="antd-table" dataSource={this.state.userData} columns={this.columns} />;
      </>
    );
  }
}
export default App;
