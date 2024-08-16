import { Button, Col, Row, TabContent, TabPane } from "reactstrap";
import ProductOne from "./ProductOne";
import ProductTwo from "./ProductTwo";
import ProductThree from "./ProductThree";
import ProductFour from "./ProductFour";
import ProductFive from "./ProductFive";
import { useAppSelector } from "../../../../../ReduxToolkit/Hooks";
import CommonButton from "../CommonButton/CommonButton";
import { FormErrors, FormValues } from "../../../../../DefinedTypes/types";
import { FieldProps, Form, Formik, FormikHelpers, useField } from "formik";
import { setFormValue } from "../../../../../ReduxToolkit/AddProductSlice";
import { useDispatch } from "react-redux";
import { Btn } from "../../../../../AbstractElements";
import Swal from "sweetalert2";
import { startRefetch } from "../../../../../ReduxToolkit/Reducers/UiSlice";
import { BASE_URL, API_ROUTES } from "../../../../../Routes/apiRoutes";
import { useAuth } from "../../../../Providers/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import useUI from "../../../../../ReduxToolkit/Hooks/useUi";

const ProductTabContent = () => {
  const {eventFormMode} = useUI();
  const { navId } = useAppSelector((state) => state.addProduct);
  const { auth, token } = useAuth();
  const navigate = useNavigate();
  if(eventFormMode==="Edit"){
    const { uid } = useParams();
    
  }
  
  const dispatch = useDispatch();
  let initialEventValues: FormValues = {
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    eventType: "offline",
  };

  // const handleCustomChange = (e:React.ChangeEvent<HTMLInputElement>,field:FieldProps['field']) => {
  //   // const [field,meta,helpers] = useField(e.target.name);
  //   // handleChange(e); // Formik's handleChange
  //   console.log("handle custom called");
  //   field.onChange(e);
  //   dispatch(setFormValue({name:"eventName",value:e.target.value}));
  // }

  const validate = (values: FormValues): FormErrors => {
    console.log("entered validation form:", values);
    const errors: FormErrors = {};

    if (values.eventName == "") {
      errors.eventName = "Name is required";
    }

    if (values.description == "") {
      errors.description = "Description is required";
    }

    if (values.startDate == "") {
      errors.startDate = "Start date is required";
    }

    if (values.endDate == "") {
      errors.endDate = "End date is required";
    } else if (values.startDate && values.endDate < values.startDate) {
      errors.endDate = "End date can't be before start date";
    }

    if (values.startTime == "") {
      errors.startTime = "Start time is required";
    }
    if (values.venue == "") {
      errors.venue = "Venue is required";
    }

    if (values.endTime == "") {
      errors.endTime = "End time is required";
    } else if (
      values.startDate === values.endDate &&
      values.startTime &&
      values.endTime < values.startTime
    ) {
      errors.endTime = "End time should be greater than start time";
    }
    console.log("form validation errors:", errors);
    return errors;
  };
  const customHandleChange =
    (handleChange: (e: React.ChangeEvent<any>) => void) =>
    (event: React.ChangeEvent<any>) => {
      console.log("entered in handlecustom change:");
      handleChange(event);
      dispatch(
        setFormValue({ name: event.target.name, value: event.target.value })
      );
    };
  const onCreateEventSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log("entered submit");
    console.log(values);

    const userId = auth?.uid;
    let tokenValue = token;

    // handleToggleModal(false);
    const payload = {
      venue: values.venue,
      description: values.description,
      startDate: values.startDate,
      eventName: values.eventName,
      endDate: values.endDate,
      startTime: `${values.startTime}:00`,
      endTime: `${values.endTime}:00`,
      eventType: values.eventType,
      organisedUserId: userId,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(payload),
    };

    fetch(`${BASE_URL}${API_ROUTES.CREATE_EVENT}${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          console.log("event created", data);
          dispatch(startRefetch("EventList"));
          Swal.fire({
            title: "Yay!",
            text: `${data.message}`,
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
         navigate("/users/dashboard");
        } else {
          console.log("event creation failed", data);
          Swal.fire({
            title: "OOPS!",
            text: `${data.message}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Col xxl="9" xl="8" className="box-col-8 position-relative">
      <Formik
        initialValues={initialEventValues}
        validate={validate}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={onCreateEventSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setSubmitting,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <TabContent activeTab={navId}>
              <TabPane tabId={1}>
                <ProductOne
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={errors}
                  handleChange={customHandleChange(handleChange)}
                  handleBlur={handleBlur}
                  touched={touched}
                />
              </TabPane>
              <TabPane tabId={2}>
                <ProductTwo />
              </TabPane>
              {/* <TabPane tabId={3} >
          <ProductFour />
        </TabPane>
        <TabPane tabId={4} >
          <ProductFive />
        </TabPane> */}
              {/* <TabPane tabId={5} >
          <ProductFive />
        </TabPane> */}
            </TabContent>
            <Row>
              <Col md="6">
                {navId == 2 && (
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    Create Event
                  </Button>
                )}
              </Col>
              <Col md="6">
                <CommonButton />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default ProductTabContent;
function handleChange(e: any) {
  throw new Error("Function not implemented.");
}
