import { useForm, useWatch } from "react-hook-form";
import "html-duration-picker";
import { Dish } from "./types";

const DishForm = () => {
  const { register, handleSubmit, control } = useForm();

  const dish_type = useWatch({ control, name: "type", defaultValue: "pizza" });

  const onSubmit = (data: Dish) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name", { required: true })} />
      <input
        type="text"
        className="html-duration-picker"
        {...register("preparation_time", { required: true })}
      />
      <select {...register("type", { required: true })}>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>

      {dish_type === "pizza" ? (
        <div>
          <input
            type="number"
            step="0.1"
            defaultValue="30"
            {...register("diameter", {
              required: true,
              shouldUnregister: true,
              setValueAs: (value: string) => parseFloat(value),
            })}
          />
          <input
            type="number"
            min="1"
            defaultValue="8"
            {...register("no_of_slices", {
              required: true,
              shouldUnregister: true,
              setValueAs: (value: string) => parseInt(value),
            })}
          />
        </div>
      ) : dish_type === "soup" ? (
        <>
          <div />
          <input
            type="range"
            min="1"
            max="10"
            defaultValue="5"
            {...register("spiciness_scale", {
              required: true,
              shouldUnregister: true,
              setValueAs: (value: string) => parseInt(value),
            })}
          />
        </>
      ) : dish_type === "sandwich" ? (
        <input
          type="number"
          min="1"
          defaultValue="2"
          {...register("slices_of_bread", {
            required: true,
            shouldUnregister: true,
            setValueAs: (value: string) => parseInt(value),
          })}
        />
      ) : null}

      <input type="submit" />
    </form>
  );
};

export default DishForm;
