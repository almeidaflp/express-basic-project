import {Router} from 'express';
import {uuid} from 'uuidv4';

const routes = new Router();

const products = [];

function breakPoint(req, res, next){
  console.log('O middleware executou')

  next()
}

routes.use(breakPoint)

//Listar os produtos
routes.get('/products', (req, res) =>{
  const {test} = req.query;

  console.log(test)

  return res.json(products)
});

//Cria um produto
routes.post('/products', (req, res) =>{
  const {name, description, price, category} = req.body;

  const product = {
    id: uuid(),
    name,
    description,
    price,
    category
  }

  products.push(product)

  return res.json(product)
});

//Altera um produto
routes.put('/products/:id', (req, res) =>{
  const {id} = req.params;
  const {name, description, price, category} = req.body;

  const productIndex = products.findIndex(product => 
    product.id === id
  )

  if(productIndex == -1) {
    return res.status(400).json({error: 'Product doest not found'});
  }

  const product = {
    id,
    name,
    description,
    price,
    category
  }

  products[productIndex] = product;

  return res.json(product)
});

routes.delete('/products/:id', (req, res) =>{
  const {id} = req.params;

  const productIndex = products.findIndex(product => 
    product.id === id
  )

  if(productIndex == -1) {
    return res.status(400).json({error: 'Product doest not found'});
  }

  products.splice(productIndex, 1);

  return res.status(204).send();
});

export default routes;