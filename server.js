const datas = "mongodb+srv://hariprasad:hariprasad@cluster0.eqdo1uy.mongodb.net/Alicorn?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const destination = "product/image";

mongoose.connect(datas, {})
.then(()=> console.log("Connect sucessfully...."))
.catch((error)=> console.log(error));



const express = require("express");
const app = express();
app.use(express.json());

var cors = require('cors');
const { type } = require("os");
app.use(cors());

const storage = multer.diskStorage({
  destination: destination,
  filename:(req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({storage})

const productSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  categoryName: String,
  details: String,
  description: String,
  price: Number,
  discount: Number,
  availableQuantity: Number,
  image: {
    path: {type: String, required: true},
    filename: {type: String, required: true}
  },
  image: String

});
const ProductData = new mongoose.model('products', productSchema);

const paymentSchema = new mongoose.Schema({
  cardName: String,
  mobile: Number,
  address: String,
  cardNum: Number,
  expDate: String,
  cvv: Number,
  productID: String,
  payPrice: Number
});
const paymentData = new mongoose.model('orders', paymentSchema);



app.get("/product", async (req, res)=> {
  let data = await ProductData.find();
  res.send(data);
})
app.get("/order", async (req, res)=> {
  let data = await paymentData.find();
  res.send(data);
})

app.delete("/order", async(req, res)=> {
  let data = await paymentData.deleteOne({_id: req.query.id});
  res.send(data);
})

app.get('/product/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const product = await ProductData.findOne({ _id: id });

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

app.get("/product/:productId", async(req, res)=> {
  let data = await ProductData.find({productId: req.params.productId});
  res.send(data[0])
})




app.get('/product/:key',async(req, res) => {
  console.log(req.params.key)
  let data = await ProductData.find(
    {
      "$or":[
        {"category": {$regex:req.params.key}}
      ]
    }
  )
  res.send(data)
 
});


app.use(express.json());
// app.post("/product", async (req, res)=> {
//   let obj = new ProductData(req.body)
//   let result = await obj.save();
//   res.send(result)
// })

app.use(express.static('public'));
app.post("/product", upload.single('image'), (req, res)=> {
  const{ productId, productName, categoryName, details, description, price, discount, availableQuantity } = req.body;
  const image = req.file.path
  const NewData = new ProductData({ productId, productName, categoryName, details, description, price, discount, availableQuantity, image});
  NewData.save()
  .then(()=> {
    res.send("Product data upload successfully!");
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error uploading product.");
  });
})

app.use(express.json());
// app.post("/order", async (req, res)=> {
//   let obj = paymentData(req.body)
//  await obj.save()
//  .then(()=> {
//   res.send("Product data upload successfully!");
// })
// .catch(err => {
//   console.error(err);
//   res.status(500).send("Error uploading product.");
// });
  
// })

app.post("/order", async(req, res)=> {
  let obj = new paymentData(req.body)
  let result = await obj.save()
   .then(()=> {
  res.send("Product order successfully!");
})
.catch(err => {
  console.error(err);
  res.status(500).send("Error order product.");
});

})

app.delete("/product", async(req, res)=> {
  let data = await ProductData.deleteOne({_id: req.query.id});
  res.send(data);
})

app.put("/product", async(req, res)=> {
  let data = await ProductData.updateOne({_id: req.body.id},{
    "$set":{

    }
  })
  res.send(data);
})

const PORT = process.env.PORT || 9090;


app.listen(PORT, ()=> {
  console.log("Listening" + PORT)
})