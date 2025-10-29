import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useTicketsContext } from "../context/TicketContext";
import { TicketValidationSchema } from "../language/validation";
import { TICKET_PRIORITIES, PLACEHOLDERS } from "../language/constants";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import Button from "../components/common/Button"; // Assumed component

const initialValues = {
  customerName: "",
  email: "",
  title: "",
  description: "",
  priority: "Medium",
};

const CreateTicketPage: React.FC = () => {
  const { createTicket } = useTicketsContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b pb-3">
        Create New Support Ticket
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={TicketValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // Omit status (it's set to 'Open' by the service)
          const { status, ...dataToCreate } = values;
          createTicket(dataToCreate as any);
          resetForm();
          setSubmitting(false);
          navigate("/"); // Navigate to list after creation
        }}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                name="customerName"
                value={values.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.customerName && touched.customerName}
                validationMessage={errors.customerName}
                placeholder={PLACEHOLDERS.customerName}
              />
              <InputField
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email && touched.email}
                validationMessage={errors.email}
                placeholder={PLACEHOLDERS.email}
              />
            </div>

            <InputField
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.title && touched.title}
              validationMessage={errors.title}
              placeholder={PLACEHOLDERS.title}
            />

            <InputField
              name="description"
              as="textarea"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.description && touched.description}
              validationMessage={errors.description}
              placeholder={PLACEHOLDERS.description}
            />

            <SelectField
              name="priority"
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.priority && touched.priority}
              validationMessage={errors.priority}
              options={TICKET_PRIORITIES.map((p) => ({ value: p, label: p }))}
            />

            <div className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTicketPage;
