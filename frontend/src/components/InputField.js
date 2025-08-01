const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = true,
  error,
  placeholder,
  inputClassName,
  labelClassName,
  errorClassName,
  wrapperClassName,
  ...rest
}) => (
  <div className={wrapperClassName}>
    <label htmlFor={id} className={labelClassName}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={inputClassName}
      {...rest}
    />
    {error && (
      <div id={`${id}-error`} className={errorClassName}>
        {error}
      </div>
    )}
  </div>
);

export default InputField;
