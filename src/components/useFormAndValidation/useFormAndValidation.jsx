import { useState, useCallback } from "react";

function useFormAndValidation() {
  // Состояния для хранения значений полей, ошибок и валидности формы
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Регулярные выражения для проверки ввода email и имени
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const namePattern = /^[a-zA-Zа-яА-Я\s-]+$/;

  // Функция для валидации ввода
  const validateInput = (name, value, input) => {
    if (!input.checkValidity()) {
      return input.validationMessage; // Возвращение стандартной ошибки валидации браузера
    }

    switch (name) {
      case "email":
        if (!emailPattern.test(value)) {
          return "Введите корректный адрес электронной почты.";
        }
        break;
      case "name":
        if (!namePattern.test(value)) {
          return "Имя может содержать только латиницу, кириллицу, пробел или дефис.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  // Обработчик изменения значений полей формы
  const handleChange = (event) => {
    const input = event.target;
    const value = input.value;
    const name = input.name;

    setValues({ ...values, [name]: value });

    const errorMessage = validateInput(name, value, input);
    const updatedErrors = { ...errors, [name]: errorMessage };
    setErrors(updatedErrors);

    const formIsValid = input.closest("form").checkValidity();
    const customErrorsExist = Object.values(updatedErrors).some(
      (error) => error
    );
    setIsValid(formIsValid && !customErrorsExist);
  };

  // Функция для сброса формы к начальному состоянию
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormAndValidation;
