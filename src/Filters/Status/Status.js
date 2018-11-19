import React from "react";
import { Form, Radio } from "semantic-ui-react";

import "./style.css";


export default ({ status = "all", onChangeStatus = () => null }) => {
  return (
    <Form className="status_form">
        <Form.Field>
            <Radio
                label={"All"}
                value={"all"}
                checked={status === "all"}
                onChange={onChangeStatus}
            />
        </Form.Field>
        <Form.Field>
            <Radio
                label={"Open"}
                value={"open"}
                checked={status === "open"}
                onChange={onChangeStatus}
            />
        </Form.Field>
        <Form.Field>
            <Radio
                label={"Closed"}
                value={"closed"}                
                checked={status === "closed"}
                onChange={onChangeStatus}
            />
        </Form.Field>
    </Form>
  );
};
