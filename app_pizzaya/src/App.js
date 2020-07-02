import React from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//       </header>
//     </div>
//   );
// }

// export default App;

class PizzaBuilder extends React.Component {

  state = {
      toppingOptions: {
          carne: {
              amount: 1
          },
          pepperoni: {
              amount: 1
          },
          tocineta: {
              amount: 1
          },
          jamon: {
              amount: 1
          },
          chorizo: {
              amount: 1
          },
          pollo: {
              amount: 1
          },
          salami: {
              amount: 1
          },
          cebolla: {
              amount: 1
          },
          jalapeño: {
              amount: 1
          },
          champiñon: {
              amount: 1
          },
          piña: {
              amount: 1
          },
          maiz: {
              amount: 1
          },
          aceituna: {
              amount: 1
          },
          pimenton: {
              amount: 1
          },
          oregano: {
              amount: 1
          },
          tomate: {
              amount: 1
          },
          ciruela: {
              amount: 1
          }
      },
      selectedToppings: [],
      basePrice: 1000,
      toppingPrice: 150,
      discount: {
          userCode: '',
          applied: false,
          codes: {
              codepen: 25,
              css: 20,
              george: 30,
              html: 10,
              javascript: 15,
              pizza: 40,
              react: 35
          }
      },
      orderConfirmed: false
  }

  confirmOrderBtnRef = React.createRef();
  closeConfirmationBtnRef = React.createRef();

  handleToppingOptionClick = e => {
      if (e.target.className === 'topping-input') {

          const selectedTopping = e.target.id;

          this.state.selectedToppings.includes(selectedTopping) ?
              this.setState(prevState => ({ selectedToppings: prevState.selectedToppings.filter(topping => topping !== selectedTopping) })) :
              this.setState(prevState => ({ selectedToppings: [...prevState.selectedToppings, selectedTopping] }));
      }
  }

  handleDiscountInput = e => {

      const value = e.target.value.trim().toLowerCase();

      this.setState(prevState => ({ discount: { ...prevState.discount, userCode: value } }));
      if (this.state.discount.applied) {
          this.setState(prevState => ({ discount: { ...prevState.discount, applied: false } }));
      }
  }

  handleDiscountClick = () => this.setState(prevState => ({ discount: { ...prevState.discount, applied: true } }));

  handleOrderSubmit = () => {
      this.setState(prevState => (
          { orderConfirmed: !prevState.orderConfirmed }
      ), () => {
          this.state.orderConfirmed ?
              this.closeConfirmationBtnRef.current.focus() :
              this.confirmOrderBtnRef.current.focus();
      })
  };

  render() {
      return (
          <React.Fragment>
              <Header />
              <main>
                  <div className='container'>
                      <ToppingSelect
                          toppingOptions={ Object.entries(this.state.toppingOptions) }
                          toppingPrice={ (this.state.toppingPrice / 100).toFixed(2) }
                          handleToppingOptionClick={ this.handleToppingOptionClick } />
                      <Pizza
                          selectedToppings={ this.state.selectedToppings }
                          toppingOptions={ this.state.toppingOptions } />
                      <OrderDetails
                          selectedToppings={ this.state.selectedToppings }
                          totalPrice={ ((this.state.basePrice + (this.state.toppingPrice * this.state.selectedToppings.length)) / 100).toFixed(2) }
                          discount={ this.state.discount }
                          confirmOrderBtnRef={ this.confirmOrderBtnRef }
                          handleDiscountInput={ this.handleDiscountInput }
                          handleDiscountClick={ this.handleDiscountClick }
                          handleOrderSubmit={ this.handleOrderSubmit }
                      />
                      {
                          this.state.orderConfirmed ?
                              <OrderConfirmation
                                  handleOrderSubmit={ this.handleOrderSubmit }
                                  closeConfirmationBtnRef={ this.closeConfirmationBtnRef }
                              />
                              : null
                      }
                  </div>
              </main>
          </React.Fragment>
      )
  }
}

function Header() {
  return (
      <header>
          <h1>Pizza Ya</h1>
      </header>
  );
}

function ToppingSelect({ toppingOptions, toppingPrice, handleToppingOptionClick }) {
  return (
      <div className='topping-select'>
        <h2>Toppings</h2>
        <p className='toppings-info'>Toppings charged at { `$${toppingPrice}` } each.</p>
          <div className='topping-scroll-bar'>
          <ul className='topping-options' onClick={ handleToppingOptionClick }>
              { toppingOptions.map(topping => <ToppingOption key={ topping[0] } topping={ topping[0] } />) }
          </ul>
        </div>
      </div >
  );
}

function ToppingOption({ topping }) {
  return (
      <li className='topping-option'>
          <input type='checkbox' id={ topping } className='topping-input' />
          <label className='topping-label' htmlFor={ topping } aria-label={ `${topping}` }>
              <div className='topping-image'>
                  <div className={ `${topping} topping-image-item` }></div>
              </div>
              <span className='topping-label-content'>
                  <span className='topping-label-text'>
                      { topping }
                  </span>
              </span>
          </label>
      </li>
  );
}


function Pizza({ toppingOptions, selectedToppings }) {
  return (
      <div className='pizza-container'>
          <div className='pizza'>
              <div className="topping queso queso-1 "></div>
              { selectedToppings.map(topping =>
                  <PizzaTopping key={ topping } topping={ topping } toppingAmount={ toppingOptions[topping].amount } />) }
          </div>
      </div>
  );
}

function PizzaTopping({ topping, toppingAmount }) {

  let toppings = [];

  for (let i = 1; i <= toppingAmount; i++) {
      toppings.push(<div key={ `${topping + i}` } className={ `topping ${topping} ${topping}-${i} ` } ></div>);
  }

  return toppings;
}

function OrderDetails({ selectedToppings, totalPrice, discount, confirmOrderBtnRef, handleDiscountInput, handleDiscountClick, handleOrderSubmit }) {

  const validDiscount = Object.keys(discount.codes).includes(discount.userCode);

  return (
      <div className='order'>
          <h2>Order Details</h2>
          <div className='order-toppings'>
              <div className='order-scroll-bar'>
                <table className='order-toppings-list'>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Content</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={0}>
                            <td>1</td>
                            <td>masa</td>
                            <td>10.00</td>
                        </tr>
                        { selectedToppings.map((topping, index) => (
                        <tr key={index + 1}>
                            <td>{index + 2}</td>
                            <td>{ topping }</td>
                            <td>1.5</td>
                        </tr>
                        )) }
                    </tbody>
                </table>
              </div>
          </div>
          <div className='order-price'>
              <h3>Total Price:</h3>
              <p className='price'>
                  {
                      `$${discount.applied && validDiscount ?
                          (totalPrice - (totalPrice * (discount.codes[discount.userCode] / 100))).toFixed(2) : totalPrice}`
                  }
              </p>
              <button
                  className='btn order-btn'
                  onClick={ handleOrderSubmit }
                  aria-label='Confirm Order'
                  ref={ confirmOrderBtnRef }
              >
                  Order
              </button>
          </div>
      </div>
  );
}

function OrderConfirmation({ closeConfirmationBtnRef, handleOrderSubmit }) {
  return (
      <div className='order-confirmation'>
          <div className='order-modal'>
              <h2>Order Confirmed</h2>
              <p>Your pizza will be with you shortly!</p>
              <button
                  className='btn close-btn'
                  onClick={ handleOrderSubmit }
                  aria-label="Close Confirmation"
                  ref={ closeConfirmationBtnRef }
              >
                  Close
              </button>
          </div>
      </div>
  );
}

export default PizzaBuilder;
