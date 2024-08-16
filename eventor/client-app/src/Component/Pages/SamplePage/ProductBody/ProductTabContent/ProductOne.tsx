import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ProductTitle } from "../../../../../utils/Constant";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../ReduxToolkit/Hooks";
import FormEditors from "./FormEditors";
import { setFormValue } from "../../../../../ReduxToolkit/AddProductSlice";
import { Field, FieldProps, FormikProps } from "formik";
import { FormErrors, FormValues } from "../../../../../DefinedTypes/types";
import { Editor } from "@tinymce/tinymce-react";
import SimpleMdeReact from "react-simplemde-editor";
import { P } from "../../../../../AbstractElements";
import FormikControl from "./MCEForm/FormikControl";
import TinyMCEField from "./MCEForm/TinyMCEForm";

interface Props {
  values: FormValues;
  errors: FormErrors;
  handleBlur: FormikProps<any>["handleBlur"];
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: FormikProps<any>["setFieldValue"];
  setFieldTouched: FormikProps<any>["setFieldTouched"];
  touched: Touched;
}

type Touched = {
  [k in keyof FormValues]?: boolean;
};
const ProductOne = ({
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldTouched,
  setFieldValue,
  touched,
}: Props) => {
  const { formValue } = useAppSelector((state) => state.addProduct);
  const dispatch = useDispatch();

  return (
    <div className="sidebar-body">
      <Row className="g-2">
        <Col xs="12" className="custom-input">
          <FormGroup>
            <Label className="m-0">
              Event Name <span className="txt-danger"> *</span>
            </Label>

            <Input
              id="eventName"
              name="eventName"
              // onChange={handleChange}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.eventName}
              invalid={touched.eventName && !!errors.eventName}
            />
            <FormFeedback>{errors.eventName}</FormFeedback>
          </FormGroup>
        </Col>
        {/* <FormEditors /> */}
        <Col xs="12">
          <FormGroup>
            <Label className="m-0">
              Event Description <span className="txt-danger"> *</span>
            </Label>
            <div id="editor2">
              <TinyMCEField name="description" />
              {/* <FormFeedback>{errors.description}</FormFeedback> */}
              <P className="f-light detail-note">
                {
                  "Improve event understandability by adding a compelling description."
                }
              </P>
            </div>
          </FormGroup>
        </Col>
        <Col xs="12">
          <Label className="m-0">
            Mode of Event: <span className="txt-danger"> *</span>
          </Label>
        </Col>
        <Col xs="12" className="custom-input">
          <FormGroup>
            <Input
              id="eventType"
              name="eventType"
              onChange={handleChange}
              // onChange={(e:) => customHandleChange(handleChange)}
              onBlur={handleBlur}
              type="select"
              value={values.eventType}
              invalid={false}
            >
              <option value="online" label="online">
                Online
              </option>
              <option value="offline" label="offline">
                Offline
              </option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" md="6" className="custom-input pe-md-5">
          <FormGroup>
            <Label className="m-0" htmlFor="startDate">
              Event Start Date<span className="txt-danger"> *</span>
            </Label>
            <Input
              id="startDate"
              name="startDate"
              onChange={handleChange}
              // onChange={() => customHandleChange(handleChange)}
              onBlur={handleBlur}
              type="date"
              value={values.startDate}
              invalid={touched.startDate && !!errors.startDate}
            />
            <FormFeedback>{errors.startDate}</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs="12" md="6" className="custom-input ps-md-5">
          <FormGroup>
            <Label className="m-0" htmlFor="startTime">
              Event Start Time<span className="txt-danger"> *</span>
            </Label>
            <Input
              id="startTime"
              name="startTime"
              onChange={handleChange}
              // onChange={() => customHandleChange(handleChange)}
              onBlur={handleBlur}
              type="time"
              value={values.startTime}
              invalid={touched.startTime && !!errors.startTime}
            />
            <FormFeedback>{errors.startTime}</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs="12" md="6" className="custom-input pe-md-5">
          <FormGroup>
            <Label className="m-0" htmlFor="endDate">
              Event End Date <span className="txt-danger"> *</span>
            </Label>
            <Input
              id="endDate"
              name="endDate"
              onChange={handleChange}
              // onChange={() => customHandleChange(handleChange)}
              onBlur={handleBlur}
              type="date"
              value={values.endDate}
              invalid={touched.endDate && !!errors.endDate}
            />
            <FormFeedback>{errors.endDate}</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs="12" md="6" className="custom-input ps-md-5">
          <FormGroup>
            <Label className="m-0" htmlFor="endTime">
              Event End Time<span className="txt-danger"> *</span>
            </Label>
            <Input
              id="endTime"
              name="endTime"
              // onChange={() => customHandleChange(handleChange)}
              onChange={handleChange}
              onBlur={handleBlur}
              type="time"
              value={values.endTime}
              invalid={touched.endTime && !!errors.endTime}
            />
            <FormFeedback>{errors.endTime}</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs="12" className="custom-input">
          <FormGroup>
            <Label className="m-0">
              Venue <span className="txt-danger"> *</span>
            </Label>

            <Input
              id="venue"
              name="venue"
              // onChange={handleChange}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.venue}
              invalid={touched.venue && !!errors.venue}
            />
            <FormFeedback>{errors.venue}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductOne;
function dispatch(arg0: { payload: any; type: "addProduct/setFormValue" }) {
  throw new Error("Function not implemented.");
}
