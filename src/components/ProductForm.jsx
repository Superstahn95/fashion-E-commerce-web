import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikTextInput from "./FormikTextInput";
import FormikSelectField from "./FormikSelectField";
import FormikTextArea from "./FormikTextArea";
import { useState } from "react";

function ProductForm({ onSubmit, initialData, text, thumbnail }) {
  const [image, setImage] = useState(thumbnail || null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };
  console.log(initialData);

  return (
    <Formik
      initialValues={initialData}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Must be greater than 3 characters")
          .required("Required"),
        price: Yup.number().required("Required"),
        gender: Yup.string().required("Required"),
        // short_description: Yup.string()
        //   .required("Required")
        //   .min(8, "Description should not be below 8 characters")
        //   .max(70, "Description should not be abbove 70 characters"),
      })}
      onSubmit={(values) => {
        console.log("about submitting form");
        console.log(values);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("gender", values.gender);
        formData.append("short_description", values.short_description);
        if (image) formData.append("image", image);
        onSubmit(formData);
      }}
    >
      <Form encType="multipart/form-data">
        <FormikTextInput
          label="Product name"
          name="name"
          type="text"
          placeholder="Enter Product name"
        />

        <FormikTextInput
          label="Product Price"
          name="price"
          type="number"
          placeholder="Enter Product Price"
          directive="This should be a number only field"
        />
        <FormikTextArea
          label="Product Short Description"
          name="short_description"
          placeholder="Enter a short description for this product"
        />
        <FormikSelectField name="gender" label="Select gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </FormikSelectField>
        {/* fetch category */}
        {/* <FormikSelectField name="role" label="User role">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
        </FormikSelectField> */}
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-500 outline-none p-2 w-full rounded-md"
        />
        <div className="my-2">
          <button
            type="submit"
            className="bg-black text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
          >
            {text}
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default ProductForm;
