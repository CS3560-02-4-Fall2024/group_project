import {Request, Response, NextFunction} from 'express';
import {Office, OfficeTable} from '../models/office';

export const createOffice = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const office: Office = req.body;

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
): any => {
  const officeId = Number(req.params.id);
  const newOffice: Office = req.body;

  if (!officeId) return res.sendStatus(400);

  return OfficeTable.update(officeId, newOffice)
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
): any => {
  const officeId = Number(req.params.id);

  if (!officeId) return res.sendStatus(400).send('provide valid id');

  return OfficeTable.delete(officeId)
    .then((value: number) => {
      res.json({deleted: value});
    })
    .catch(err => {
      res.send(400).json(err);
    });
};
