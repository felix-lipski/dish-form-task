type PrepTime = `${number}${number}:${number}${number}:${number}${number}`;

type DishType = "pizza" | "soup" | "sandwich";

type Spiciness = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Dish {
  name: string;
  preparation_time: PrepTime;
  type: DishType;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: Spiciness;
  slices_of_bread?: number;
}
