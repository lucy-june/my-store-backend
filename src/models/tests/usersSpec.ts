import { getMaxListeners } from 'process';
import { User, Users } from '../users';

const users = new Users();

xdescribe('Users Model: create', () => {
  it('should be a create method', () => {
    expect(users.create).toBeDefined();
  })

  it('create method should add a user to database', async () => {
    const result = await users.create({
      name: "lucy",
      email: 'lucy@gmail.com',
      password: "lucy123"
    });
    //console.log('$$$$$$$$$$$$$$$$$$$$' + JSON.stringify(result));
    expect(result).toEqual(jasmine.objectContaining({
      user_name: "lucy",
      user_email: 'lucy@gmail.com'
    }));
  });

  it('create method should add another user to database', async () => {
    const result = await users.create({
      name: "jack",
      email: 'jack@gmail.com',
      password: "jack123"
    });
    //console.log('$$$$$$$$$$$$$$$$$$$$' + JSON.stringify(result));
    expect(result).toEqual(jasmine.objectContaining({
      user_name: "jack",
      user_email: 'jack@gmail.com'
    }));
  });
});

xdescribe('Users Model: authenticate', () => {
  it ('should be an authenticate method', () => {
    expect(users.authenticate).toBeDefined();
  })

  it ('should return a user if the password and the email match', async () => {
    const result = await users.authenticate('lucy@gmail.com', 'lucy123');
    console.log('$$$$$$$$$$$$$$$$$$$$' + JSON.stringify(result));
    expect(result).toEqual(jasmine.objectContaining({
      user_name: "lucy",
      user_email: 'lucy@gmail.com'
    }));
  })

  it (`should throw error if the email doesn't match password`, async () => {
    try {
      const result = await users.authenticate('lucy@gmail.com', 'lucyhh123');
      console.log(JSON.stringify(result));
    } catch (err) {
      expect(err).toEqual(new Error(`Could not authenticate user`));
    }
  })

  it (`should return null if the user doesn't exist`, async () => {
    const result = await users.authenticate('haha@gmail.com', 'lucy123');
    expect(result).toEqual(null);
  })
});

xdescribe('Users Model: readAll', () => {
  it('should be a readAll method', () => {
    expect(users.readAll).toBeDefined();
  });

  it('readAll method should reaturn an array', async () => {
    const result = await users.readAll();
    expect(result).toBeInstanceOf(Array);
  })

  it('readAll method should return a length larger than 1 when the users database is not null', async () => {
    const result = await users.readAll();
    expect(result.length).toBeGreaterThan(1);
  })

  xit('readAll method should return a exactly length of the data that saved in user database', async () => {
    const result = await users.readAll();
    expect(result.length).toBe(2);
  })
});

describe('Users Model: readOne', () => {
  it('should be a readOne method', () => {
    expect(users.readOne).toBeDefined();
  });

  it('readAll method should reaturn an Object', async () => {
    const result = await users.readOne(1);
    expect(result).toBeInstanceOf(Object);
  })

  it('readAll method should return a length larger than 1 when the users database is not null', async () => {
    const result = await users.readOne(1);
    expect(result).toEqual(jasmine.objectContaining({
      name: "lucy"
    }));
  });
});