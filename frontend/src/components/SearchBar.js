import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/login");
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{ display: "flex" }}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" className="p-2" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
