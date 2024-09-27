import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
import { Toaster, toast } from "sonner"; // Import the toast component and function

const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram
  ? window.Telegram.WebApp
  : {
      ready: () => console.log("Mock ready"),
      MainButton: {
        text: "",
        show: () => console.log("Mock MainButton show"),
        sendData: (data) => console.log("Mock sendData:", data),
      },
    };

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Create a reference for the order form
  const orderFormRef = useRef(null);

  useEffect(() => {
    tele.ready();
  }, []);

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    setShowForm(true); // Show the order form
  };

  // Scroll to the order form when it is shown
  useEffect(() => {
    if (showForm && orderFormRef.current) {
      orderFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showForm]); // Only run when showForm changes

  const handleFormSubmit = () => {
    const orderDetails = {
      name,
      phone,
      comments,
      items: cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cartItems.reduce((a, c) => a + c.price * c.quantity, 0),
    };

    tele.MainButton.text = "Confirm Order";
    tele.MainButton.show();

    fetch("http://localhost:5000/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order submitted successfully:", data);
        toast("Your order has been submitted successfully!"); // Show success toast notification
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        toast("There was an error submitting your order. Please try again."); // Show error toast notification
      });

    setCartItems([]);
    setName("");
    setPhone("");
    setComments("");
    setShowForm(false);
  };

  return (
    <>
      <Toaster />{" "}
      {/* Add the Toaster component to render the toast notifications */}
      <div className="heading">
        <p className="order-perfume">Order</p>
        <p className="my-perfume">My Perfume</p>
      </div>
      <div className="container">
        <div className="cards__container">
          {foods.map((food) => (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          ))}
        </div>
        <Cart cartItems={cartItems} onCheckout={onCheckout} />
      </div>
      {showForm && (
        <div className="order-form" ref={orderFormRef}>
          <h2>Please Enter Your Details</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Any comments?"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <button onClick={handleFormSubmit}>Submit Order</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default App;

// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
// import Card from "./Components/Card/Card";
// import Cart from "./Components/Cart/Cart";
// import { Toaster, toast } from "sonner";

// const { getData } = require("./db/db");
// const foods = getData();

// const tele = window.Telegram
//   ? window.Telegram.WebApp
//   : {
//       ready: () => console.log("Mock ready"),
//       MainButton: {
//         text: "",
//         show: () => console.log("Mock MainButton show"),
//         sendData: (data) => console.log("Mock sendData:", data),
//       },
//     };

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [comments, setComments] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const orderFormRef = useRef(null);

//   useEffect(() => {
//     tele.ready();
//   }, []);

//   const onAdd = (food) => {
//     const exist = cartItems.find((x) => x.id === food.id);
//     if (exist) {
//       setCartItems(
//         cartItems.map((x) =>
//           x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...food, quantity: 1 }]);
//     }
//   };

//   const onRemove = (food) => {
//     const exist = cartItems.find((x) => x.id === food.id);
//     if (exist.quantity === 1) {
//       setCartItems(cartItems.filter((x) => x.id !== food.id));
//     } else {
//       setCartItems(
//         cartItems.map((x) =>
//           x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
//         )
//       );
//     }
//   };

//   const onCheckout = () => {
//     setShowForm(true);
//   };

//   useEffect(() => {
//     if (showForm && orderFormRef.current) {
//       orderFormRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }, [showForm]);

//   const handleFormSubmit = () => {
//     const orderDetails = {
//       name,
//       phone,
//       comments,
//       items: cartItems.map((item) => ({
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//       })),
//       total: cartItems.reduce((a, c) => a + c.price * c.quantity, 0),
//     };

//     tele.MainButton.text = "Confirm Order";
//     tele.MainButton.show();

//     fetch(
//       `${process.env.REACT_APP_API_URL || "http://localhost:3000"}/webhook`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderDetails),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Order submitted successfully:", data);
//         toast("Your order has been submitted successfully!");
//       })
//       .catch((error) => {
//         console.error("Error submitting order:", error);
//         toast("There was an error submitting your order. Please try again.");
//       });

//     setCartItems([]);
//     setName("");
//     setPhone("");
//     setComments("");
//     setShowForm(false);
//   };

//   return (
//     <>
//       <Toaster />
//       <div className="heading">
//         <p className="order-perfume">Order</p>
//         <p className="my-perfume">My Perfume</p>
//       </div>
//       <div className="container">
//         <div className="cards__container">
//           {foods.map((food) => (
//             <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
//           ))}
//         </div>
//         <Cart cartItems={cartItems} onCheckout={onCheckout} />
//       </div>
//       {showForm && (
//         <div className="order-form" ref={orderFormRef}>
//           <h2>Please Enter Your Details</h2>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Your Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Any comments?"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           />
//           <button onClick={handleFormSubmit}>Submit Order</button>
//           <button onClick={() => setShowForm(false)}>Cancel</button>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
// import Card from "./Components/Card/Card";
// import Cart from "./Components/Cart/Cart";
// import { Toaster, toast } from "sonner";

// const { getData } = require("./db/db");
// const foods = getData();

// const tele = window.Telegram
//   ? window.Telegram.WebApp
//   : {
//       ready: () => console.log("Mock ready"),
//       MainButton: {
//         text: "",
//         show: () => console.log("Mock MainButton show"),
//         sendData: (data) => console.log("Mock sendData:", data),
//       },
//     };

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [comments, setComments] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const orderFormRef = useRef(null);
//   const socketRef = useRef(null);

//   // WebSocket Connection
//   useEffect(() => {
//     socketRef.current = new WebSocket("ws://localhost:3000");

//     socketRef.current.onopen = () => {
//       console.log("WebSocket connection established");
//     };

//     socketRef.current.onmessage = (event) => {
//       console.log("Message from server:", event.data);
//     };

//     socketRef.current.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     socketRef.current.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     return () => socketRef.current.close();
//   }, []);

//   const onAdd = (food) => {
//     const exist = cartItems.find((x) => x.id === food.id);
//     if (exist) {
//       setCartItems(
//         cartItems.map((x) =>
//           x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...food, quantity: 1 }]);
//     }
//   };

//   const onRemove = (food) => {
//     const exist = cartItems.find((x) => x.id === food.id);
//     if (exist.quantity === 1) {
//       setCartItems(cartItems.filter((x) => x.id !== food.id));
//     } else {
//       setCartItems(
//         cartItems.map((x) =>
//           x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
//         )
//       );
//     }
//   };

//   const onCheckout = () => {
//     setShowForm(true);
//   };

//   useEffect(() => {
//     if (showForm && orderFormRef.current) {
//       orderFormRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }, [showForm]);

//   const handleFormSubmit = () => {
//     const orderDetails = {
//       name,
//       phone,
//       comments,
//       items: cartItems.map((item) => ({
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//       })),
//       total: cartItems.reduce((a, c) => a + c.price * c.quantity, 0),
//     };

//     tele.MainButton.text = "Confirm Order";
//     tele.MainButton.show();

//     fetch("http://localhost:3000/webhook", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(orderDetails),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Order submitted successfully:", data);
//         toast("Your order has been submitted successfully!");
//       })
//       .catch((error) => {
//         console.error("Error submitting order:", error);
//         toast("There was an error submitting your order. Please try again.");
//       });

//     setCartItems([]);
//     setName("");
//     setPhone("");
//     setComments("");
//     setShowForm(false);
//   };

//   return (
//     <>
//       <Toaster />
//       <div className="heading">
//         <p className="order-perfume">Order</p>
//         <p className="my-perfume">My Perfume</p>
//       </div>
//       <div className="container">
//         <div className="cards__container">
//           {foods.map((food) => (
//             <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
//           ))}
//         </div>
//         <Cart cartItems={cartItems} onCheckout={onCheckout} />
//       </div>
//       {showForm && (
//         <div className="order-form" ref={orderFormRef}>
//           <h2>Please Enter Your Details</h2>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Your Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Any comments?"
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           />
//           <button onClick={handleFormSubmit}>Submit Order</button>
//           <button onClick={() => setShowForm(false)}>Cancel</button>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

