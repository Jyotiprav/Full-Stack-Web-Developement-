// show cart
// (function(){
//   const cartinfo=document.getElementById('cart-info');
//   const cart=document.getElementById('cart');
//   cartinfo.addEventListener('click',function(){
// https://www.w3schools.com/jsref/prop_element_classlist.asp
//     cart.classList.toggle('show-cart');
// https://www.w3schools.com/howto/howto_js_toggle_class.asp
//   });
// })();

// https://www.w3schools.com/jquery/jquery_ref_html.asp
$(document).ready(function(){
  const cartinfo=$('#cart-info');
  const cart=$('#cart');
  cartinfo.click(function(){
    cart.toggleClass('show-cart');
    // https://www.w3schools.com/jquery/html_toggleclass.asp
  });
});


// jquery part
$(document).ready(function(){
  const cartBtn=$('.store-item-icon');
  cartBtn.each(function(index){
    // console.log( index );
    $(this).click(function(){
      // https://api.jquery.com/event.target/
      console.log( event.target.parentElement.parentElement.nextElementSibling);

        if(event.target.parentElement.classList.contains('store-item-icon')){
          // alert("yes");
          // cart image
          let fullpath=event.target.parentElement.previousElementSibling.src;
          console.log(fullpath);
          let pos=fullpath.indexOf("img")+3;
          // If the .indexOf() method finds the string present, it will return the index number of where it is found in the img
          console.log(pos); //57
          let partpath=fullpath.slice(pos);
          console.log(partpath);
          const item={};
          item.img="img_cart"+partpath;
          //       // console.log(item);



          var name=event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
          item.name=name;
          var price=event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
          let finalprice=price.slice(1).trim();

          item.price=finalprice;

          var cartitem = $("<div/>");

          cartitem.addClass('cart-item d-flex justify-content-between text-capitalize my-3');

          var item_content=` <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                   <div class="cart-item-text">

                     <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                     <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                  </div>
                  <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                  </a>
                </div>`;
          cartitem.html(item_content);
          const cart=$("#cart");
          const total=$(".cart-total-container");
          cartitem.insertBefore(total);
          // The insertBefore() method inserts a node as a child, right before an existing child, which you specify.
          alert("item added to the cart");
          $(".cart-item-remove").click(function(){
            // alert("removed");
          $(this).prev().prev().remove();
          $(this).prev().remove();
            $(this).remove();
            showtotals();
          });
          showtotals();
      }
    })
  })
})

// //  Add items to the cart
//
// (function(){
//   // var contents = $('#contents')[0];
//   const cartBtn=document.querySelectorAll('.store-item-icon');
//   cartBtn.forEach(function(btn){
//   btn.addEventListener('click',function(event){
//     // console.log(event.target);
//     if(event.target.parentElement.classList.contains('store-item-icon')){
//       // console.log(event.target.parentElement);
//       // The previousElementSibling property returns the previous element of the specified element, in the same tree level.
//       let fullpath=event.target.parentElement.previousElementSibling.src;
//       let pos=fullpath.indexOf("img")+3;
//       // If the .indexOf() method finds the string present, it will return the index number of where it is found in the img
//       // console.log(pos); //57
//       let partpath=fullpath.slice(pos);
//       console.log(partpath);
//       const item={};
//       item.img="img-cart"+partpath;
//       // console.log(item);
//       let name=event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
//       item.name=name;
//       // console.log(name);
//       let price=event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
//       // console.log(price);
//
//       let finalprice=price.slice(1).trim();
//       // console.log(finalprice);
//       item.price=finalprice;
//       // update the console.log();
//       const cartitem=document.createElement('div');
//       cartitem.classList.add('cart-item','d-flex', 'justify-content-between', 'text-capitalize', 'my-3');
//       // Template literals(``) can be used to represent multi-line strings and may use "interpolation" to insert variables
//       cartitem.innerHTML=`<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
//         <div class="item-text">
//
//           <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
//           <span>$</span>
//           <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
//         </div>
//         <a href="#" id='cart-item-remove' class="cart-item-remove">
//           <i class="fas fa-trash"></i>
//         </a>
//       </div>`
//        ;
//        // select cart
//        const cart=document.getElementById("cart");
//        const total=document.querySelector(".cart-total-container");
//
//        cart.insertBefore(cartitem,total);
//        alert("item added to the cart");
//        showtotals();
//     }
//   });
// });
//
// // show total
function showtotals(){
  const total=[];
  const items=document.querySelectorAll(".cart-item-price");
  items.forEach(function(item){
    total.push(parseFloat(item.textContent));
  })
  // console.log(total);
  // The reduce() method executes a provided function for each value of the array (from left-to-right)
  const totalmoney= total.reduce(function(total,i){
    total+=i;
    return total;
  },0);
  // console.log(totalmoney);
  document.getElementById("cart-total").textContent=totalmoney;
  document.querySelector(".item-total").textContent=totalmoney;
  document.getElementById("item-count").textContent=total.length;

}
// })();
