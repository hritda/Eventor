import React, { useRef, useEffect } from "react";
import { Field, FieldProps, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import FormFeedback from "reactstrap";

interface TinyMCEFieldProps {
  name: string;
}

const TinyMCEField: React.FC<TinyMCEFieldProps> = ({ name }) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <div>
          <Editor
            apiKey="tpi2uulkgk322g153r8rpjnoa6lnjk5twx2qn4upu7g222k4"
            value={field.value}
            onEditorChange={(content) => form.setFieldValue(name, content)}
            onBlur={() => {
              form.setFieldTouched(name, true);
            }}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              invalid_elements: 'p,br',
              branding:false,
              statusbar:false,
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            textareaName={name}
          />
          {form.touched[name] && form.errors[name] && (
           <div style={{fontSize:"0.75rem",color:'red'}}>{form.errors[name] as string}</div>
          )}
          {/* <ErrorMessage name={name} component="div" className="error" /> */}
        </div>
      )}
    </Field>
  );
};

export default TinyMCEField;
