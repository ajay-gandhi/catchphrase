import Animals from "./wordlists/animals";
import Easy from "./wordlists/easy";
import FoodCooking from "./wordlists/food_cooking";
import Hard from "./wordlists/hard";
import HouseholdItems from "./wordlists/household_items";
import Medium from "./wordlists/medium";
import People from "./wordlists/people";
import Travel from "./wordlists/travel";

const categoryMap = {
  "Animals": Animals,
  "Easy": Easy,
  "Food/Cooking": FoodCooking,
  "Hard": Hard,
  "Household Items": HouseholdItems,
  "Medium": Medium,
  "People": People,
  "Travel": Travel,
};

export const categories = Object.keys(categoryMap);
export const getWords = category => categoryMap[category].words;
