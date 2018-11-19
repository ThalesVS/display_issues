import React, { Component, Fragment } from "react";
import { Container, Header, List, Label } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";

import Service from "../../services/service";
import TableView from "../TableView/TableView";
import { formatDate, formatIssues, getTotalPages, formatUrl } from "../../utils/utils";


import "./styles.css";
import Status from "../../Filters/Status/Status";

export default class extends Component {
  state = {
    headers: [ "Issue Number", "Title", "Created At", "Updated At", "Labels", "State" ],
    columns: [ "number", "title", "created_at", "updated_at", "labels", "state" ],
    wantedLabels: ["id", "name", "color"],
    data: {
      response: [],
      link: ""
    },
    url: `https://api.github.com/repos/facebook/react/issues?`,
    activePage: 1,
    status: "all",
    pageSize: 10,
  };

  componentWillMount() {
    this.fetchInfo();
  }

  componentDidUpdate(prevState) {
    if (this.state.status !== prevState.status) {
      this.fetchInfo();
    }
  }
  

  onPageChange = (e, { activePage }) => {
    let newState = this.state;
    newState.activePage = activePage;
    this.setState(newState);
    this.fetchInfo();
  };

  fetchInfo() {
    let urlFetch = formatUrl(this.state) 
    Service.get(urlFetch).then(data => {
      data.promise.then(response => {
        this.setState({
          data: {
            response: response,
            link: data.link
          },
          loading: false
        });
      });
    });
  }


  formatLabel(row) {
    return row.length > 0 ? (
      <div>
        {row.map(label => (
          <List.Item key={label.id}>
            <Label
              style={{
                backgroundColor: `#${label.color}`
              }}
              horizontal
            >
              {label.name}
            </Label>
          </List.Item>
        ))}
      </div>
    ) : null;
  };

 
  onChangeStatus = (e, { value }) => {
    this.setState({ activePage: 1, status: value });
  };

  render() {
    const { activePage, headers, columns, data, wantedLabels, status } = this.state;
    let formatCell={ labels: this.formatLabel };
    return (
      <Container className="App">
        <Header as="h1" textAlign="center">
          React project issues
        </Header>
            <Fragment>
                <Status
                  status={status}
                  onChangeStatus={this.onChangeStatus}>
                </Status>
                <TableView
                  data={data}
                  headers={headers}
                  columns={columns}
                  wantedLabels={wantedLabels}
                  formatCell={formatCell}
                  formatDate={formatDate}
                  formatIssues={formatIssues} >
                </TableView>
              <Container textAlign="center">
                <Pagination
                  defaultActivePage={activePage}
                  totalPages={getTotalPages(data.link)}
                  onPageChange={this.onPageChange}
                />
              </Container>
            </Fragment>
      </Container>
    );
  }
}
