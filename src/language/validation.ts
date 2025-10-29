import * as Yup from "yup";

export const TicketValidationSchema = Yup.object().shape({
  customerName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Customer Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  priority: Yup.string()
    .oneOf(["Low", "Medium", "High"], "Invalid priority")
    .required("Priority is required"),
});

export const CommentValidationSchema = Yup.object().shape({
  comment: Yup.string()
    .min(5, "Comment must be at least 5 characters")
    .required("Comment cannot be empty"),
});
