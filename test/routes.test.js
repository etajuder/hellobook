import chai from 'chai';
import chaiHttp from 'chai-http';
// import dotenv from 'dotenv';
// import Sequelize from 'sequelize';
import server from '../server/app';
import db from '../server/models';

// dotenv.config();
// const sequealize = new Sequelize(
//     process.env.PG_DB_TEST,
//     process.env.PG_DB_USER,
//     process.env.PG_DB_PASS,
//     {
//         dialect: 'postgres',
//         logging: false
//     },
// );

const should = chai.should();
chai.use(chaiHttp);

describe('routes: books', () => {
    describe('/api/books - unauthorized user', () => {
        it('GET /api/books - should respond with 401 for Unauthorized user', (done) => {
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
        it('POST /api/books - should respond with 401 for Unauthorized user', (done) => {
            chai.request(server)
                .post('/api/books')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
        it('PUT /api/books/:bookId - should respond with 401 for Unauthorized user', (done) => {
            chai.request(server)
                .put('/api/books/1')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
    });

    xdescribe('POST /api/users/signup', () => {
        it('POST /api/users/signup - should respond with success along with newly created user', (done) => {
            chai.request(server)
                .post('/api/users/signup')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
    });

    xdescribe('POST /api/users/signin', () => {
        it('POST /api/users/signin - should respond with success along with signin user', (done) => {
            chai.request(server)
                .post('/api/users/signin')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
    });

    xdescribe('GET /api/books - authorized user', () => {
        it('should respond with an array of all the books', (done) => {
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
    });

    xdescribe('GET /api/books/:bookId - authorized user', () => {
        it('should respond with a single book', (done) => {
            chai.request(server)
                .get('/api/books')
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
    });

    xdescribe('POST /api/books - authorized user', () => {
        const newBook = {
            isbn: 20177122,
            title: 'This is Andele',
            author: 'John Doe',
            published: '8-10-2017',
            description: 'This is the tale about Andela',
            qty: 10
        };
        it('should respond with success along with newly added book', (done) => {
            chai.request(server)
                .post('/api/books')
                .send(newBook)
                .end((err, res) => {
                    should.exist(err);
                    res.status.should.equal(401);
                    res.type.should.equal('application/json');
                    res.body.status.should.eql('Unauthorized');
                    done();
                });
        });
    });

    xdescribe('PUT /api/books/:bookId - unauthorized user', () => {
        const newBook = {
            isbn: 20177122,
            title: 'This is Andele',
            author: 'John Doe',
            published: '8-10-2017',
            description: 'This is the tale about Andela',
            qty: 10
        };
        it('should respond with success along with updated book', (done) => {
            db.Book
                .findAll()
                .then((books) => {
                    const bookObj = books[0];
                    chai.request(server)
                        .put(`/api/books/${bookObj.id}`)
                        .send({
                            isbn: 20177122,
                            title: 'This is Andela',
                            author: 'John Doe',
                            published: '8-10-2017',
                            description: 'This is the tale about Andela',
                            qty: 10
                        })
                        .end((err, res) => {
                            should.exist(err);
                            res.status.should.equal(401);
                            res.type.should.equal('application/json');
                            res.body.status.should.eql('Unauthorized');
                            done();
                        });
                });
        });
    });
});
