import SimpleMdeReact from "react-simplemde-editor";
import { Col, Label } from "reactstrap";
import { P } from "../../../../../AbstractElements";

const FormEditors = () => {
  const mdeEditorText = `Enter your messages...`;
  return (
    <Col xs="12">
      <Label className="m-0">
        Event Description <span className="txt-danger"> *</span>
      </Label>
      <div id="editor2">
        <SimpleMdeReact
          id="editor_container"
          value={mdeEditorText}
          options={{ autofocus: false, spellChecker: true }}
        />
      </div>
      <P className="f-light detail-note">
        {"Improve event understandability by adding a compelling description."}
      </P>
    </Col>
  );
};

export default FormEditors;
