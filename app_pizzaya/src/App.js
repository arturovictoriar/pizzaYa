import React from "react";

const trackingDailyPizzaYa = [];

class PizzaYa extends React.Component {
  state = {
    toppingOptions: {
      carne: {
        amount: 1,
      },
      pepperoni: {
        amount: 1,
      },
      tocineta: {
        amount: 1,
      },
      jamon: {
        amount: 1,
      },
      chorizo: {
        amount: 1,
      },
      pollo: {
        amount: 1,
      },
      salami: {
        amount: 1,
      },
      cebolla: {
        amount: 1,
      },
      jalapeño: {
        amount: 1,
      },
      champiñon: {
        amount: 1,
      },
      piña: {
        amount: 1,
      },
      maiz: {
        amount: 1,
      },
      aceituna: {
        amount: 1,
      },
      pimenton: {
        amount: 1,
      },
      oregano: {
        amount: 1,
      },
      tomate: {
        amount: 1,
      },
      ciruela: {
        amount: 1,
      },
    },
    selectedToppings: [],
    basePrice: 10000,
    toppingPrice: 3000,
    chikenToppingPrice: 5000,
    peperoniToppingPrice: 4500,
    totalPrice: 0,
    orderConfirmed: false,
    username: "",
    telephone: "",
    namePizza: "",
    date: "",
    checkTrackingDaily: false,
    allNamePizzas: [
        'La light',
        'La simple',
        'La duo',
        'Trifasica',
        'Muy poquito',
        'La garosa',
        'Hasta estallar'
    ]
  };

  confirmOrderBtnRef = React.createRef();
  closeConfirmationBtnRef = React.createRef();
  openTrackingTable = React.createRef();
  closeTrackingTable = React.createRef();

  handleToppingOptionClick = (e) => {
    if (e.target.className === "topping-input") {
      const selectedTopping = e.target.id;

      this.state.selectedToppings.includes(selectedTopping)
        ? this.setState((prevState) => ({
            selectedToppings: prevState.selectedToppings.filter(
              (topping) => topping !== selectedTopping
            ),
          }))
        : this.setState((prevState) => ({
            selectedToppings: [...prevState.selectedToppings, selectedTopping],
          }));
    }
  };

  handleOrderSubmit = () => {
    this.setState(
      (prevState) => ({ orderConfirmed: !prevState.orderConfirmed }),
      () => {
        if (this.state.orderConfirmed) {
          this.closeConfirmationBtnRef.current.focus();
          this.setState({ totalPrice: parseInt(this.totalPricePizzaYa()) });
          this.setState({ date: new Date().toLocaleString() });
          switch(this.state.selectedToppings.length) {
            case 0:
                this.setState({ namePizza: this.state.allNamePizzas[0] });
            break;
            case 1:
                this.setState({ namePizza: this.state.allNamePizzas[1] });
            break;
            case 2:
                this.setState({ namePizza: this.state.allNamePizzas[2] });
            break;
            case 3:
                this.setState({ namePizza: this.state.allNamePizzas[3] });
            break;
            case 4: case 6: case 7: case 8: case 9: case 10:
                this.setState({ namePizza: this.state.allNamePizzas[4] });
            break;
            case 11: case 12: case 13: case 14:
                this.setState({ namePizza: this.state.allNamePizzas[5] });
            break;
            default:
                this.setState({ namePizza: this.state.allNamePizzas[6] });
          }
        } else {
          this.confirmOrderBtnRef.current.focus();
          this.saveOrder();
          console.log(trackingDailyPizzaYa, this.state.selectedToppings);
          this.cleanUp();
          alert(
            "Tu orden ha sido recibida, en breve estara contigo. Disfrutala!"
          );
        }
      }
    );
  };

  cleanUp = () => {
    this.setState({ username: "" });
    this.setState({ telephone: "" });
    this.setState({ namePizza: "" });
    this.setState({ totalPrice: 0 });
    this.setState({ date: "" });
  };

  saveOrder = () => {
    const order = {};
    order.username = this.state.username;
    order.telephone = this.state.telephone;
    order.namePizza = this.state.namePizza;
    order.totalPrice = this.state.totalPrice;
    order.date = this.state.date;
    order.numberPiza = 1;
    order.toppings = this.state.selectedToppings;
    trackingDailyPizzaYa.push(order);
  };

