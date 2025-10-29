import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTicketsContext } from "../context/TicketContext";
import { Formik, Form, Field } from "formik";
import { ArrowLeft, Send } from "lucide-react";
import { CommentValidationSchema } from "../language/validation";
import {
  TICKET_STATUSES,
  TICKET_PRIORITIES,
  FIELD_LABELS,
  PLACEHOLDERS,
} from "../language/constants";
import SelectField from "../components/common/SelectField";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";

// Utility for formatting dates
const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Utility for priority badge colors
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-500 text-white";
    case "Medium":
      return "bg-yellow-500 text-gray-900";
    case "Low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ticketId = id ? parseInt(id, 10) : undefined;
  const { getTicketById, changeStatusAndPriority, addComment } =
    useTicketsContext();

  const ticket = useMemo(() => {
    return ticketId ? getTicketById(ticketId) : undefined;
  }, [ticketId, getTicketById]);

  // State to handle editable fields
  const [currentStatus, setCurrentStatus] = useState(ticket?.status || "Open");
  const [currentPriority, setCurrentPriority] = useState(
    ticket?.priority || "Medium"
  );

  React.useEffect(() => {
    if (ticket) {
      setCurrentStatus(ticket.status);
      setCurrentPriority(ticket.priority);
    }
  }, [ticket]);

  // Handle updates to status/priority
  const handleMetadataUpdate = (newStatus: any, newPriority: any) => {
    if (ticketId) {
      changeStatusAndPriority(ticketId, newStatus, newPriority);
    }
  };

  if (!ticket || !ticketId) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold dark:text-white">Ticket Not Found</h2>
        <Link
          to="/"
          className="text-indigo-600 dark:text-indigo-400 hover:underline mt-4 block"
        >
          Go back to the list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <Link
        to="/"
        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Ticket List
      </Link>

      {/* --- Header & Metadata --- */}
      <header className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(
                ticket.priority
              )}`}
            >
              {ticket.priority} Priority
            </span>
            <h1 className="text-4xl font-extrabold mt-2 text-gray-900 dark:text-gray-50">
              {ticket.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Ticket ID: **#{ticket.id}** | Created:{" "}
              {formatDate(ticket.createdAt)}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t pt-4 border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-sm">
            <p className="font-semibold dark:text-gray-300">Customer</p>
            <p className="dark:text-gray-400">{ticket.customerName}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold dark:text-gray-300">Email</p>
            <p className="dark:text-gray-400">{ticket.email}</p>
          </div>
          <div className="flex space-x-4">
            {/* Status Dropdown (Editable - NOW USING SelectField) */}
            <div className="w-1/2">
              <SelectField
                name="status" // Must match a key in FIELD_LABELS or be handled manually
                label="Status" // Manually set label here
                value={currentStatus}
                onChange={(e) => {
                  const newStatus = e.target.value as any;
                  setCurrentStatus(newStatus);
                  handleMetadataUpdate(newStatus, currentPriority);
                }}
                isInvalid={false}
                options={TICKET_STATUSES.map((s) => ({ value: s, label: s }))}
                // Overriding the default SelectField classes to make it smaller for this section
              />
            </div>

            {/* Priority Dropdown (Editable - NOW USING SelectField) */}
            <div className="w-1/2">
              <SelectField
                name="priority" // Must match a key in FIELD_LABELS or be handled manually
                label="Priority" // Manually set label here
                value={currentPriority}
                onChange={(e) => {
                  const newPriority = e.target.value as any;
                  setCurrentPriority(newPriority);
                  handleMetadataUpdate(currentStatus, newPriority);
                }}
                isInvalid={false}
                options={TICKET_PRIORITIES.map((p) => ({
                  value: p,
                  label: p,
                }))}
                // Overriding the default SelectField classes to make it smaller for this section
                // className="!p-2 !rounded-lg !shadow-none text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- Description & Comments --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Issue Description (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Issue Description
            </h2>
            <p className="whitespace-pre-wrap dark:text-gray-300">
              {ticket.description}
            </p>
          </div>

          {/* Comment Thread */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
              Comment Thread ({ticket.comments.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {ticket.comments.length > 0 ? (
                ticket.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-indigo-500 pl-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-md"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {comment.user}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {comment.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No comments yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Add Comment Form (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">
              {FIELD_LABELS.comment}
            </h2>
            <Formik
              initialValues={{ comment: "" }}
              validationSchema={CommentValidationSchema}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                addComment(ticketId, values.comment);
                resetForm();
                setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Using the standard Field for simplicity, but InputField can be adapted */}
                  <Field
                    as="textarea"
                    name="comment"
                    rows={5}
                    placeholder={PLACEHOLDERS.comment}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-3 shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.comment && touched.comment && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.comment}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="w-full flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Update
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
