import { Request, Response } from 'express';
import authservice from '../service/updateProfile';
const updateProfile = async (req: Request, res: Response) => {
  try {
    const id: string = (req as any).userId;
    const { firstName, lastName, address, city, state, country, zipCode } =
      req.body;

    const updatedUser = await authservice.updateProfile(id, {
      firstName,
      lastName,
      address,
      city,
      state,
      country,
      zipCode,
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update profile',
      error: error,
    });
  }
};

export default updateProfile;
