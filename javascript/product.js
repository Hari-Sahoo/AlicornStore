function getdata(){
    fetch("http://localhost:9090/product")
    .then(res => res.json())
    .then(res =>{
        output = ''
        for(let i=0; i<res.length; i++){
            output +=  `   
                <div class="product-card">
      <img src="${res[i]['image']}" alt="${res[i]['productName']}">
      <div class="quick-view">
          <a href="productView.html?id=${res[i]['_id']}">Quick View</a>
      </div>
   </div>
        `
        }
        document.getElementById("product-grid").innerHTML = output 
    })
   }
getdata();