CREATE TABLE brands (
    id serial PRIMARY KEY,
    country CHAR (2) NOT NULL,
    brand VARCHAR (255) NOT NULL,
    has_ingredients BOOLEAN NOT NULL,
    category VARCHAR (255) NOT NULL
)

CREATE TABLE meals (
    id serial PRIMARY KEY,
    brand_id INTEGER REFERENCES brands (id),
    name VARCHAR (255) NOT NULL,
    calories INT NOT NULL
)

CREATE TABLE ingredients (
    id serial PRIMARY KEY,
    meal_id INTEGER REFERENCES meals (id),
    name VARCHAR (255) NOT NULL,
    calories INT NOT NULL
)

CREATE TABLE meals_ingredients (
    meal_id INTEGER REFERENCES meals (id),
    ingredient_id INTEGER REFERENCES ingredients (id)
)