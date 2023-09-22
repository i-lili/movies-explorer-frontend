import { useState, useCallback } from "react";

// Хук для управления формой и её валидацией
function useFormAndValidation() {
  // Состояние для хранения значений полей формы
  const [values, setValues] = useState({});
  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({});
  // Состояние для хранения общей валидности формы
  const [isValid, setIsValid] = useState(false);

  // Обработчик изменения полей формы
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Обновляем состояние значений и ошибок при изменении поля
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });

    // Обновляем состояние валидности формы
    setIsValid(target.closest("form").checkValidity());
  };

  // Функция для сброса состояний формы
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  // Возвращаем объект с данными формы, методами и состоянием
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
