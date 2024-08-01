import model from '../model/usersModel';

class authservice {
  static updateProfile = async (
    id: string,
    profile: {
      firstName: string;
      lastName: string;
      address: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
      };
    },
  ) => {
    const user = await model.findById(id);

    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isActive) {
      throw new Error('User is inactive');
    }

    user.profile.firstName = profile.firstName;
    user.profile.lastName = profile.lastName;
    user.profile.address = {
      ...user.profile.address,
      ...profile.address,
    };

    await user.save();

    return user;
  };
}

export default authservice;
