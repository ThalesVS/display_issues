import React from "react";
import { Table } from "semantic-ui-react";

import "./style.css";

export default ({
    headers = [],
    data = [],
    columns = [],
    wantedLabels = [],
    formatDate = {},
    formatIssues = {},
    formatCell = {}
}) => (
        <Table celled className="list">
            <Table.Header>
                <Table.Row>
                    {headers.map(header => (
                        <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.response.length > 0 ? formatIssues(data.response, columns, wantedLabels).map(row => (
                    <Table.Row key={row["number"]}>
                        {columns.map(col => (
                            <Table.Cell key={col}>
                                {formatCell[col] ? formatCell[col](row[col]) : formatDate(row[col])}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                )) : ''}
            </Table.Body>
        </Table>
    );
