import { Product, Products } from "../products";

const products = new Products();

xdescribe('Products Model: create', () => {
  it('should be a create method', () => {
    expect(products.create).toBeDefined();
  });

  it('create method should add a product to database', async () => {
    const result = await products.create({
      name: "dress",
      price: 69.99,
      category: "clothes"
    });
    console.log('$$$$$$$$$$$$$$$$$$$$' + JSON.stringify(result));
    expect(result).toEqual(jasmine.objectContaining({
      product_name: "dress",
      product_price: '69.99',
      product_category: "clothes"
    }));
  });

  it('create method should add another product to database', async () => {
    const result = await products.create({
      name: "macbook pro",
      price: 1399.99,
      category: "computers"
    });
    console.log('$$$$$$$$$$$$$$$$$$$$' + JSON.stringify(result));
    expect(result).toEqual(jasmine.objectContaining({
      product_name: "mac Pro",
      product_price: 1399.99,
      product_category: "computers"
    }));
  });
});

xdescribe('Products Model: readAll', () => {
  it('should be a readAll method', () => {
    expect(products.readAll).toBeDefined();
  });

  it('readAll method should return array of products', async () => {
    const result = await products.readAll();
    expect(result).toBeInstanceOf(Array);
  });

  it('readAll method should return array length', async () => {
    const result = await products.readAll();
    expect(result.length).toBe(2);
  });

  it('readAll method should return data obj of products', async () => {
    const result = await products.readAll();
    expect(result[0]).toEqual(jasmine.objectContaining({
      product_name: "macbook pro",
      product_price: '1399.99',
      product_category: "computers"
    }));
  })
});

xdescribe('Products Model: readOne', () => {
  it('should be a readOne method', () => {
    expect(products.readOne).toBeDefined();
  });

  it('readOne method should read a specific product from database', async () => {
    const result = await products.readOne(1);
    console.log(JSON.stringify(result));
    expect(result).toBeInstanceOf(Object);
  });

  it('readOne method should return a data object with specific id', async () => {
    const result = await products.readOne(1);
    expect(result).toEqual({
      product_id: 1,
      product_name: "dress",
      product_price: '69.99',
      product_category: "clothes"
    });
  });
});

// xdescribe('Products Model: update', () => {
//   it('should be a update method', () => {
//     expect(products.update).toBeDefined();
//   });

//   it('update method should return a object', async () => {
//     const result = await products.update('dress', 79.99);
//     console.log(JSON.stringify(result));
//     expect(result).toBeInstanceOf(Object);
//   });

//   it('update method should return the updated data after updating successful', async () => {
//     const result = await products.update('dress', 79.99);
//     console.log(JSON.stringify(result));
//     expect(result).toEqual(jasmine.objectContaining({
//       product_name: "dress",
//       product_price: '79.99',
//       product_category: "clothes"
//     }));
//   });
// });

xdescribe('Products Model: delete', () => {
  it('should be a delete method', () => {
    expect(products.delete).toBeDefined();
  });

  it('delete method should return a object after deleting successful', async () => {
    const result = await products.delete(25);
    console.log(JSON.stringify(result));
    expect(result).toBeInstanceOf(Object);
  });

  it('delete method should return the delete data after deleting successful', async () => {
    const result = await products.delete(26);
    console.log(JSON.stringify(result));
    expect(result).toEqual({
      product_id: 21,
      product_name: "dress",
      product_price: '69.99',
      product_category: "clothes"
    });
  });
});