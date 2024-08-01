import { Request, Response } from 'express';
import authservice from '../service/updateProfile';

const updateProfile = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const {
      firstName,
      lastName,
      address: { line1, line2, city, state, country, zipCode },
    } = req.body;

    const updatedUser = await authservice.updateProfile(id, {
      firstName,
      lastName,
      address: {
        line1,
        line2,
        city,
        state,
        country,
        zipCode,
      },
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Failed to update profile',
      error: err.message,
    });
  }
};

export default updateProfile;
