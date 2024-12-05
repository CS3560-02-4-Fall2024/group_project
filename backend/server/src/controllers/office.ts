import {Request, Response, NextFunction} from 'express';
import {Office, OfficeTable} from '../models/office';

export const createOffice = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const office: Office = req.body.office;
  console.log('received: ', office);
  

  OfficeTable.insert(office)
    .then((value: Office) => {
      res.json(value);
    })
    .catch(err => {
      res.status(400).json({error: err});
    });
};

export const getOffices = (req: Request, res: Response, next: NextFunction) => {
  OfficeTable.getAll()
    .then((value: Office[]) => {
      res.json(value);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

export const updateOffice = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const officeId = Number(req.params.id);
  console.log('id: ', officeId);
  
  const newOffice: Office = req.body.office;
  console.log('office: ', newOffice);
  

  if (!officeId) res.sendStatus(400);

  OfficeTable.update(officeId, newOffice)
    .then((value: Office) => {
      res.json(value);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

export const deleteOffice = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const officeId = Number(req.params.id);

  if (!officeId) res.sendStatus(400);

  OfficeTable.deleteById(officeId)
    .then((value: number) => {
      res.json({deleted: value});
    })
    .catch(err => {
      res.send(400).json(err);
    });
};
