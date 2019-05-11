# chego-mysql

This is a MySQL driver for Chego library.

## Install
```
npm install --save @chego/chego-mysql
```

## Usage
Create a new Chego object using the `mysqlDriver` and configuration object.

```
const { newChego, newQuery } = require("@chego/chego");
const { chegoMySQL } = require("@chego/chego-mysql");
const chego = newChego(chegoMySQL, {
  host     : 'localhost',
  user     : 'foo',
  password : 'bar',
  database : 'some_db'
});

const query = newQuery();

query.select('*').from('superheroes').where('origin').is.eq('Gotham City').limit(10);

chego.execute(query)
.then(result => { console.log('RESULT:', JSON.stringify(result)) })
.catch(error => { console.log('ERROR:', error); });

```

Under the hood it uses Node.js MySQL module, so please refer to this [link](https://github.com/mysqljs/mysql) for more information on the configuration. 

For more information on how `Chego` works with database drivers, please read [Chego Usage guide](https://github.com/chegojs/chego/blob/master/README.md).

## Tips

#### Running multiple queries and transactions

It is possible to run a set of queries synchronously. By default, these queries are set in [the transaction statement](http://www.mysqltutorial.org/mysql-transaction.aspx).

```
const query1 = newQuery().insert({
            name: "Thanos",
            alterEgo: "",
            origin: "Titan",
            publisher: "mcUT642",
            createdBy: [
                "jsTR612"
            ],
            firstAppearance: "tiIM771"
        }).to('villains');
        
const query2 = newQuery().select('*').from('villains').limit(10);

chego.execute(query1, query2)
.then(result => { console.log('RESULT:', JSON.stringify(result)) })
.catch(error => { console.log('ERROR:', error); });
```

## Contribute
There is still a lot to do, so if you want to be part of the Chego project and make it better, it's great.
Whether you find a bug or have a feature request, please contact us. With your help, we'll make it a great tool.

[How to contribute](https://github.com/orgs/chegojs/chego/CONTRIBUTING.md)

Follow our kanban boards to be up to date

[Kanban board](https://github.com/orgs/chegojs/projects/3)

Join the team, feel free to catch any task or suggest a new one.

## License

Copyright (c) 2019 [Chego Team](https://github.com/orgs/chegojs/people)

Licensed under the [MIT license](LICENSE).