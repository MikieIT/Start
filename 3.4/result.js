function getLastOrder() {
  const lastOrder = JSON.parse(localStorage.getItem('lastOrderResult'));
  document.querySelector('#result-order-number').innerHTML = lastOrder.orderNumberId;
  document.querySelector('#result-bike-model').innerHTML = lastOrder.model;
  document.querySelector('#result-order-time').innerHTML = lastOrder.orderTime;
  document.querySelector('#result-order-date').innerHTML = lastOrder.orderDate;
};
getLastOrder();