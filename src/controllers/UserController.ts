import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

export const getUserByIp = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const ipAddress = req.ip;

    const userRepository = getRepository(User);

    let user = await userRepository.findOne({ where: { ip: ipAddress } });

    if (!user) return res.status(401).json({ message: 'Unauthorised' })

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const ipAddress = req.ip;
    const username = req.body.username;

    if (!username) return res.status(400).json({ message: 'Username required' });

    const userRepository = getRepository(User);

    const user = userRepository.create({ username, ip: ipAddress });
    await userRepository.save(user);

    res.status(201).json({ data: user, message: `User ${user.username} successfully created` })
  } catch (e) {
    res.status(500).json({ message: 'Create user error', error: e.message })
  }
};