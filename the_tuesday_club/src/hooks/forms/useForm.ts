import { useState } from "react";

const useForm = (initialValues: { [key: string]: string }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Valider feltet direkte efter ændring
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required.";
    } else if (field === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email format.";
    } else if (field === "postalCode" && !/^\d{4}$/.test(value)) {
      error = "Postal code must be exactly 4 digits.";
    } else if (field === "password" && value.length < 8) {
      error = "Password must be at least 8 characters long.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(values).forEach((field) => {
      const value = values[field];
      if (!value.trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validateForm };
};

export default useForm;
