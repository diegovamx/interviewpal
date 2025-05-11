import React from "react";
import { Controller } from "react-hook-form";

interface FormFieldrops<T extends FieldValues> {
  control: Control<T>;
  name: path

}

const FormField = ({control, name, label, placeholder, type = "text"}: FormFieldrops<T>) => (
 <Controller name={name} control={control} render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" {...field} />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;
