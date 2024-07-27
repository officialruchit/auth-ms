import model from '../model/usersModel';

class authservice {
  static updateProfile = async (
    id: string,
    profile: {
      firstName: string;
      lastName: string;
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    },
  ) => {
    const user = await model.findById(id);

    if (!user) {
      throw new Error('user not fount');
    }
    user.profile = profile;
    user.save();

    return user;
  };
}

export default authservice;
