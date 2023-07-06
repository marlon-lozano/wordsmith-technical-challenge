import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import Datastore from 'nedb';
import { Account } from './account';

const app = express();
app.use(bodyParser.json());

const db = new Datastore();

app.get('/accounts/:id', (req: Request, res: Response) => {
    db.findOne({ _id: req.params.id }, (err: Error | null, doc: Account) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(doc);
        }
    });
});

app.post('/accounts', (req: Request, res: Response) => {
    const account: Account = {
        _id: uuidv4(),
        ...req.body
    };
    db.insert(account, (err: Error | null, newDoc: Account) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(newDoc);
        }
    });
});

app.put('/accounts/:id', (req: Request, res: Response) => {
    db.update({ _id: req.params.id }, { $set: req.body }, {}, (err: Error | null, numReplaced: number) => {
        if (err) {
            res.status(500).send(err);
        } else if (numReplaced === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    });
});

app.delete('/accounts/:id', (req: Request, res: Response) => {
    db.remove({ _id: req.params.id }, {}, (err: Error | null, numRemoved: number) => {
        if (err) {
            res.status(500).send(err);
        } else if (numRemoved === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
