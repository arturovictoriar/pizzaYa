import React from 'react';

class PizzaYa extends React.Component {

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
      basePrice: 10000,
      toppingPrice: 3000,
      chikenToppingPrice: 5000,
      peperoniToppingPrice: 4500,
      totalPrice: 0,
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

  handleOrderSubmit = () => {
      this.setState(prevState => (
          { orderConfirmed: !prevState.orderConfirmed }
      ), () => {
          this.state.orderConfirmed ?
              this.closeConfirmationBtnRef.current.focus() :
              this.confirmOrderBtnRef.current.focus();
      })
  };

  totalPricePizzaYa = () => {
    let total = this.state.basePrice;
    this.state.selectedToppings.map(topping => {
        if (topping === 'pollo') {
            total += this.state.chikenToppingPrice;
        } else if (topping === 'pepperoni') {
            total += this.state.peperoniToppingPrice;
        } else {
            total += this.state.toppingPrice;
        }
        return total;
    });
    this.setState.totalPrice = total;
    return total.toString();
  }

  render() {
      return (
          <React.Fragment>
              <Header />
              <main>
                  <div className='container'>
                      <ToppingSelect
                          toppingOptions={ Object.entries(this.state.toppingOptions) }
                          toppingPrice={ this.state.toppingPrice.toString() }
                          chickenToppingPrice={ this.state.chikenToppingPrice.toString() }
                          peperoniToppingPrice={ this.state.peperoniToppingPrice.toString() }
                          handleToppingOptionClick={ this.handleToppingOptionClick } />
                      <Pizza
                          selectedToppings={ this.state.selectedToppings }
                          toppingOptions={ this.state.toppingOptions } />
                      <OrderDetails
                          selectedToppings={ this.state.selectedToppings }
                          totalPrice={ this.totalPricePizzaYa() }
                          confirmOrderBtnRef={ this.confirmOrderBtnRef }
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

function ToppingSelect({ toppingOptions, toppingPrice, chickenToppingPrice, peperoniToppingPrice, handleToppingOptionClick }) {
  return (
      <div className='topping-select'>
        <h2>Aderezos</h2>
        <p className='toppings-info'>Cada aderezo vale { `$${toppingPrice}` }. Excepto el pollo y el peperoni que cuestan { `$${chickenToppingPrice} y $${peperoniToppingPrice}` } respectivamente.</p>
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

function OrderDetails({ selectedToppings, totalPrice, confirmOrderBtnRef, handleOrderSubmit }) {

  return (
      <div className='order'>
          <h2>Detalles de la orden</h2>
          <div className='order-toppings'>
              <div className='order-scroll-bar'>
                <table className='order-toppings-list'>
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
                        { selectedToppings.map((topping, index) => (
                        <tr key={index + 1}>
                            <td>{index + 2}</td>
                            <td>{ topping }</td>
                            { (topping === 'pollo') ? <td>5000</td> : ((topping === 'pepperoni') ? <td>4500</td>: <td>3000</td>) }
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
                      `$${ totalPrice }`
                  }
              </p>
              <button
                  className='btn order-btn'
                  onClick={ handleOrderSubmit }
                  aria-label='Confirm Order'
                  ref={ confirmOrderBtnRef }
              >
                  Ordenar
              </button>
          </div>
      </div>
  );
}

function OrderConfirmation({ closeConfirmationBtnRef, handleOrderSubmit }) {
    return (
        <div className='order-confirmation'>
            <form>
                    <h1>Datos del cliente</h1>

                    <label className='label-form'>
                        Nombre:
                        <input
                        name="nombre"
                        type="nombre"
                        required />
                    </label>

                    <label>
                        Telefono:
                        <input
                        name="telefono"
                        type="telefono"
                        required />
                    </label>

                    <h2>Resumen</h2>

                    <div>
                        <p><b>Nombre:</b> Arturo Victoria Rincon</p>
                        <p><b>Telefono:</b> 3104267245</p>
                        <p><b>Nombre de la pizza:</b> Madre mia</p>
                        <p><b>Precio:</b> 478</p>
                        <p><b>Fecha:</b> hoy</p>
                    </div>

                    <button 
                        className='btn close-btn'
                        onClick={ handleOrderSubmit }
                        aria-label="Close Confirmation"
                        ref={ closeConfirmationBtnRef }
                    >
                        Confirmar pedido
                    </button>
                </form>
        </div>
    );
  }

// function OrderConfirmation({ closeConfirmationBtnRef, handleOrderSubmit }) {
//   return (
//       <div className='order-confirmation'>
//           <div className='order-modal'>
//               <h2>Order Confirmed</h2>
//               <p>Your pizza will be with you shortly!</p>
//               <button
//                   className='btn close-btn'
//                   onClick={ handleOrderSubmit }
//                   aria-label="Close Confirmation"
//                   ref={ closeConfirmationBtnRef }
//               >
//                   Confirmar pedido
//               </button>
//           </div>
//       </div>
//   );
// }

export default PizzaYa;
