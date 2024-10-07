import User from "../models/userModel.js";

const getAllUsers = async(req, res) => {
    let users=[];
    try {
        users = await User.find();
        return res.status(200).json({
            message: '✅ Successfully fetched all users.',
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            message: '❌ Something went wrong while fetching all users.'
        });
    }
}

const usersController = {getAllUsers};
export default usersController;