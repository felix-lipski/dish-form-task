import { useForm, useWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "html-duration-picker";
import "./DishForm.scss";
import { Dish, ServerSideErrors } from "./types";

const apiUrl = "https://frosty-wood-6558.getsandbox.com:443/dishes";

const postData = async (data: Dish) =>
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

const DishForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({ mode: "all" });

  const dish_type = useWatch({ control, name: "type", defaultValue: "pizza" });

  const onSubmit = async (data: Dish) => {
    const response = await postData(data);
    const responseJson: Dish | ServerSideErrors = await response.json();

    // Server-side errors
    if (!response.ok) {
      Object.entries(responseJson).forEach(([key, value]) =>
        setError(key, {
          type: "server",
          message: value,
        })
      );
    }

    console.log("Response:", responseJson);
  };

  const fieldRequired = { value: true, message: "Field required!" };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Dish name:</label>
      <input type="text" {...register("name", { required: fieldRequired })} />
      <div className="error">
        <ErrorMessage errors={errors} name="name" />
      </div>

      <label htmlFor="preparation_time">Preparation time:</label>
      <input
        type="text"
        className="html-duration-picker"
        {...register("preparation_time", { required: fieldRequired })}
      />
      <div className="error">
        <ErrorMessage errors={errors} name="preparation_time" />
      </div>

      <label htmlFor="type">Dish type:</label>
      <select {...register("type", { required: fieldRequired })}>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>
      <div className="error">
        <ErrorMessage errors={errors} name="type" />
      </div>

      {dish_type === "pizza" ? (
        <div className="pizza-group">
          <label htmlFor="diameter">Diameter:</label>
          <input
            type="number"
            step="0.1"
            defaultValue="30"
            {...register("diameter", {
              required: fieldRequired,
              shouldUnregister: true,
              setValueAs: (value: string) => parseFloat(value),
            })}
          />
          <div className="error">
            <ErrorMessage errors={errors} name="diameter" />
          </div>

          <label htmlFor="no_of_slices">Slices:</label>
          <input
            type="number"
            min="1"
            defaultValue="8"
            {...register("no_of_slices", {
              required: fieldRequired,
              shouldUnregister: true,
              setValueAs: (value: string) => parseInt(value),
            })}
          />
          <div className="error">
            <ErrorMessage errors={errors} name="no_of_slices" />
          </div>
        </div>
      ) : dish_type === "soup" ? (
        <>
          <div />
          <label htmlFor="spiciness_scale">Spiciness:</label>
          <input
            type="range"
            min="1"
            max="10"
            defaultValue="5"
            {...register("spiciness_scale", {
              required: fieldRequired,
              shouldUnregister: true,
              setValueAs: (value: string) => parseInt(value),
            })}
          />
          <div className="error">
            <ErrorMessage errors={errors} name="spiciness_scale" />
          </div>
        </>
      ) : dish_type === "sandwich" ? (
        <>
          <label htmlFor="slices_of_bread">Bread slices:</label>
          <input
            type="number"
            min="1"
            defaultValue="2"
            {...register("slices_of_bread", {
              required: fieldRequired,
              shouldUnregister: true,
              setValueAs: (value: string) => parseInt(value),
            })}
          />
          <div className="error">
            <ErrorMessage errors={errors} name="slices_of_bread" />
          </div>
        </>
      ) : null}

      <input type="submit" />
    </form>
  );
};

export default DishForm;
