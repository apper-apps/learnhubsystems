import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ 
  label, 
  error, 
  required = false,
  className = "",
  ...inputProps 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={inputProps.id}>
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <Input error={error} {...inputProps} />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormField;