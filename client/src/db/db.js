const foods = [
  { id: 1, title: "Coca", price: 3.5, image: require("../images/coca.png") },
  { id: 2, title: "Burger", price: 15, image: require("../images/burger.png") },
  {
    id: 3,
    title: "Pizza",
    price: 17.99,
    image: require("../images/coca.png"),
  },
  {
    id: 4,
    title: "Kebab",
    price: 13.99,
    image: require("../images/kebab.png"),
  },
  {
    id: 5,
    title: "Bottle of water",
    price: 0.99,
    image: require("../images/kebab.png"),
  },
  {
    id: 6,
    title: "Bottle of water",
    price: 0.99,
    image: require("../images/pizza.png"),
  },
  {
    id: 7,
    title: "Bottle of water",
    price: 0.99,
    image: require("../images/salad.png"),
  },
  {
    id: 8,
    title: "Bottle of water",
    price: 0.99,
    image: require("../images/water.png"),
  },
    {
    id: 9,
    title: "Bottle of water",
    price: 0.99,
    image: require("../images/kebab.png"),
  },
];

const getData = () => {
  return foods;
};

module.exports = { getData };
