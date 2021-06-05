import { useForm } from "react-hook-form";

const DishForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name", { required: true })} />
      <input
        type="text"
        {...register("preparation_time", { required: true })}
      />
      <select {...register("type", { required: true })}>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </select>
      <input type="submit" />
    </form>
  );
};

export default DishForm;
