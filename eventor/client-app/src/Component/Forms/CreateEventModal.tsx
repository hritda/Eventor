import { Close, ModalTitle, SomethingWentWrong } from "../../utils/Constant";
import CommonModal from "../../Data/Ui-Kits/Modal/CommonModal";
import { Btn, H4, Image, LI, P, UL } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import useUI from "../../ReduxToolkit/Hooks/useUi";
import { useDispatch } from "react-redux";
import { API_ROUTES,BASE_URL } from "../../Routes/apiRoutes";
import { closeModal, openModal } from "../../ReduxToolkit/Reducers/UiSlice";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { FormErrors, FormValues } from "../../DefinedTypes/types";
import { useAuth } from "../Providers/AuthContext";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { AiFillCloseSquare } from "react-icons/ai";
import { error } from "console";
import Swal from "sweetalert2";
interface CreateEventModalProps {}
const CreateEventModal: React.FC<CreateEventModalProps> = ({}) => {
  const ModalName = "CreateEvent";
  const { modalType } = useUI();
  const {auth,token} = useAuth();
  const dispatch = useDispatch();
  const initialEventValues: FormValues = {
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    eventType: "",
  };
  const validate = (values: FormValues): FormErrors => {
    console.log("entered validation form");
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

    return errors;
  };
  const onCreateEventSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log("entered submit");
    console.log(values);
   
    const userId = auth?.uid;
    let tokenValue = token ; 
    
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
      organisedUserId: userId
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(payload)
    };
    handleToggleModal(false);
    fetch(`${BASE_URL}${API_ROUTES.CREATE_EVENT}${userId}`, requestOptions)
    .then((response)=>response.json())
    .then((data)=>{
      if(data.statusCode == 200){
        console.log("event created",data);
        Swal.fire({
          title: "Yay!",
          text: `${data.message}`,
          icon: "success",
          timer: 1300
        });
      } else {
        console.log("event creation failed", data);
        Swal.fire({
          title: "OOPS!",
          text: `${data.message}`,
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    }).catch((error) => {
      console.log(error);
    })
  };

  const handleToggleModal = (value: boolean) => {
    value ? dispatch(openModal(ModalName)) : dispatch(closeModal(ModalName));
  };
  return (
    <CommonModal
      centered
      isOpen={modalType.includes(ModalName)}
      onClosed={() => handleToggleModal(false)}
    >
      <ModalHeader className="d-flex flex-row justify-content-between align-items-center pt-2 px-1">
        <span className="fs-5">Create Event</span>
      
        <Btn
          className="close-btn"
          onClick={() => handleToggleModal(false)}
          aria-label="Close"
          style={{ position: "absolute", top:"15px",right:"0px", marginRight:"0px"}}
        >
          <AiFillCloseSquare color="red" size={30} />
        </Btn>
         
        </ModalHeader>
      
      <div className="modal-toggle-wrapper">
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
            handleSubmit,
            isSubmitting,
          }) => (
            <Form>
              <FormGroup className="mx-3">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.eventName}
                  invalid={touched.eventName && !!errors.eventName}
                />
                <FormFeedback>{errors.eventName}</FormFeedback>
              </FormGroup>
              <FormGroup className="mx-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  invalid={touched.description && !!errors.description}
                />
                <FormFeedback>{errors.description}</FormFeedback>
              </FormGroup>
              <FormGroup className="mx-3">
                <Label htmlFor="eventType">Mode of Event</Label>
                <Input 
                  id="eventType"
                  name="eventType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="select"
                  value = {values.eventType}
                  invalid = {false}
                >
                  <option value = "online" label="online">Online</option>
                  <option value = "offline" label = "offline">Offline</option>
                </Input>
              </FormGroup>
              <FormGroup className="mx-3">
                <Label htmlFor="startDate">Event Start Date</Label>
                <Input 
                  id="startDate"
                  name="startDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="date"
                  value={values.startDate}
                  invalid={touched.startDate && !!errors.startDate}
                />
                <FormFeedback>{errors.startDate}</FormFeedback>
              </FormGroup>
              <FormGroup className="mx-3">
                <Label htmlFor="endDate">Event End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="date"
                  value={values.endDate}
                  invalid={touched.endDate && !!errors.endDate}
                />
                <FormFeedback>{errors.endDate}</FormFeedback>
              </FormGroup>

              <FormGroup className="mx-3">
                <Label htmlFor="startTime">Event Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="time"
                  value={values.startTime}
                  invalid={touched.startTime && !!errors.startTime}
                />
                <FormFeedback>{errors.startTime}</FormFeedback>
              </FormGroup>

              <FormGroup className="mx-3">
                <Label htmlFor="endTime">Event End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="time"
                  value={values.endTime}
                  invalid={touched.endTime && !!errors.endTime}
                />
                <FormFeedback>{errors.endTime}</FormFeedback>
              </FormGroup>
              <FormGroup className="mx-3">
                <Label htmlFor="venue">Venue</Label>
                <Input
                  id="venue"
                  name="venue"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.venue}
                  invalid={touched.venue && !!errors.venue}
                />
                <FormFeedback>{errors.venue}</FormFeedback>
              </FormGroup>
              <ModalFooter className="pt-4">
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Create Event
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
        {/* <Btn
          color="primary"
          className="d-flex m-auto"
          onClick={() => handleToggleModal(false)}
        >
          {Close}
        </Btn> */}
      </div>
    </CommonModal>
  );
};

export default CreateEventModal;
