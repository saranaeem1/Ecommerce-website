
export const validateFeedbackForm = ({ name, email, phone, details }) => {
  const errors = {};

  // Check if all required fields are filled
  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  if (!phone) errors.phone = "Phone number is required";
  if (!details) errors.details = "Details are required";

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (email && !emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate phone format (assuming a basic 11-digit number)
  const phoneRegex = /^\d{11}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.phone = "Please enter a valid phone number (11 digits)";
  }

  return errors;
};
