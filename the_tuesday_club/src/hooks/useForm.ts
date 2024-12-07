import { useState } from "react";

interface FormFields {
  [key: string]: string;
}

const useForm = (initialValues: FormFields) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value); // Opdater fejl hvis feltet ændres
    }
  };

  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "postalCode" && (!/^\d{4}$/.test(value))) {
      error = "Postal code must be exactly 4 digits.";
    }
    if (field === "password" && value.length < 8) {
      error = "Password must be at least 8 characters long.";
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error; // Returner true, hvis der ikke er fejl
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(values).forEach(([field, value]) => {
      if (!validateField(field, value)) {
        newErrors[field] = errors[field] || "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returner true, hvis der ikke er fejl
  };

  return {
    values,
    errors,
    handleChange,
    validateField,
    validateForm,
  };
};

export default useForm;