  handleCheckingTracking = () => {
    this.setState(
      (prevState) => ({ checkTrackingDaily: !prevState.checkTrackingDaily }),
      () => {
        if (this.state.checkTrackingDaily) {
          this.closeTrackingTable.current.focus();
        } else {
          this.openTrackingTable.current.focus();
        }
      }
    );
  };

  totalPricePizzaYa = () => {
    let total = this.state.basePrice;
    this.state.selectedToppings.map((topping) => {
      if (topping === "pollo") {
        total += this.state.chikenToppingPrice;
      } else if (topping === "pepperoni") {
        total += this.state.peperoniToppingPrice;
      } else {
        total += this.state.toppingPrice;
      }
      return total;
    });
    return total.toString();
  };

  handleName = (event) => {
    this.setState({ username: event.target.value });
  };

  handleTelephone = (event) => {
    this.setState({ telephone: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Header
          openTrackingTable={this.openTrackingTable}
          handleCheckingTracking={this.handleCheckingTracking}
        />
        <main>
          <div className="container">
            <ToppingSelect
              toppingOptions={Object.entries(this.state.toppingOptions)}
              toppingPrice={this.state.toppingPrice.toString()}
              chickenToppingPrice={this.state.chikenToppingPrice.toString()}
              peperoniToppingPrice={this.state.peperoniToppingPrice.toString()}
              handleToppingOptionClick={this.handleToppingOptionClick}
            />
            <Pizza
              selectedToppings={this.state.selectedToppings}
              toppingOptions={this.state.toppingOptions}
            />
            <OrderDetails
              selectedToppings={this.state.selectedToppings}
              totalPrice={this.totalPricePizzaYa()}
              confirmOrderBtnRef={this.confirmOrderBtnRef}
              handleOrderSubmit={this.handleOrderSubmit}
            />
            {this.state.orderConfirmed ? (
              <OrderConfirmation
                handleOrderSubmit={this.handleOrderSubmit}
                closeConfirmationBtnRef={this.closeConfirmationBtnRef}
                username={this.state.username}
                handleName={this.handleName}
                telephone={this.state.telephone}
                handleTelephone={this.handleTelephone}
                namePizza={this.state.namePizza}
                price={this.state.totalPrice}
                date={this.state.date}
              />
            ) : null}
            {this.state.checkTrackingDaily ? (
              <TrackingDaily
                handleCheckingTracking={this.handleCheckingTracking}
                closeTrackingTable={this.closeTrackingTable}
              />
            ) : null}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

function Header({ openTrackingTable, handleCheckingTracking }) {
  return (
    <header>
      <div className="logo-pizza-ya"></div>
      <h1>Pizza Ya</h1>
      <div className='button-header'>
        <button
          className="btn order-btn"
          onClick={handleCheckingTracking}
          aria-label="Confirm Order"
          ref={openTrackingTable}
        >
          Tracking
        </button>
      </div>
    </header>
  );
}

function ToppingSelect({
  toppingOptions,
  toppingPrice,
  chickenToppingPrice,
  peperoniToppingPrice,
  handleToppingOptionClick,
}) {
  return (
    <div className="topping-select">
      <h2>Aderezos</h2>
      <p className="toppings-info">
        Cada aderezo vale {`$${toppingPrice}`}. Excepto el pollo y el peperoni
        que cuestan {`$${chickenToppingPrice} y $${peperoniToppingPrice}`}{" "}
        respectivamente.
      </p>
      <div className="topping-scroll-bar">
        <ul className="topping-options" onClick={handleToppingOptionClick}>
          {toppingOptions.map((topping) => (
            <ToppingOption key={topping[0]} topping={topping[0]} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ToppingOption({ topping }) {
  return (
    <li className="topping-option">
      <input type="checkbox" id={topping} className="topping-input" />
      <label
        className="topping-label"
        htmlFor={topping}
        aria-label={`${topping}`}
      >
        <div className="topping-image">
          <div className={`${topping} topping-image-item`}></div>
        </div>
        <span className="topping-label-content">
          <span className="topping-label-text">{topping}</span>
        </span>
      </label>
    </li>
  );
}

function Pizza({ toppingOptions, selectedToppings }) {
  return (
    <div className="pizza-container">
      <div className="pizza">
        <div className="topping queso queso-1 "></div>
        {selectedToppings.map((topping) => (
          <PizzaTopping
            key={topping}
            topping={topping}
            toppingAmount={toppingOptions[topping].amount}
          />
        ))}
      </div>
    </div>
  );
}

function PizzaTopping({ topping, toppingAmount }) {
  let toppings = [];

  for (let i = 1; i <= toppingAmount; i++) {
    toppings.push(
      <div
        key={`${topping + i}`}
        className={`topping ${topping} ${topping}-${i} `}
      ></div>
    );
  }

  return toppings;
}

function OrderDetails({
  selectedToppings,
  totalPrice,
  confirmOrderBtnRef,
  handleOrderSubmit,
}) {
  return (
    <div className="order">
      <h2>Detalles de la orden</h2>
      <div className="order-toppings">
        <div className="order-scroll-bar">
          <table className="order-toppings-list">
            <thead>
              <tr>
                <th>Item</th>
                <th>Concepto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr key={0}>
                <td>1</td>
                <td>masa</td>
                <td>10000</td>
              </tr>
              {selectedToppings.map((topping, index) => (
                <tr key={index + 1}>
                  <td>{index + 2}</td>
                  <td>{topping}</td>
                  {topping === "pollo" ? (
                    <td>5000</td>
                  ) : topping === "pepperoni" ? (
                    <td>4500</td>
                  ) : (
                    <td>3000</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="order-price">
        <h3>Total Price:</h3>
        <p className="price">{`$${totalPrice}`}</p>
        <button
          className="btn order-btn"
          onClick={handleOrderSubmit}
          aria-label="Confirm Order"
          ref={confirmOrderBtnRef}
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

function OrderConfirmation({
  closeConfirmationBtnRef,
  handleOrderSubmit,
  username,
  handleName,
  telephone,
  handleTelephone,
  namePizza,
  price,
  date,
}) {
  return (
    <div className="order-confirmation">
      <form onSubmit={handleOrderSubmit}>
        <h1>Datos del cliente</h1>

        <label className="label-form">
          Nombre:
          <input name="nombre" type="nombre" onChange={handleName} required />
        </label>

        <label>
          Telefono:
          <input
            name="telefono"
            type="telefono"
            onChange={handleTelephone}
            required
          />
        </label>

        <h2>Resumen</h2>

        <div>
          <p>
            <b>Nombre:</b> {username}
          </p>
          <p>
            <b>Telefono:</b> {telephone}
          </p>
          <p>
            <b>Nombre de la pizza:</b> {namePizza}
          </p>
          <p>
            <b>Precio:</b> {price}
          </p>
          <p>
            <b>Fecha:</b> {date}
          </p>
        </div>

        <button
          className="btn close-btn"
          aria-label="Close Confirmation"
          ref={closeConfirmationBtnRef}
        >
          Confirmar pedido
        </button>
      </form>
    </div>
  );
}

function TrackingDaily({ handleCheckingTracking, closeTrackingTable }) {
  let totalIncome = 0;
  trackingDailyPizzaYa.map((order) => {
    return (totalIncome += order.totalPrice);
  });
  let pizzasSold = 0;
  trackingDailyPizzaYa.map((order) => {
    return (pizzasSold += order.numberPiza);
  });
  return (
    <div className="tracking-view">
      <div className="tracking-format">
        <h1>Ventas del dia</h1>
        <div className="tracking-scroll-bar">
          <table className="tracking-list">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Pizza</th>
                <th>Precio</th>
                <th>Fecha</th>
                <th>Ingredientes</th>
              </tr>
            </thead>
            <tbody>
              {trackingDailyPizzaYa.map((order, index) => (
                <tr key={index}>
                  <td>{order.username}</td>
                  <td>{order.telephone}</td>
                  <td>{order.namePizza}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.date}</td>
                  <td>{order.toppings.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Pizzas Vendidas</h3>
        <p className="price">{`${pizzasSold}`}</p>
        <h3>Total Vendido</h3>
        <p className="price">{`$${totalIncome}`}</p>
        <button
          className="btn order-btn"
          onClick={handleCheckingTracking}
          aria-label="Confirm Order"
          ref={closeTrackingTable}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PizzaYa;
