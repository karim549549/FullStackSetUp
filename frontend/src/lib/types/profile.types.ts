export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum ACTIVITY_LEVEL {
  SEDENTARY = "SEDENTARY",
  LIGHTLY_ACTIVE = "LIGHTLY_ACTIVE",
  MODERATELY_ACTIVE = "MODERATELY_ACTIVE",
  VERY_ACTIVE = "VERY_ACTIVE",
  EXTRA_ACTIVE = "EXTRA_ACTIVE"
}

export enum MEDICATION {
  DIURETICS = "DIURETICS",
  ACE_INHIBITORS = "ACE_INHIBITORS",
  STATINS = "STATINS",
  ANTICOAGULANTS = "ANTICOAGULANTS",
  DIABETES_MEDS = "DIABETES_MEDS",
  MAO_INHIBITORS = "MAO_INHIBITORS",
  CORTICOSTEROIDS = "CORTICOSTEROIDS",
  ANTACIDS = "ANTACIDS",
  THYROID = "THYROID",
  IMMUNOSUPPRESSANTS = "IMMUNOSUPPRESSANTS"
}

export enum FOOD_INTOLERANCE {
  LACTOSE = "LACTOSE",
  GLUTEN = "GLUTEN",
  NUTS = "NUTS",
  SHELLFISH = "SHELLFISH",
  EGGS = "EGGS",
  SOY = "SOY",
  FISH = "FISH",
  PEANUTS = "PEANUTS",
  WALNUTS = "WALNUTS",
  CELERY = "CELERY",
  MUSTARD = "MUSTARD",
  SESAME = "SESAME",
  SULPHITES = "SULPHITES",
  SUGAR = "SUGAR",
  SUGAR_ALCOHOLS = "SUGAR_ALCOHOLS",
  XANTHAN_GUM = "XANTHAN_GUM",
  POTASSIUM = "POTASSIUM",
  PHOSPHORUS = "PHOSPHORUS",
  SODIUM = "SODIUM",
  IODINE = "IODINE",
  CALCIUM = "CALCIUM",
  CORN = "CORN",
  TOMATO = "TOMATO",
  CHOCOLATE = "CHOCOLATE",
  STRAWBERRY = "STRAWBERRY",
  BEEF = "BEEF",
  PORK = "PORK",
  CITRUS_FRUITS = "CITRUS_FRUITS",
  DAIRY = "DAIRY"
}

export interface DietFormProfile {
  weight: number;
  height: number;
  birthdate: string;
  gender: GENDER;
  activityLevel: ACTIVITY_LEVEL;
  medications: MEDICATION[];
  smoke: boolean;
  foodIntolerances: FOOD_INTOLERANCE[];
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  kosher: boolean;
}
